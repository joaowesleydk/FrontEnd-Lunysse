// Importações necessárias
import { Link } from 'react-router-dom'; 
import { Button } from '../components/Button'; 
import { Heart, Target, Award, Users, Brain, Shield, Zap, Calendar, Activity, FileText } from 'lucide-react'; 

// Componente funcional "About"
export const About = () => {
  // Array que define os valores da empresa/plataforma
  const values = [
    {
      icon: <Heart className="w-6 h-6 text-light" />,
      title: 'Impacto Social',
      description: 'Focamos em projetos voluntários que promovem saúde mental para comunidades vulneráveis'
    },
    {
      icon: <Brain className="w-6 h-6 text-accent" />,
      title: 'Inteligência Artificial',
      description: 'Machine Learning para identificar padrões emocionais e apoiar decisões clínicas'
    },
    {
      icon: <Shield className="w-6 h-6 text-medium" />,
      title: 'Segurança Total',
      description: 'Autenticação JWT e proteção rigorosa de dados sensíveis dos pacientes'
    },
    {
      icon: <Users className="w-6 h-6 text-light" />,
      title: 'Acessibilidade',
      description: 'Interface acolhedora, responsiva e compatível com tecnologias assistivas'
    }
  ];

 

  return (
    <div className="  py-12 space-y-16 relative min-h-screen   justify-center text-center  bg-cover bg-center" 
    style={{ backgroundImage: "url('/fundoAbout.png')" }} >

      {/* Seção Hero (Sobre o Lunysse) */}
      <section className="text-center py-12 ">
        <div className="max-w-4xl mx-auto">
          {/* Logo centralizado */}
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img src="/logo.png" alt="Lunysse" className="w-12 h-12 rounded-xl" />
          </div>
          <h1 className="text-4xl font-bold text-dark mb-8">Sobre o Lunysse</h1>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <p className="text-lg text-gray-800 mb-4">
            
      O Lunysse é uma plataforma digital desenvolvida para facilitar o agendamento, registro e acompanhamento de atendimentos psicológicos voluntários. Criado com foco em instituições como universidades, ONGs e projetos sociais, o sistema oferece uma experiência acessível, segura e centrada no bem-estar emocional.
Com o apoio de tecnologias inteligentes, o Lunysse organiza as agendas de psicólogos e pacientes, registra o histórico das sessões e analisa padrões emocionais de risco, contribuindo para um cuidado psicológico mais eficiente e humano.

            </p>
            <p className="text-gray-600">
              Desenvolvido especificamente para instituições que oferecem apoio psicológico gratuito...
            </p>
          </div>
        </div>
      </section>

      {/* Seção Missão e Visão */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          {/* Missão */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Diferenciais</h2>
            <p className="text-gray-700 mb-3">
Acessibilidade e Usabilidade: Interface simples e intuitiva para todos os públicos.
Privacidade e Segurança: Seus dados são tratados com responsabilidade e confidencialidade.
Recursos Inteligentes: Geração de lembretes, relatórios automáticos e análise emocional com IA.
Atendimento Humanizado: Apoio a psicólogos voluntários e pacientes em contextos sociais diversos...

            </p>
            <p className="text-gray-600 text-sm">
              Nosso objetivo é diferenciar de qualquer outra ferramenta tecnológica para ajuda psicológica...
            </p>
          </div>

          {/* Visão */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Para Quem foi Feito?</h2>
            <p className="text-gray-700 mb-3">
 Psicólogos voluntários ou ligados a projetos sociais.
Estudantes e pessoas atendidas por iniciativas comunitárias ou universitárias.
Coordenadores responsáveis pela gestão dos atendimentos psicológicos...

            </p>
            <p className="text-gray-600 text-sm">
              Queremos transformar a forma como projetos sociais gerenciam seus atendimentos...
            </p>
          </div>
        </div>
      </section>

  
    
    </div>
  );
};
