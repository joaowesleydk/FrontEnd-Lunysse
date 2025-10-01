// Importações necessárias 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card'; // Componente de Card

// Página inicial (Home)
export const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda Dinâmica',
      description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail'
    },
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes'
    },
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco'
    },
    {
      icon: Users,
      title: 'Impacto Social',
      description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico'
    },
    {
      icon: FileText,
      title: 'Histórico Estruturado',
      description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente'
    },
    {
      icon: Zap,
      title: 'Interface Acolhedora',
      description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários'
    }
  ];

  return (
    <div>
      {/* ================= HERO SECTION COM CARDS ================= */}
      <section 
        className="relative min-h-screen flex items-center justify-center py-20 bg-cover bg-center" 
        style={{ backgroundImage: "url('/bg-home.jpg')" }}
      >
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >

            {/* ========== Cards à esquerda ========== */}
            <div className="space-y-8">
              <Card
                
                className="min-h-[20px]"
              >
                <ul className=" text-sm text-dark list-disc list-inside space-y-1">
                  <li>Agendamento 100% online</li>
                  <li>Lembretes por e-mail e WhatsApp</li>
                  <li>Sem burocracia ou exigência de plano</li>
                </ul>
              </Card>

              <Card
                
                className="min-h-[20px]"
              >
                <ul className=" text-sm text-dark list-disc list-inside space-y-1">
                  <li>Gestão centralizada de atendimentos</li>
                  <li>Relatórios para prestação de contas</li>
                  <li>Controle de fluxo e feedback dos pacientes</li>
                </ul>
              </Card>
            </div>

            {/* ========== Conteúdo principal ========== */}
            <div className="text-center lg:text-left">
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-2xl overflow-hidden bg-white">
                <img src="/logo.png" alt="Lunysse" className="w-full h-full object-cover" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Lunysse</h1>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
                Sistema de Agendamento Psicológico
              </h2>

              <p className="text-lg md:text-xl text-white mb-6 max-w-xl leading-relaxed">
                Plataforma digital que otimiza o agendamento e gestão de atendimentos psicológicos voluntários. 
                Desenvolvida para universidades, ONGs e projetos sociais que promovem saúde mental.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Agora
                  </Button>
                </Link>

                <a href="/about">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Conhecer Recursos
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
