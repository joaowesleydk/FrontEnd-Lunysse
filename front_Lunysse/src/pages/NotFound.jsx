// Importa o componente Link da biblioteca react-router-dom para navegação entre páginas
import { Link } from 'react-router-dom';

// Importa o componente Button personalizado (provavelmente estilizado com Tailwind ou algum design system)
import { Button } from '../components/Button';

// Importa o componente Card, também personalizado
import { Card } from '../components/Card';

// Importa o ícone "Home" da biblioteca Lucide (ícones baseados em React)
import { Home } from 'lucide-react';

// Exporta o componente funcional NotFound (página de erro 404)
export const NotFound = () => {
  return (
    // Container principal da página 404, com altura mínima da tela e centralização do conteúdo
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* Componente Card centralizado com largura máxima definida e alinhamento de texto no centro */}
      <Card className="text-center max-w-md">
        
        {/* Seção de título e mensagem */}
        <div className="mb-6">
          {/* Código do erro em destaque */}
          <h1 className="text-6xl font-bold text-light mb-4">404</h1>
          
          {/* Título da mensagem de erro */}
          <h2 className="text-2xl font-semibold text-dark mb-2">Página não encontrada</h2>
          
          {/* Texto explicativo com opacidade reduzida */}
          <p className="text-dark/70">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Link de navegação para voltar ao dashboard */}
        <Link to="/dashboard">
          {/* Botão com ícone de "Home" e texto, centralizado */}
          <Button className="flex items-center gap-2 mx-auto">
            <Home size={20} />
            Voltar ao Início
          </Button>
        </Link>
      </Card>
    </div>
  );
};
