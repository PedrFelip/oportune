"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo_oportune.png";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "geral" | "alunos" | "empresas" | "professores";
}

const faqData: FAQItem[] = [
  {
    question: "O que é o Oportune+?",
    answer:
      "O Oportune+ é uma plataforma digital que conecta estudantes universitários a oportunidades de estágio, projetos de pesquisa e extensão. Facilitamos o encontro entre talentos acadêmicos e empresas ou professores que buscam colaboradores qualificados.",
    category: "geral",
  },
  {
    question: "O Oportune+ é gratuito?",
    answer:
      "Sim! O Oportune+ é totalmente gratuito para estudantes. Empresas e professores também podem publicar vagas gratuitamente, com opções de planos premium para recursos avançados.",
    category: "geral",
  },
  {
    question: "Como faço para criar uma conta?",
    answer:
      "Clique no botão 'Criar conta' no topo da página, escolha seu tipo de perfil (Aluno, Empresa ou Professor) e preencha as informações solicitadas. O processo leva apenas alguns minutos!",
    category: "geral",
  },
  // {
  //   question: "Quais universidades estão cadastradas?",
  //   answer:
  //     "Atualmente, o Oportune+ está expandindo para várias universidades brasileiras. Durante o cadastro, você pode selecionar sua instituição. Se ela não estiver na lista, entre em contato conosco para incluí-la.",
  //   category: "geral",
  // },
  {
    question: "Como busco por vagas?",
    answer:
      "Após fazer login, acesse a página de 'Oportunidades' e utilize os filtros por curso, semestre e o tipo de oportunidade (estágio, pesquisa, extensão). Nossa busca inteligente mostra as vagas mais relevantes para seu perfil.",
    category: "alunos",
  },
  {
    question: "Como me candidato a uma vaga?",
    answer:
      "É muito simples! Encontre a vaga de interesse, clique em 'Ver detalhes' e depois em 'Candidatar-se'. Seu perfil será enviado automaticamente para a empresa ou professor responsável pela vaga.",
    category: "alunos",
  },
  {
    question: "Posso me candidatar a quantas vagas?",
    answer:
      "Não há limite de candidaturas! Você pode se candidatar a quantas vagas desejar. Acompanhe o status de todas suas candidaturas no seu dashboard.",
    category: "alunos",
  },
  {
    question: "Como acompanho minhas candidaturas?",
    answer:
      "No seu dashboard, você encontra a seção 'Minhas Candidaturas' com o status de cada uma: Pendente, Em Análise, Aceita ou Recusada. Você também recebe notificações quando há atualizações.",
    category: "alunos",
  },
  {
    question: "Posso editar meu perfil depois de criado?",
    answer:
      "Sim! Você pode editar suas informações, adicionar habilidades, experiências e atualizar seu currículo a qualquer momento através da página de 'Perfil'.",
    category: "alunos",
  },
  {
    question: "Como publico uma vaga?",
    answer:
      "Após fazer login como Empresa, acesse 'Publicar Vaga' no menu. Preencha as informações sobre a oportunidade (título, descrição, requisitos, curso alvo, semestre mínimo, etc.) e clique em 'Publicar'.",
    category: "empresas",
  },
  {
    question: "Como visualizo os candidatos?",
    answer:
      "Acesse 'Minhas Vagas' no seu dashboard e clique na vaga desejada. Você verá todos os candidatos, poderá filtrar por critérios e visualizar os perfis completos de cada um.",
    category: "empresas",
  },
  {
    question: "Posso filtrar candidatos por habilidades específicas?",
    answer:
      "Sim! Na página de candidatos, você pode aplicar filtros por curso, semestre, habilidades técnicas, experiência prévia e outros critérios relevantes para sua vaga.",
    category: "empresas",
  },
  {
    question: "Como entro em contato com um candidato?",
    answer:
      "Após visualizar o perfil de um candidato, você pode enviar mensagens através da plataforma ou visualizar as informações de contato (e-mail) fornecidas pelo estudante.",
    category: "empresas",
  },
  {
    question: "Posso editar ou remover uma vaga publicada?",
    answer:
      "Sim! Em 'Minhas Vagas', você pode editar informações, pausar ou encerrar vagas a qualquer momento. Vagas encerradas não aparecem mais nas buscas, mas você mantém o histórico de candidatos.",
    category: "empresas",
  },
  {
    question: "Como divulgo um projeto de pesquisa ou extensão?",
    answer:
      "O processo é o mesmo de empresas. Acesse 'Publicar Oportunidade' no menu, selecione o tipo 'Projeto de Pesquisa' ou 'Projeto de Extensão' e preencha os detalhes sobre seu projeto.",
    category: "professores",
  },
  {
    question: "Posso limitar as candidaturas a alunos de cursos específicos?",
    answer:
      "Sim! Ao publicar uma oportunidade, você pode definir quais cursos são elegíveis e o semestre mínimo necessário. Isso garante que apenas alunos qualificados se candidatem.",
    category: "professores",
  },
  {
    question: "Como gerencio as inscrições no meu projeto?",
    answer:
      "No seu dashboard, acesse 'Meus Projetos' e visualize todos os candidatos. Você pode aceitar, recusar ou marcar candidatos para análise posterior. Os estudantes são notificados automaticamente sobre as decisões.",
    category: "professores",
  },
];

const categories = [
  { id: "todos", label: "Todas as Perguntas" },
  { id: "geral", label: "Perguntas Gerais" },
  { id: "alunos", label: "Para Alunos" },
  { id: "empresas", label: "Para Empresas" },
  { id: "professores", label: "Para Professores" },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredFAQ = faqData.filter((item) => {
    const matchesCategory =
      selectedCategory === "todos" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen oportune-gradient text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-slate-800/30 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Oportune logo" width={40} height={40} className="sm:w-12 sm:h-12" />
          <span className="text-2xl sm:text-3xl font-bold">
            Oportune <span className="text-blue-300">+</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/sobre"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/faq"
            className="text-white font-semibold transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link href="/cadastro">
            <Button variant="oportune">Criar conta</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-800/95 backdrop-blur-sm px-4 py-4 space-y-3 border-b border-slate-700">
          <Link
            href="/sobre"
            className="block text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link
            href="/faq"
            className="block text-white font-semibold py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="block text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Entrar
          </Link>
          <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="oportune" className="w-full">
              Criar conta
            </Button>
          </Link>
        </nav>
      )}

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          Perguntas Frequentes
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
          Tire suas dúvidas sobre como usar o Oportune+ e aproveitar ao máximo
          todas as funcionalidades da plataforma.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative px-2">
          <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 sm:pl-14 pr-4 py-3 sm:py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16 max-w-4xl mx-auto">
        {filteredFAQ.length > 0 ? (
          <Card className="oportune-card p-4 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-primary-foreground hover:text-blue-400 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ) : (
          <Card className="oportune-card p-8 sm:p-12 text-center">
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              Nenhuma pergunta encontrada com os filtros aplicados.
            </p>
            <Button
              variant="oportune"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("todos");
              }}
            >
              Limpar filtros
            </Button>
          </Card>
        )}
      </section>

      {/* Contact Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <Card className="oportune-card p-8 sm:p-12 text-center">
          <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-primary-foreground px-2">
            Não encontrou sua resposta?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Nossa equipe está pronta para ajudar! Entre em contato conosco e
            responderemos o mais rápido possível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a href="mailto:oportunecontatos@gmail.com">
              <Button variant="oportune" className="w-full sm:w-auto px-8 py-3">
                Enviar e-mail
              </Button>
            </a>
            <Link href="/sobre">
              <Button variant="oportune_blank" className="w-full sm:w-auto px-8 py-3">
                Saber mais sobre nós
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">© Oportune — 2025</span>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-sm text-gray-400">oportunecontatos@gmail.com</span>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Política de privacidade
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Termos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
