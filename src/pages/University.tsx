import { MainLayout } from '@/components/layout/MainLayout';
import { GraduationCap, BookOpen, Award, Users, Play, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const University = () => {
  const courses = [
    { id: 1, title: 'Fundamentos de Blockchain MSR', level: 'Carbono', duration: '4 horas', students: 1200 },
    { id: 2, title: 'Desarrollo XR con React Three Fiber', level: 'Cristal', duration: '8 horas', students: 450 },
    { id: 3, title: 'Economía Soberana y QuantumSeeds', level: 'Diamante', duration: '6 horas', students: 320 },
    { id: 4, title: 'Isabella AI: Integración Avanzada', level: 'Cristal', duration: '5 horas', students: 280 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Carbono': return 'bg-zinc-500/20 text-zinc-400';
      case 'Cristal': return 'bg-cyan-500/20 text-cyan-400';
      case 'Diamante': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Universidad TAMV</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Aprende, crece y domina las tecnologías que definen el futuro de la civilización digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
              <div className="text-zinc-400 font-bold text-lg">Ciclo Carbono</div>
              <p className="text-sm text-muted-foreground mt-1">Fundamentos e Infraestructura</p>
            </div>
            <div className="p-6 rounded-xl bg-cyan-900/20 border border-cyan-800/50 text-center">
              <div className="text-cyan-400 font-bold text-lg">Ciclo Cristal</div>
              <p className="text-sm text-muted-foreground mt-1">XR, UX y Desarrollo</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-900/20 border border-purple-800/50 text-center">
              <div className="text-purple-400 font-bold text-lg">Ciclo Diamante</div>
              <p className="text-sm text-muted-foreground mt-1">Economía y Gobernanza DAO</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Cursos Destacados
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <h3 className="font-semibold text-foreground mt-2">{course.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {course.students} estudiantes
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Play className="h-3 w-3" /> Iniciar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default University;
