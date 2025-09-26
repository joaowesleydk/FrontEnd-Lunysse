import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Bell, User, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
 
export const Solicitacoes = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingRequests, setProcessingRequests] = useState(new Set());
 
    useEffect(() => {
        loadRequests();
    }, [user.id]);
 
    const loadRequests = async () => {
        setLoading(true);
        try {
            const data = await mockApi.getRequests(user.id);
            // Filtrar apenas solicitações pendentes
            const pendingRequests = data.filter(req => req.status === 'pendente');
            setRequests(pendingRequests);
        } catch (error) {
            console.error('Erro ao carregar solicitações:', error);
        } finally {
            setLoading(false);
        }
    };
 
    const handleAcceptRequest = async (requestId, requestData) => {
        setProcessingRequests(prev => new Set([...prev, requestId]));
        try {
            // Verificar se já existe paciente com mesmo email
            const existingPatients = await mockApi.getPatients(user.id);
            const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
            if (duplicatePatient) {
                toast.error('Este paciente já está cadastrado em sua lista!');
                return;
            }
 
            // Criar novo paciente
            await mockApi.createPatient({
                name: requestData.patientName,
                email: requestData.patientEmail,
                phone: requestData.patientPhone,
                birthDate: '1990-01-01', // Valor padrão - pode ser atualizado depois
                age: 30, // Valor padrão - pode ser atualizado depois
                status: 'Ativo',
                psychologistId: user.id
            });
 
            // Atualizar status da solicitação
            await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');
            // Remover solicitação da lista
            setRequests(prev => prev.filter(req => req.id !== requestId));
            toast.success('Solicitação aceita! Paciente adicionado à sua lista.');
        } catch (error) {
            console.error('Erro ao aceitar solicitação:', error);
            toast.error('Erro ao processar solicitação');
        } finally {
            setProcessingRequests(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };
 
    const handleRejectRequest = async (requestId) => {
        setProcessingRequests(prev => new Set([...prev, requestId]));
        try {
            await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada pelo psicólogo');
            // Remover solicitação da lista
            setRequests(prev => prev.filter(req => req.id !== requestId));
            toast.success('Solicitação rejeitada.');
        } catch (error) {
            console.error('Erro ao rejeitar solicitação:', error);
            toast.error('Erro ao processar solicitação');
        } finally {
            setProcessingRequests(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };
 
    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'alta': return 'bg-red-100 text-red-800';
            case 'media': return 'bg-yellow-100 text-yellow-800';
            case 'baixa': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
 
    const getStatusColor = (status) => {
        switch (status) {
            case 'aceito': return 'bg-green-100 text-green-800';
            case 'rejeitado': return 'bg-red-100 text-red-800';
            case 'pendente': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
 
    if (loading) return <LoadingSpinner size="lg" />;
 
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-light" />
                <h1 className="text-3xl font-bold text-white">Solicitações de Pacientes</h1>
            </div>
 
            <div className="grid gap-6">
                {requests.length === 0 ? (
                    <Card className="text-center py-2 bg-[#88C1D3]/30">
                        <Bell className="w-16 h-16 text-dark/30 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark mb-2">Nenhuma solicitação encontrada</h3>
                        <p className="text-dark/70">As solicitações de novos pacientes aparecerão aqui.</p>
                    </Card>
                ) : (
                    requests.map(request => (
                        <Card key={request.id} className="space-y-4 bg-[#88C1D3]/30 rounded-4xl">
                            <div className="flex justify-between items-start">
                                <div className="flex  items-center gap-5">
                                    <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center ">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className=''>
                                        <h3 className="text-lg font-semibold text-white">{request.patientName}</h3>
                                        <p className="text-md text-dark">{request.patientEmail}</p>
                                        <p className="text-md text-dark">{request.patientPhone}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                                        {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'} urgência
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                        {request.status === 'aceito' ? 'Aceito' : request.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
                                    </span>
                                </div>
                            </div>
 
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-dark mb-2">Descrição da necessidade:</h4>
                                <p className="text-dark/70">{request.description}</p>
                            </div>
 
                            <div className="flex items-center gap-4 text-sm text-dark">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
 
                            {request.notes && (
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <p className="text-sm text-blue-800">
                                        <strong>Observações:</strong> {request.notes}
                                    </p>
                                </div>
                            )}
 
                            <div className="flex gap-2  justify-between w-2xs ml-230  ">
                                <Button
                                    variant="solicitacao"
                                    onClick={() => handleRejectRequest(request.id)}
                                    loading={processingRequests.has(request.id)}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Rejeitar
                                </Button>
                                <Button
                                    onClick={() => handleAcceptRequest(request.id, request)}
                                    loading={processingRequests.has(request.id)}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Aceitar
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
 