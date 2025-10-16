"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Building, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo_oportune.png";
import { VagaCardHome } from "@/components/VagaCardHome";

// Tipagem dos depoimentos
interface Testimonial {
  initials: string;
  name: string;
  role: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "PF",
    name: "Pedro Felipe",
    role: "Eng. de Software",
    message:
      "Encontrei meu primeiro estágio em menos de um mês. Plataforma incrível.",
  },
  {
    initials: "GC",
    name: "Gabriel Coelho",
    role: "Eng. de Alimentos",
    message:
      "Encontrei meu primeiro emprego na área através dessa plataforma. Recomendo!",
  },
  {
    initials: "GP",
    name: "Gabriel Pimentel",
    role: "Medicina",
    message:
      "Foi aqui que eu consegui encontrar minha residência, estou muito feliz com a plataforma.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen oportune-gradient text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Oportune logo" width={48} height={48} />
          <span className="text-3xl font-bold">
            Oportune <span className="text-blue-300">+</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/sobre"
            className="text-gray-300 hover:text-white transition-colors"
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

      {/* Hero */}
      <section className="px-6 py-16 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Conectando talentos a oportunidade na sua faculdade
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Estágios, projetos de pesquisa e extensão em um só lugar.
            Perfis, busca inteligente e candidaturas com um clique.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button variant="oportune_blank">Sou Aluno</Button>
            <Button variant="oportune_blank">Sou Empresa</Button>
            <Button variant="oportune_blank">Sou Professor</Button>
          </div>
        </div>

        <Card className="oportune-card p-6">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-primary-foreground">
              Vagas Recentes
            </CardTitle>
            <span className="text-sm text-blue-400">+124 oportunidades</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <VagaCardHome
              title="Estágio em Front End"
              description="Google • Vagas: 10 • Semestre: 5+"
            />
            <VagaCardHome
              title="Projeto de extensão: App de saúde"
              description="Prof. Silva • Vagas: 6 • Semestre: 4+"
            />
            <div className="flex justify-between gap-2 pt-2">
              <Button variant="oportune" className="flex-1">
                Ver todas
              </Button>
              <Button variant="oportune_blank">Publicar vaga</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Benefícios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="oportune-card p-6">
            <div>
              <GraduationCap className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Para Alunos
              </h3>
              <p className="text-gray-300">
                Encontre vagas alinhadas ao seu curso e nível.
              </p>
            </div>
          </Card>
          <Card className="oportune-card p-6">
            <div>
              <Building className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Para Empresas
              </h3>
              <p className="text-gray-300">
                Alcance talentos qualificados com filtros por curso e semestre.
              </p>
            </div>
          </Card>
          <Card className="oportune-card p-6">
            <div>
              <Users className="h-8 w-8 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                Para Professores
              </h3>
              <p className="text-gray-300">
                Divulgue projetos e gerencie inscrições com facilidade.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Depoimentos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Card key={index} className="oportune-card p-6 cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {t.initials}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-primary-foreground">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{t.message}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-slate-800/30 backdrop-blur-sm text-center">
        <h2 className="text-2xl font-bold mb-4">
          Sua próxima oportunidade começa aqui
        </h2>
        <p className="text-gray-300 mb-8">
          Crie seu perfil e comece a se candidatar hoje mesmo
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cadastro">
            <Button variant="oportune" className="px-8 py-3">
              Criar minha conta
            </Button>
          </Link>
          <Button variant="oportune_blank" className="px-8 py-3">
            Saber mais
          </Button>
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
