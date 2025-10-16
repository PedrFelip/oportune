"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, Users, Target, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo_oportune.png";

export default function Sobre() {
  return (
    <div className="min-h-screen oportune-gradient text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-800/30 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Oportune logo" width={48} height={48} />
          <span className="text-3xl font-bold">
            Oportune <span className="text-blue-300">+</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/sobre"
            className="text-white font-semibold transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/faq"
            className="text-gray-300 hover:text-white transition-colors"
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
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Sobre o Oportune+
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Uma plataforma desenvolvida para conectar estudantes universitários a oportunidades
          reais de crescimento profissional e acadêmico.
        </p>
      </section>

      {/* Nossa Missão */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="oportune-card p-8">
            <div className="flex items-center mb-6">
              <Target className="h-10 w-10 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-primary-foreground">Nossa Missão</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Facilitar o acesso de estudantes universitários a oportunidades de estágio,
              projetos de pesquisa e extensão, conectando-os diretamente com empresas e
              professores.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Acreditamos que todo estudante merece a chance de aplicar seu conhecimento
              na prática e construir uma carreira de sucesso.
            </p>
          </Card>

          <Card className="oportune-card p-8">
            <div className="flex items-center mb-6">
              <Heart className="h-10 w-10 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold text-primary-foreground">Nossa Visão</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Ser a principal plataforma de conexão entre universidades, estudantes e
              o mercado de trabalho, transformando a forma como oportunidades são
              encontradas e compartilhadas.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Queremos criar um ecossistema onde talentos sejam descobertos e
              desenvolvidos de forma justa e acessível.
            </p>
          </Card>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="oportune-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Crie seu Perfil
              </h3>
              <p className="text-gray-300">
                Cadastre-se informando seu curso, semestre e áreas de interesse.
                Seu perfil ajuda empresas e professores a encontrarem você.
              </p>
            </div>
          </Card>

          <Card className="oportune-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Busque Oportunidades
              </h3>
              <p className="text-gray-300">
                Utilize filtros inteligentes para encontrar vagas de estágio,
                projetos de pesquisa e extensão alinhados ao seu perfil.
              </p>
            </div>
          </Card>

          <Card className="oportune-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Candidate-se com um Clique
              </h3>
              <p className="text-gray-300">
                Envie sua candidatura rapidamente e acompanhe o status de cada
                inscrição diretamente no seu dashboard.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Para Quem é o Oportune+ */}
      <section className="px-6 py-16 max-w-7xl mx-auto bg-slate-800/20 rounded-2xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Para Quem é o Oportune+</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="oportune-card p-8">
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">
                Estudantes
              </h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Encontre estágios alinhados ao seu curso e nível</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Participe de projetos de pesquisa e extensão</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Construa seu portfólio acadêmico e profissional</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="oportune-card p-8">
            <div className="flex flex-col items-center text-center">
              <Building className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">
                Empresas
              </h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Acesse talentos qualificados de universidades</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Filtre candidatos por curso, semestre e habilidades</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Gerencie vagas e candidaturas em um só lugar</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="oportune-card p-8">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">
                Professores
              </h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Divulgue projetos de pesquisa e extensão</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Encontre alunos interessados em suas áreas</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Gerencie inscrições de forma organizada</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para começar?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Junte-se a centenas de estudantes e empresas que já estão usando o Oportune+
          para encontrar as melhores oportunidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cadastro">
            <Button variant="oportune" className="px-8 py-3">
              Criar minha conta
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="oportune_blank" className="px-8 py-3">
              Ver perguntas frequentes
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-gray-400">© Oportune — 2025</span>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">contato@oportune.edu</span>
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
