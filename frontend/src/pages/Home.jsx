import React from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Briefcase, Building, Users, GraduationCap, Star } from "lucide-react";
import "../App.css";
import Logo from "../assets/logo_oportune.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen oportune-gradient text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <img src={Logo} className="h-15 w-15 text-blue-400" />
          <span className="text-3xl font-bold">
            Oportune <span className="text-blue-300">+</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Sobre
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </a>
          <Link
            to={"/login"}
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Entrar
          </Link>
          <Link to={"/cadastro"}>
            <Button className="oportune-button-primary cursor-pointer">
              Criar conta
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="hero-text text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Conectando talentos a oportunidade na sua faculdade
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Estágios, projetos de pesquisa e extensão em um só lugar — perfis
              personalizados, busca inteligente e candidaturas com um clique.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                variant="outline"
                className="
                                    border-[#1E2A48] 
                                    bg-[#1E2A48] 
                                    text-white
                                    hover:bg-white
                                    hover:text-[#1E2A48]
                                    hover:border-[#1E2A48]
                                    transition-all duration-300 ease-in-out
                                    cursor-pointer
                                "
              >
                Sou Aluno
              </Button>

              <Button
                variant="outline"
                className="
                                    border-[#1E2A48] 
                                    bg-[#1E2A48] 
                                    text-white
                                    hover:bg-white
                                    hover:text-[#1E2A48]
                                    hover:border-[#1E2A48]
                                    transition-all duration-300 ease-in-out
                                    cursor-pointer
                                "
              >
                Sou Empresa
              </Button>

              <Button
                variant="outline"
                className="
                                    border-[#1E2A48] bg-[#1E2A48] 
                                    text-white
                                    hover:bg-white
                                    hover:text-[#1E2A48]
                                    hover:border-[#1E2A48]
                                    transition-all duration-300 ease-in-out
                                    cursor-pointer
                                "
              >
                Sou Professor
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="oportune-card p-4 rounded-lg">
                <h3 className="font-semibold mb-2">1. Crie seu Perfil</h3>
                <p className="text-sm text-gray-400">
                  Preencha dados, habilidades e documentos
                </p>
              </div>
              <div className="oportune-card p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  2. Encontre oportunidades
                </h3>
                <p className="text-sm text-gray-400">
                  Filtros por curso, semestre e interesse
                </p>
              </div>
              <div className="oportune-card p-4 rounded-lg">
                <h3 className="font-semibold mb-2">3. Candidate-se</h3>
                <p className="text-sm text-gray-400">
                  Candidatura com um clique simples e rápido
                </p>
              </div>
            </div>
          </div>

          <div className="oportune-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vagas Recentes</h3>
              <span className="text-sm text-blue-400">+124 oportunidades</span>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                <h4 className="font-medium mb-1">
                  Estágio: Desenvolvedor Front-end
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Empresa X • Curso: Engenharia de Software • Até 30/09
                </p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer">
                <h4 className="font-medium mb-1">
                  Projeto de Extensão: App Social
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Prof. Silva • Vagas: 6 • Semestre: 4+
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <Button className="oportune-button-primary flex-1 cursor-pointer">
                Ver todas
              </Button>
              <Button
                variant="outline"
                className="
                                    border-[#1E2A48] 
                                    bg-[#1E2A48] 
                                    text-white
                                    hover:bg-white
                                    hover:text-[#1E2A48]
                                    hover:border-[#1E2A48]
                                    transition-all duration-300 ease-in-out
                                    cursor-pointer
                                "
              >
                Publicar vaga
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mid-content px-6 py-26  ">
        <h2 className="text-3xl font-bold mb-12 text-center">Benefícios</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="oportune-card p-6">
            <div className="feature-icon w-fit mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Para Alunos
            </h3>
            <p className="text-gray-300">
              Encontre vagas alinhadas ao seu curso e nível.
            </p>
          </Card>

          <Card className="oportune-card p-6">
            <div className="feature-icon w-fit mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Para Empresas
            </h3>
            <p className="text-gray-300">
              Alcance talentos qualificados com filtros por curso e semestre.
            </p>
          </Card>

          <Card className="oportune-card p-6">
            <div className="feature-icon w-fit mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Para Professores
            </h3>
            <p className="text-gray-300">
              Divulgue projetos de pesquisa e extensão e gerencie inscrições com
              facilidade.
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Depoimentos</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                PF
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Alexandre</h4>
                <p className="text-sm text-gray-400">Eng. de pesca</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              "Encontrei meu primeiro estágio em menos de um mês. Plataforma
              incrível"
            </p>
          </Card>

          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                PF
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Pedro Felipe</h4>
                <p className="text-sm text-gray-400">Eng. de Software</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              "Encontrei meu primeiro estágio em menos de um mês. Plataforma
              incrível"
            </p>
          </Card>

          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                GP
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Gabriel Pimentel</h4>
                <p className="text-sm text-gray-400">Medicina</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Foi aqui que eu consegui encontrar minha residência, estou muito
              feliz com a plataforma
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                AL
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Alexandre</h4>
                <p className="text-sm text-gray-400">Eng. de Software</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              "Encontrei meu primeiro estágio em menos de um mês. Plataforma
              incrível"
            </p>
          </Card>

          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                GC
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Gabriel Coelho</h4>
                <p className="text-sm text-gray-400">Eng. de Alimentos</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              "Encontrei meu primeiro emprego na área através dessa plataforma
              muito boa recomendo"
            </p>
          </Card>

          <Card className="testimonial-card p-6 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                PF
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Pedro Felipe</h4>
                <p className="text-sm text-gray-400">Eng. de Software</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              "Encontrei meu primeiro estágio em menos de um mês. Plataforma
              incrível"
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Sua próxima oportunidade começa aqui
          </h2>
          <p className="text-gray-300 mb-8">
            Crie seu perfil e comece a se candidatar hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="oportune-button-primary px-8 py-3 cursor-pointer">
              Criar minha conta
            </Button>
            <Button
              variant="outline"
              className="
                    border-[#1E2A48] 
                    bg-[#1E2A48] 
                    text-white
                    hover:bg-white
                    hover:text-[#1E2A48]
                    hover:border-[#1E2A48]
                    px-8 py-3
                    transition-all duration-300 ease-in-out
                    cursor-pointer
                "
            >
              Saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-400">© Oportune — 2025</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-400">
              Contato: contato@oportune.edu
            </span>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Política de privacidade
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Termos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
