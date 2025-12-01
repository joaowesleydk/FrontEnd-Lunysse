import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { Card } from '../components/Card';

import { LoadingSpinner } from '../components/LoadingSpinner';

import {

  Users,

  Mail,

  Phone,

  Calendar,

  Activity,

  CheckCircle

} from 'lucide-react';
 
export const Pacientes = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
 
  const loadPatients = async () => {

    setLoading(true);

    try {

      const data = await mockApi.getPatients(user.id);

      console.log('Pacientes carregados:', data);

      setPatients(data);

    } catch (error) {

      console.error('Erro ao carregar pacientes:', error);

    } finally {

      setLoading(false);

    }

  };
 
  useEffect(() => {

    loadPatients();

  }, [user.id]);
 
  useEffect(() => {

    const handleFocus = () => loadPatients();

    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);

  }, []);
 
  if (loading) return <LoadingSpinner size="lg" />;
 
  return (
<div className="space-y-6">
<div className="flex items-center gap-3">

<h1 className="text-3xl font-bold text-dark">Meus Pacientes</h1>
</div>
 
      <div className="grid gap-6">

        {patients.length === 0 ? (
<Card className="text-center py-12">
<Users className="w-16 h-16 text-dark/30 mx-auto mb-4" />
<h3 className="text-xl font-semibold text-dark mb-2">Nenhum paciente encontrado</h3>
<p className="text-dark/70">Seus pacientes aparecerão aqui conforme os agendamentos.</p>
</Card>

        ) : (

          patients.map((patient) => (
<Card

              key={patient.id}

              className="cursor-pointer hover:shadow-lg transition-shadow"

              onClick={() => navigate(`/pacientes/${patient.id}`)}
>
<div className="flex items-center gap-4 mb-4">
<div className="w-14 h-14 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
<Users className="w-7 h-7 text-white" />
</div>
<div>
<h3 className="text-xl font-bold text-dark">{patient.name}</h3>
<p className="text-sm text-dark/60">Paciente #{patient.id}</p>
</div>
</div>
 
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-dark">
<div className="flex items-center gap-2">
<Calendar className="w-4 h-4" />
<span><strong>Idade:</strong> {patient.age} anos</span>
</div>
<div className="flex items-center gap-2">
<Calendar className="w-4 h-4" />
<span><strong>Nascimento:</strong> {patient.birthDate}</span>
</div>
<div className="flex items-center gap-2">
<Phone className="w-4 h-4" />
<span>{patient.phone}</span>
</div>
<div className="flex items-center gap-2">
<Activity className="w-4 h-4" />
<span><strong>Sessões:</strong> {patient.sessions}</span>
</div>
<div className="flex items-center gap-2">
<CheckCircle className="w-4 h-4" />
<span>
<strong>Status:</strong>{" "}
<span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${patient.status === 'Em tratamento' ? 'bg-teal-600' : 'bg-gray-400'}`}>

                      {patient.status}
</span>
</span>
</div>
<div className="flex items-center gap-2">
<Mail className="w-4 h-4" />
<span>{patient.email}</span>
</div>
</div>
</Card>

          ))

        )}
</div>
</div>

  );

};

 