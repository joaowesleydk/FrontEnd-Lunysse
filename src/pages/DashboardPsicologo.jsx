import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { appointmentService, patientService, requestService } from '../services/apiService';
import { KpiCard } from '../components/KpiCard';

import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, Users, Bell , CheckCheck} from 'lucide-react';
export const DashboardPsicologo = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadData = useCallback(async () => {
    try {
      console.log('Carregando dados do dashboard para psicólogo:', user.id);
      const [appointmentsData, patientsData, requestsData] = await Promise.all([
        appointmentService.getAppointments(),
        patientService.getPatients(),
        requestService.getRequests('pendente')
      ]);
      console.log('Agendamentos:', appointmentsData);
      console.log('Pacientes:', patientsData);
      console.log('Solicitações:', requestsData);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  // Recarrega quando a página fica visível e a cada 5 segundos
  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);  
    const interval = setInterval(loadData, 5000); // Recarrega a cada 5 segundos
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);
  if (loading) return <LoadingSpinner size="lg" />;
  // Filtra agendamentos de hoje para o psicólogo logado (apenas agendados)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date || apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    const isToday = appointmentDate.getTime() === today.getTime();
    const isPsychologist = (apt.psychologist_id || apt.psychologistId) === user.id;
    const isScheduled = apt.status === 'agendado';
    return isToday && isPsychologist && isScheduled;
  });
  // Estatísticas baseadas nos dados reais do psicólogo
  const totalPatients = patients.length;
  const completedSessions = appointments.filter(apt =>
    apt.status === 'concluido' && (apt.psychologist_id || apt.psychologistId) === user.id
  ).length;
  const pendingRequests = requests.filter(req =>
    req.status === 'pendente' && req.preferred_psychologist === user.id
  ).length;
  // Próximos agendamentos do psicólogo
  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date || apt.date);
    const isPsychologist = (apt.psychologist_id || apt.psychologistId) === user.id;
    const isScheduled = apt.status === 'agendado';
    const isFuture = appointmentDate >= new Date();
    return isFuture && isScheduled && isPsychologist;
  }).slice(0, 5);
  // Verifica se é um psicólogo novo (sem dados)
  const isNewPsychologist = totalPatients === 0 && appointments.length === 0 && requests.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-white">Bem-vindo, {user.name}</p>
      </div>

      {/* Mensagem para psicólogos novos */}
      {isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-dashed border-light/30">
          <Users className="w-16 h-16 text-light/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark mb-2">
            Bem-vindo ao Lunysse!
          </h3>
          <p className="text-dark/70 mb-4">
            Você é novo por aqui. Seus pacientes e agendamentos aparecerão neste
            dashboard conforme você começar a receber solicitações e agendar
            sessões.
          </p>
          <p className="text-sm text-dark/50">
            Explore o menu lateral para conhecer todas as funcionalidades
            disponíveis.
          </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          icon={<Users className="w-8 h-8 text-dark mx-auto" />}
          value={totalPatients}
          label="Pacientes Ativos"
        />
        <KpiCard
          icon={<Calendar className="w-8 h-8 text-dark mx-auto" />}
          value={todayAppointments.length}
          label="Sessões Hoje"
        />
        <KpiCard
          icon={<CheckCheck className="w-8 h-8 text-dark mx-auto" />}
          value={completedSessions}
          label="Sessões Concluídas"
        />
        <KpiCard
          icon={<Bell className="w-8 h-8 text-dark mx-auto" />}
          value={pendingRequests}
          label="Solicitações Pendentes"
        />
      </div>

      {/* Próximos Agendamentos */}
      {!isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">
            Próximos Agendamentos
          </h2>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark/70 mb-2">
                Nenhum agendamento futuro encontrado.
              </p>
              <p className="text-sm text-dark/50">
                {totalPatients === 0
                  ? 'Você ainda não possui pacientes cadastrados.'
                  : 'Todos os agendamentos estão em dia!'}
              </p>
            </div>
          ) : (
            <Suspense fallback={<LoadingSpinner size="sm" />}>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => {
                  const patient = patients.find(
                    (p) => p.id === appointment.patientId
                  );
                  return (
                    <UpcomingAppointmentItem
                      key={appointment.id}
                      appointment={appointment}
                      patient={patient}
                    />
                  );
                })}
              </div>
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};
