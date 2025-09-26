import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import toast from 'react-hot-toast';

export const Register = () => {
  const [userType, setUserType] = useState('paciente');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    crm: '',
    specialty: '',
    phone: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType
      });
      login(user, token);
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center p-4 py-12 space-y-16 relative min-h-screen justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/fundoRegister.png')" }}
    >
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Criar Conta</h1>
          <p className="text-dark/70">Cadastre-se na lunysse</p>
        </div>

        {/* Selector customizado com bolinha */}
        <div className="flex justify-center gap-8 mb-6">
          {/* Paciente */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <span className="relative w-6 h-6">
              <span className="w-6 h-6 rounded-full bg-dark/70 block"></span>
              {userType === 'paciente' && (
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-light"></span>
              )}
            </span>
            <span className={`text-sm font-medium ${userType === 'paciente' ? 'text-light' : 'text-dark'}`}>
              Paciente
            </span>
            <input
              type="radio"
              name="userType"
              value="paciente"
              checked={userType === 'paciente'}
              onChange={() => setUserType('paciente')}
              className="hidden"
            />
          </label>

          {/* Psicólogo */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <span className="relative w-6 h-6">
              <span className="w-6 h-6 rounded-full bg-dark/70 block"></span>
              {userType === 'psicologo' && (
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-light"></span>
              )}
            </span>
            <span className={`text-sm font-medium ${userType === 'psicologo' ? 'text-light' : 'text-dark'}`}>
              Psicólogo
            </span>
            <input
              type="radio"
              name="userType"
              value="psicologo"
              checked={userType === 'psicologo'}
              onChange={() => setUserType('psicologo')}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />

          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
            required
          />

          <Input
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Confirme sua senha"
            required
          />

          {/* Campos específicos para psicólogo */}
          {userType === 'psicologo' && (
            <>
              <Input
                label="CRM"
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                placeholder="Ex: CRP 12/34567"
                required
              />

              <Input
                label="Especialidade"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                required
              />

              <Input
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />
            </>
          )}

          {/* Campos específicos para paciente */}
          {userType === 'paciente' && (
            <>
              <Input
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />

              <Input
                label="Data de nascimento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Cadastrar
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-light hover:text-accent font-medium">
              Fazer login
            </Link>
          </p>
          <p className="text-dark/70">
            <Link to="/" className="text-light hover:text-accent font-medium">
              ← Voltar ao início
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
