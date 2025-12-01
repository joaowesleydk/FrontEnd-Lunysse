# 🌙 Lunysse – Plataforma para Agendamento de Consultas Psicológicas

Aplicação web moderna para o gerenciamento de consultas psicológicas, criada com **React 19** e **Vite**, destinada a apoiar atendimentos voluntários em universidades, ONGs e projetos sociais.

---

## 📑 Índice
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#️-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Rodar](#️-como-rodar)
- [Estrutura do Código](#-estrutura-do-código)
- [Componentes Principais](#-componentes-principais)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Equipe](#-equipe)

---

## 🎯 Visão Geral
O **Lunysse** foi criado para facilitar a marcação e o gerenciamento de sessões psicológicas, especialmente em projetos de atendimento voluntário.  
Com interfaces específicas para **psicólogos** e **pacientes**, o sistema oferece uma experiência simples, intuitiva e eficiente.

**Metas do Projeto:**
- 📅 Agendamento prático e rápido de consultas  
- 👩‍⚕️ Gestão centralizada de pacientes para psicólogos  
- 📊 Visualização de relatórios e análises  
- 🗂️ Histórico detalhado de sessões  
- 📱 Interface responsiva, moderna e de fácil navegação  

---

## ⚙️ Funcionalidades

### 👩‍⚕️ Para Psicólogos
- Painel com visão geral e KPIs  
- Lista detalhada de pacientes  
- Histórico e relatórios completos  
- Controle de sessões (status, notas, relatórios)  
- Chat integrado com IA especializada em psicologia  
- Agenda personalizada com horários disponíveis  

### 👤 Para Pacientes
- Painel com informações de suas consultas  
- Marcação flexível de sessões (psicólogo, data, hora)  
- Ver especialistas disponíveis e suas áreas  
- Visualização de horários livres em tempo real  

### 🔐 Segurança e Autenticação
- Login seguro com validação  
- Diferenciação automática entre perfis  
- Interfaces de login distintas  
- Cadastro com validação de dados  
- Controle de acesso baseado em perfil  

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React **19.1.1**  
- Vite **7.1.0**  
- React Router DOM **7.8.0**  
- Tailwind CSS **4.1.11**  
- Framer Motion **12.23.12**  
- Lucide React **0.539.0**  
- Recharts **3.1.2**  
- Chart.js **4.5.0**  
- React Hot Toast **2.5.2**  
- @huggingface/inference **4.6.1** (IA)  

### Persistência
- LocalStorage  
- API simulada (mock)  

### Design
- Glassmorphism  
- Paleta de cores consistente  
- Layout responsivo (mobile-first)  

---

## ▶️ Como Rodar

```bash
git clone https://github.com/seu-usuario/sistema-agendamento-psicologico.git
cd sistema-agendamento-psicologico
npm install
cp .env.example .env   
npm run dev

src/
├── assets/
│   └── components/       
│       ├── Button.jsx
│       ├── CampoDeDescricao.jsx
│       ├── Card.jsx
│       ├── CardDeInformacao.jsx
│       ├── Input.jsx
│       ├── KpiCard.jsx
│       ├── LoadingSpinner.jsx
│       ├── MarkdownRenderer.jsx
│       ├── PublicNavbar.jsx
│       ├── SeletorDePsicologos.jsx
│       ├── Sidebar.jsx
│       └── UpcomingAppointment.jsx
│
├── context/              
├── pages/                
│   ├── About.jsx
│   ├── Agendamento.jsx
│   ├── ChatIA.jsx
│   ├── DashboardPaciente.jsx
│   ├── DashboardPsicologo.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Paciente.jsx
│   ├── PacienteDetalhe.jsx
│   ├── Register.jsx
│   ├── Relatorios.jsx
│   ├── SessaoDetalhes.jsx
│   └── Solicitacoes.jsx
│
├── routes/
│   └── AppRoutes.jsx     
│
├── services/             
├── App.jsx              
├── main.jsx              
└── index.css         

Componentes Principais

<Button /> – Botão com diferentes estilos

<Card /> – Container com efeito glassmorphism

<CardDeInformacao /> – Blocos informativos detalhados

<KpiCard /> – Cards de métricas e indicadores

<LoadingSpinner /> – Indicador de carregamento

<MarkdownRenderer /> – Renderização de mensagens da IA

<PublicNavbar /> – Navbar para páginas públicas

<Sidebar /> – Menu lateral de navegação

<SeletorDePsicologos /> – Escolha de profissional no agendamento

<UpcomingAppointment /> – Destaque de próximas consultas

 Rotas da Aplicação
Públicas

/ → Home

/about → Sobre o projeto

/login → Tela de login

/register → Cadastro

Protegidas

/dashboard-paciente → Painel do paciente

/dashboard-psicologo → Painel do psicólogo

/agendamento → Marcação de consultas

/pacientes → Lista de pacientes (psicólogos)

/pacientes/:id → Detalhes do paciente

/sessao/:sessionId → Detalhes da sessão

/chat-ia → Chat com IA

/relatorios → Relatórios do psicólogo

/solicitacoes → Solicitações pendentes