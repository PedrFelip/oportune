import React, { useState } from "react";

// --- ÍCONES E COMPONENTES DE UI REUTILIZÁVEIS ---

// Ícone de Verificação para a tela de sucesso
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// Cabeçalho do Card, reutilizado em vários passos
const CardHeader = ({ title, subtitle, showLogo = false }) => (
  <header className="text-center mb-7">
    {showLogo && (
      <div className="flex justify-center items-center gap-3 font-bold mb-4">
        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2474e4] to-[#639bec] flex items-center justify-center shadow-lg font-extrabold text-white text-xl">
          O
        </div>
      </div>
    )}
    <h1 className="text-white text-2xl font-bold">{title}</h1>
    <p className="text-sm text-[#c4d3e6] mt-1.5">{subtitle}</p>
  </header>
);

// Componente de Input estilizado
const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  required = true,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-[#c4d3e6]"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
      required={required}
    />
  </div>
);

// --- COMPONENTES DOS PASSOS DO CADASTRO ---

// Passo 1: Seleção do Tipo de Perfil
const Step1_ProfileSelection = ({ onProfileSelect }) => {
  const roles = [
    {
      type: "aluno",
      title: "Sou Aluno",
      description: "Procurando por estágios, projetos de pesquisa e extensão.",
    },
    {
      type: "empresa",
      title: "Sou Empresa",
      description:
        "Buscando por talentos universitários para preencher as minhas vagas.",
    },
    {
      type: "professor",
      title: "Sou Professor",
      description: "Querendo divulgar projetos e recrutar alunos.",
    },
  ];

  return (
    <div className="animate-fadeIn">
      <CardHeader
        showLogo
        title="Junte-se ao Oportune"
        subtitle="Selecione o tipo de perfil que melhor o descreve."
      />
      <main>
        {roles.map((role) => (
          <div
            key={role.type}
            onClick={() => onProfileSelect(role.type)}
            className="bg-[rgba(196,211,230,0.02)] border border-white/5 rounded-xl p-4 mb-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(196,211,230,0.04)] hover:border-[#40638c]"
          >
            <h3 className="text-white font-bold text-base">{role.title}</h3>
            <p className="text-[#c4d3e6] text-xs leading-relaxed">
              {role.description}
            </p>
          </div>
        ))}
      </main>
      <footer className="text-center mt-6 text-sm">
        <p className="text-[#c4d3e6]">
          Já tem uma conta?{" "}
          <a
            href="#"
            className="font-semibold text-[#639bec] hover:text-white hover:underline"
          >
            Faça login
          </a>
        </p>
      </footer>
    </div>
  );
};

// Passo 2: Informações Básicas de Acesso
const Step2_BasicInfo = ({ profileType, onNext, onBack }) => {
  const isEmpresa = profileType === "empresa";

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="animate-fadeIn">
      <CardHeader
        title="Crie a sua Conta"
        subtitle="Vamos começar com as informações básicas de acesso."
      />
      <main>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="name"
            label={isEmpresa ? "Nome da Empresa" : "Nome Completo"}
            placeholder={
              isEmpresa ? "Ex: Oportune Soluções" : "Ex: João da Silva"
            }
          />
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="seuemail@dominio.com"
          />
          <FormInput
            id="password"
            label="Crie uma Senha"
            type="password"
            placeholder="••••••••••"
          />
          <FormInput
            id="confirm-password"
            label="Confirme a sua Senha"
            type="password"
            placeholder="••••••••••"
          />

          <div className="flex items-center gap-2.5 text-xs mb-4">
            <input
              type="checkbox"
              id="terms"
              className="accent-[#2474e4]"
              required
            />
            <label htmlFor="terms" className="text-[#c4d3e6]">
              Li e aceito os{" "}
              <a
                href="#"
                className="font-semibold text-[#639bec] hover:text-white hover:underline"
              >
                Termos de Serviço
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
          >
            Continuar
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-[rgba(196,211,230,0.04)] text-[#c4d3e6] font-medium py-3 rounded-lg border border-white/10 mt-3 transition-all hover:bg-[rgba(196,211,230,0.02)] hover:text-white"
          >
            Voltar
          </button>
        </form>
      </main>
    </div>
  );
};

// Passo 3: Formulários Específicos de Perfil
const Step3_ProfileDetails = ({ profileType, onFinish, onBack }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish();
  };

  const forms = {
    aluno: (
      <>
        <CardHeader
          title="Perfil Académico"
          subtitle="Ajude-nos a encontrar as melhores oportunidades para si."
        />
        <FormInput
          id="curso"
          label="Curso"
          placeholder="Ex: Engenharia de Software"
        />
        <FormInput
          id="semestre"
          label="Semestre Atual"
          type="number"
          placeholder="Ex: 5"
        />
        <FormInput id="matricula" label="Número de Matrícula" />
      </>
    ),
    empresa: (
      <>
        <CardHeader
          title="Informações da Empresa"
          subtitle="Registe a sua empresa para encontrar os melhores talentos."
        />
        <FormInput id="razao-social" label="Razão Social" />
        <FormInput id="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" />
        <FormInput
          id="ramo"
          label="Ramo de Atividade"
          placeholder="Ex: Tecnologia da Informação"
        />
      </>
    ),
    professor: (
      <>
        <CardHeader
          title="Perfil de Docente"
          subtitle="Complete o seu perfil para divulgar os seus projetos."
        />
        <FormInput
          id="departamento"
          label="Departamento"
          placeholder="Ex: Departamento de TI"
        />
        <FormInput
          id="titulacao"
          label="Titulação"
          placeholder="Ex: Mestre, Doutor"
        />
        <FormInput
          id="lattes"
          label="Link para o Lattes (Opcional)"
          type="url"
          placeholder="https://..."
          required={false}
        />
      </>
    ),
  };

  return (
    <div className="animate-fadeIn">
      <form onSubmit={handleSubmit}>
        {forms[profileType]}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20 mt-2"
        >
          Finalizar Cadastro
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-[rgba(196,211,230,0.04)] text-[#c4d3e6] font-medium py-3 rounded-lg border border-white/10 mt-3 transition-all hover:bg-[rgba(196,211,230,0.02)] hover:text-white"
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

// Passo 4: Tela de Confirmação
const Step4_Confirmation = () => (
  <div className="animate-fadeIn text-center">
    <div className="w-16 h-16 mx-auto text-[#639bec]">
      <CheckIcon />
    </div>
    <h2 className="text-white text-xl font-bold mt-4 mb-2">
      Cadastro realizado com sucesso!
    </h2>
    <p className="text-[#c4d3e6] text-sm mb-6">
      Enviámos um e-mail de confirmação para si. Por favor, verifique a sua
      caixa de entrada para ativar a sua conta.
    </p>
    <button
      onClick={() => alert("Redirecionando para o painel...")}
      className="w-full bg-gradient-to-r from-[#2474e4] to-[#639bec] text-white font-semibold py-3.5 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2474e4]/20"
    >
      Ir para o meu Painel
    </button>
  </div>
);

// --- COMPONENTE PRINCIPAL DA APLICAÇÃO ---
export default function Cadastro() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileType, setProfileType] = useState(""); // 'aluno', 'empresa', 'professor'

  const handleProfileSelect = (type) => {
    setProfileType(type);
    setCurrentStep(2);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_ProfileSelection onProfileSelect={handleProfileSelect} />;
      case 2:
        return (
          <Step2_BasicInfo
            profileType={profileType}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3_ProfileDetails
            profileType={profileType}
            onFinish={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return <Step4_Confirmation />;
      default:
        return <Step1_ProfileSelection onProfileSelect={handleProfileSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a2c] to-[#15223c] flex items-center justify-center p-4 font-['Inter',_sans-serif] text-[#c4d3e6]">
      <div className="w-full max-w-md">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
