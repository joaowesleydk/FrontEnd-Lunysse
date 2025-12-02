import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { User, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { CampoDeDescricao } from "../components/CampoDeDescricao";
import { psychologistService, requestService } from "../services/apiService";
 
export const Agendamento = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
 
  const [selectedPsychologist, setSelectedPsychologist] = useState("");
  const [psychologists, setPsychologists] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [requestData, setRequestData] = useState({
    description: "",
    urgency: "media",
  });
 
  // Sugestões rápidas
  const quickSuggestions = [
    "Estou passando por muita ansiedade.",
    "Tenho tido crises recorrentes.",
    "Preciso de acompanhamento psicológico.",
    "Quero ajuda para lidar com estresse.",
  ];
 
  // Frase motivacional
  const randomPhrase = useMemo(() => {
    const frases = [
      "Você está dando um passo importante para cuidar de si. 💙",
      "Buscar ajuda é um ato de coragem!",
      "Estamos aqui para te ajudar no seu caminho.",
      "Você não está sozinho — vamos juntos.",
    ];
    return frases[Math.floor(Math.random() * frases.length)];
  }, []);
 
  // Carregar psicólogos
  useEffect(() => {
    loadPsychologists();
  }, []);
 
  const loadPsychologists = async () => {
    try {
      const data = await psychologistService.getPsychologists();
      setPsychologists(data);
    } catch {
      toast.error("Erro ao carregar psicólogos");
    }
  };
 
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
 
    if (!selectedPsychologist || !requestData.description.trim()) {
      toast.error("Selecione um psicólogo e descreva sua necessidade");
      return;
    }
 
    setSubmitting(true);
 
    try {
      await requestService.createRequest({
        patient_id: user.id,
        patient_name: user.name,
        patient_email: user.email,
        patient_phone: user.phone || "(11) 99999-9999",
 
        preferred_psychologist: Number(selectedPsychologist),
 
        description: requestData.description,
        urgency: requestData.urgency,
 
        preferred_dates: [], // obrigatório pela API
        preferred_times: [], // obrigatório pela API
      });
 
      toast.success("Solicitação enviada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao enviar solicitação");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
 
  const selectedPsychologistInfo = psychologists.find(
    (ps) => ps.id === Number(selectedPsychologist)
  );
 
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6 animate-fadeInUp">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Solicitar ser Paciente</h1>
          <p className="text-white/80">
            Escolha um psicólogo e descreva sua necessidade de atendimento
          </p>
        </div>
 
        <Card className="shadow-xl backdrop-blur-md">
          <form onSubmit={handleRequestSubmit} className="space-y-6">
           
            {/* Seleção do psicólogo */}
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
                <User className="w-5 h-5 text-sky-600" />
                Escolha o Psicólogo
              </label>
 
              <select
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              >
                <option value="">Selecione um psicólogo</option>
                {psychologists.map((psych) => (
                  <option key={psych.id} value={psych.id}>
                    {psych.name} - {psych.specialty}
                  </option>
                ))}
              </select>
            </div>
 
            {/* Informações do psicólogo */}
            {selectedPsychologistInfo && (
              <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-lg shadow-sm">
                <img
                  src={selectedPsychologistInfo.photo}
                  alt={selectedPsychologistInfo.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sky-800">
                    {selectedPsychologistInfo.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPsychologistInfo.specialty}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPsychologistInfo.bio}
                  </p>
                </div>
              </div>
            )}
 
            {/* Descrição */}
            <div>
              <CampoDeDescricao
                valor={requestData.description}
                onChange={(v) =>
                  setRequestData({ ...requestData, description: v })
                }
              />
 
              <div className="flex flex-wrap gap-2 mt-2">
                {quickSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setRequestData({ ...requestData, description: sug })
                    }
                    className="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Urgência */}
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
                <Zap className="w-5 h-5 text-sky-600" />
                Nível de Urgência
              </label>
 
              <select
                value={requestData.urgency}
                onChange={(e) =>
                  setRequestData({ ...requestData, urgency: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="baixa">Baixa - Posso aguardar</option>
                <option value="media">Média - Prefiro em breve</option>
                <option value="alta">Alta - Preciso urgentemente</option>
              </select>
            </div>
 
            <p className="text-center text-sm text-gray-500 italic">
              {randomPhrase}
            </p>
 
            {/* Botões */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancelar
              </Button>
 
              <Button
                type="submit"
                loading={submitting}
                className="flex-1 hover:scale-[1.02] transition-transform"
                disabled={!selectedPsychologist || !requestData.description}
              >
                Enviar Solicitação
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
 
 