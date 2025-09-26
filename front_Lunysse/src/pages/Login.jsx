import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import toast from "react-hot-toast";

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verifica se a confirmação de senha é igual
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const { user, token } = await mockApi.login(formData.email, formData.password);
      login(user, token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center p-8 py-12 space-y-16 relative min-h-screen justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/fundoEntrar.png')" }}
    >
      <Card className="px-20 max-w-wd">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-light mb-2">Entrar</h1>
          <p className="text-dark/70">Acesse a sua conta Lunysse</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />

          {/* Campo de senha */}
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
            required
          />

          {/* Campo de confirmar senha */}
          <Input
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Repita sua senha"
            required
          />

          {/* Botão de login */}
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Links adicionais */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-light hover:text-accent font-medium">
              Criar conta
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
