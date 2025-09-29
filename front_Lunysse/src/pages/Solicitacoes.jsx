import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { Bell, User, Clock, X, CheckCircle } from 'lucide-react';
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
            const existingPatients = await mockApi.getPatients(user.id);
            const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
            if (duplicatePatient) {
                toast.error('Este paciente já está cadastrado em sua lista!');
                return;
            }

            await mockApi.createPatient({
                name: requestData.patientName,
                email: requestData.patientEmail,
                phone: requestData.patientPhone,
                birthDate: '1990-01-01',
                age: 30,
                status: 'Ativo',
                psychologistId: user.id
            });

            await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');
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

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
               
                <h1 className="text-3xl font-bold text-dark">Solicitações de Pacientes</h1>
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
                        <Card key={request.id} className="bg-accent rounded-2xl p-4 shadow-md">
                            {/* Cabeçalho com ícone e nome */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-black">{request.patientName}</h3>
                                    <p className="text-sm text-gray-700">
                                        {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>

                            {/* Email e telefone */}
                            <div className="flex flex-col gap-1 mb-3 text-sm text-black">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">📧</span>
                                    {request.patientEmail}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">📞</span>
                                    {request.patientPhone}
                                </div>
                            </div>

                            {/* Descrição */}
                            <p className="text-black text-base mb-4">{request.description}</p>

                            {/* Botões */}
                            <div className="flex items-center justify-end gap-6">
                                <button
                                    onClick={() => handleRejectRequest(request.id)}
                                    disabled={processingRequests.has(request.id)}
                                    className="flex items-center gap-2 text-sm text-black"
                                >
                                    <X className="w-4 h-4" />
                                    Recusar
                                </button>
                                <button
                                    onClick={() => handleAcceptRequest(request.id, request)}
                                    disabled={processingRequests.has(request.id)}
                                    className="flex items-center gap-2 text-sm bg-accent text-white px-4 py-1 rounded-full"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Aceitar Paciente
                                </button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
