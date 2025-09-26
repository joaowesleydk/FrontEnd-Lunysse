// Importações necessárias 
import { Link } from 'react-router-dom'; // Para navegação entre páginas
import { motion } from 'framer-motion'; // Para animações suaves
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react'; // Ícones vetoriais
import { Button } from '../components/Button'; // Botão customizado do projeto

// Página inicial (Home)
export const Home = () => {
  // Lista de recursos/funcionalidades que serão exibidos na seção de "features"
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
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative min-h-screen flex items-center  justify-center text-center py-20 bg-cover bg-center" 
        style={{ backgroundImage: "url('/bg-home.jpg')" }} 
      >
        {/* Overlay escuro para contraste no texto */} 
        <div className="absolute inset-0 bg-black/50"></div> 

        <div className="relative z-10"> {/* ALTERADO */}
          {/* Animação de entrada do framer-motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}   
            transition={{ duration: 0.8 }}
          >
            {/* Logo centralizada */}
            <div className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl overflow-hidden bg-white">
              <img src="/logo.png" alt="Lunysse" className="w-full h-full object-cover" />
            </div>
            
            {/* Nome do sistema */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lunysse
            </h1>
            
            {/* Subtítulo */}
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
              Sistema de Agendamento Psicológico
            </h2>
            
            {/* Descrição principal */}
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
              Plataforma digital que otimiza o agendamento e gestão de atendimentos psicológicos voluntários. 
              Desenvolvida para universidades, ONGs e projetos sociais que promovem saúde mental.
            </p>
            
            {/* Botões de ação (CTA) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Botão para criar conta */}
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Começar Agora
                </Button>
              </Link>

              {/* Botão para rolar até os recursos */}
              <a href="/about" onClick={(e) => {
           
              }}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto ">
                  Conhecer Recursos
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

     

    </div>
  );
};
