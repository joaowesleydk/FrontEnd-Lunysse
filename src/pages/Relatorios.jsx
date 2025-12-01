import { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';

import { LoadingSpinner } from '../components/LoadingSpinner';

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';

import { AlertTriangle, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [user.id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const { stats, frequencyData, statusData, riskAlerts } = reportsData;

  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

  return (
    <div className="space-y-6">
     
        <h1 className="text-3xl font-bold text-dark mb-2">Relatórios</h1>
       
      

      {/* Caso não tenha dados */}
      {hasNoData ? (
        <Card className="text-center py-12 border-2 border-dashed border-light/30">
          <BarChart3 className="w-16 h-16 text-light/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark mb-2">Relatórios em Construção</h3>
          <p className="text-dark/70 mb-4">
            Seus relatórios e analytics aparecerão aqui conforme você atender pacientes e realizar sessões.
          </p>
          <p className="text-sm text-dark/50">
            Comece aceitando solicitações de pacientes para gerar dados estatísticos.
          </p>
        </Card>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <Users className="w-8 h-8 text-light mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-dark">{stats.activePatients}</h3>
              <p className="text-dark/70 text-sm">Pacientes Ativos</p>
            </Card>

            <Card className="text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-dark">{stats.totalSessions}</h3>
              <p className="text-dark/70 text-sm">Total de Sessões</p>
            </Card>

            <Card className="text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-dark">{stats.attendanceRate}%</h3>
              <p className="text-dark/70 text-sm">Taxa de Conclusão</p>
            </Card>

            <Card className="text-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-dark">{stats.riskAlerts}</h3>
              <p className="text-dark/70 text-sm">Alertas de Risco</p>
            </Card>
          </div>

          {/* Gráficos + Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Frequência */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4">Frequência de Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#2493BF" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Status */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4">Status das Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2493BF"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Alertas - agora ocupa a largura toda */}
            <Card className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-dark mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Alertas de Risco
              </h2>
              <div className="space-y-3">
                {riskAlerts.length === 0 ? (
                  <p className="text-dark/70 text-center py-4">Nenhum alerta de risco no momento</p>
                ) : (
                  riskAlerts.map(alert => (
                    <div
                      key={alert.id}
                      className="flex justify-between items-center p-4 bg-white/10 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-dark">{alert.patient}</p>
                        <p className="text-sm text-dark/70">{alert.reason}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            alert.risk === 'Alto'
                              ? 'bg-red-500/20 text-red-700'
                              : 'bg-yellow-500/20 text-yellow-700'
                          }`}
                        >
                          Risco {alert.risk}
                        </span>
                        <p className="text-xs text-dark/70 mt-1">
                          {new Date(alert.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
