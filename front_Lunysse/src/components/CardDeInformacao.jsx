
import { Card } from './Card';

export const CardDeInformacao = ({ psychologist }) => {
  if (!psychologist) return null;

  return (
    <Card className="bg-blue-50">
      <h3 className="font-semibold text-dark mb-2">Informações Importantes</h3>
      <div className="space-y-2 text-sm text-dark/70">
        <p>
          <strong>Psicólogo selecionado:</strong> {psychologist.name}
        </p>
        <p>
          <strong>Especialidade:</strong> {psychologist.specialty}
        </p>

        <div className="mt-3 p-3 bg-blue-100 rounded-lg">
          <p className="text-blue-800">
            <strong>Como funciona:</strong> Sua solicitação será enviada ao psicólogo. Se aceita, ele entrará em contato para agendar as sessões nos horários que funcionem para ambos.
          </p>
        </div>
      </div>
    </Card>
  );
};
