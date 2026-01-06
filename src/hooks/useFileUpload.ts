import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UploadResult {
  url: string;
  path: string;
}

export function useFileUpload() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortController = useRef<AbortController | null>(null);

  const uploadFile = async (
    file: File,
    bucket: 'avatars' | 'posts' | 'dreamspaces'
  ): Promise<UploadResult | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para subir archivos.',
        variant: 'destructive',
      });
      return null;
    }

    const maxSize = bucket === 'avatars' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'Archivo muy grande',
        description: `El archivo no debe exceder ${maxSize / 1024 / 1024}MB.`,
        variant: 'destructive',
      });
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setProgress(100);

      return {
        url: urlData.publicUrl,
        path: filePath,
      };
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error al subir',
        description: 'No se pudo subir el archivo. Intenta de nuevo.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadMultiple = async (
    files: File[],
    bucket: 'avatars' | 'posts' | 'dreamspaces'
  ): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];
    
    for (const file of files) {
      const result = await uploadFile(file, bucket);
      if (result) {
        results.push(result);
      }
    }
    
    return results;
  };

  const deleteFile = async (
    path: string,
    bucket: 'avatars' | 'posts' | 'dreamspaces'
  ) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  const cancelUpload = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }
    setUploading(false);
    setProgress(0);
  };

  return {
    uploadFile,
    uploadMultiple,
    deleteFile,
    cancelUpload,
    uploading,
    progress,
  };
}
