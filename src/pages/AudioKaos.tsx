import { MainLayout } from '@/components/layout/MainLayout';
import { Music, Radio, Headphones, Sparkles, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

export default function AudioKaos() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);

  const presets = [
    { name: 'Meditación Quantum', mood: 'calm', color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'Enfoque Creativo', mood: 'energy', color: 'from-yellow-500/20 to-orange-500/20' },
    { name: 'Celebración Épica', mood: 'excitement', color: 'from-pink-500/20 to-red-500/20' },
    { name: 'Exploración 4D', mood: 'wonder', color: 'from-purple-500/20 to-indigo-500/20' },
    { name: 'Conexión Social', mood: 'joy', color: 'from-green-500/20 to-teal-500/20' },
    { name: 'Descanso Profundo', mood: 'peace', color: 'from-slate-500/20 to-gray-500/20' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl" />
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 animate-pulse">
                <Music className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4">KAOS AUDIO</h1>
              <p className="text-xl text-muted-foreground mb-8">Experiencia Sensorial Omnidireccional</p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Radio className="w-4 w-4 text-primary" />
                  <span className="text-sm">Binaural</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Headphones className="w-4 h-4 text-primary" />
                  <span className="text-sm">3D Audio</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm">Quantum FX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Motor de Audio Quantum</h2>
                <p className="text-muted-foreground">Experiencia inmersiva en tiempo real</p>
              </div>
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full h-16 w-16"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">{volume}%</span>
            </div>
          </div>

          {/* Presets */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Ambientes Preconfigurados</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {presets.map((preset) => (
                <div
                  key={preset.name}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${preset.color} flex items-center justify-center mb-4`}>
                    <Music className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{preset.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{preset.mood}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
