"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Building,
  Users,
  Target,
  Heart,
  Zap,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo_oportune.png";
import { useState } from "react";
import { motion } from "framer-motion";

// Variantes de animação
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Sobre() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen oportune-gradient text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-slate-800/30 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt="Oportune logo"
            width={40}
            height={40}
            className="sm:w-12 sm:h-12"
          />
          <span className="text-2xl sm:text-3xl font-bold">
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

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-800/95 backdrop-blur-sm px-4 py-4 space-y-3 border-b border-slate-700">
          <Link
            href="/sobre"
            className="block text-white font-semibold py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link
            href="/faq"
            className="block text-gray-300 hover:text-white transition-colors py-2"
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
      <motion.section
        className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          Sobre o Oportune+
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2">
          Uma plataforma desenvolvida para conectar estudantes universitários a
          oportunidades reais de crescimento profissional e acadêmico.
        </p>
      </motion.section>

      {/* Nossa Missão e Visão */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={slideInLeft} transition={{ duration: 0.6 }}>
            <Card className="oportune-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mr-3 sm:mr-4 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                  Nossa Missão
                </h2>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                Facilitar o acesso de estudantes universitários a oportunidades
                de estágio, projetos de pesquisa e extensão, conectando-os
                diretamente com empresas e professores.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Acreditamos que todo estudante merece a chance de aplicar seu
                conhecimento na prática e construir uma carreira de sucesso.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={slideInRight} transition={{ duration: 0.6 }}>
            <Card className="oportune-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mr-3 sm:mr-4 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                  Nossa Visão
                </h2>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                Ser a principal plataforma de conexão entre universidades,
                estudantes e o mercado de trabalho, transformando a forma como
                oportunidades são encontradas e compartilhadas.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Queremos criar um ecossistema onde talentos sejam descobertos e
                desenvolvidos de forma justa e acessível.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Como Funciona */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Como Funciona
        </motion.h2>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {[1, 2, 3].map((step, index) => (
            <motion.div
              key={step}
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              <Card className="oportune-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-primary-foreground">
                    {step === 1 && "Crie seu Perfil"}
                    {step === 2 && "Busque Oportunidades"}
                    {step === 3 && "Candidate-se com um Clique"}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {step === 1 &&
                      "Cadastre-se informando seu curso, semestre e áreas de interesse. Seu perfil ajuda empresas e professores a encontrarem você."}
                    {step === 2 &&
                      "Utilize filtros inteligentes para encontrar vagas de estágio, projetos de pesquisa e extensão alinhados ao seu perfil."}
                    {step === 3 &&
                      "Envie sua candidatura rapidamente e acompanhe o status de cada inscrição diretamente no seu dashboard."}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Para Quem é o Oportune+ */}
      <motion.section
        className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto bg-slate-800/20 rounded-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Para Quem é o Oportune+
        </h2>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          {/* Estudantes */}
          <motion.div variants={fadeIn} transition={{ duration: 0.5 }}>
            <Card className="oportune-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mb-4" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary-foreground">
                  Estudantes
                </h3>
                <ul className="text-gray-300 space-y-2 text-left text-sm sm:text-base">
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Encontre estágios alinhados ao seu curso e nível</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Participe de projetos de pesquisa e extensão</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Construa seu portfólio acadêmico e profissional</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Empresas */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="oportune-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mb-4" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary-foreground">
                  Empresas
                </h3>
                <ul className="text-gray-300 space-y-2 text-left text-sm sm:text-base">
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Acesse talentos qualificados de universidades</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Filtre candidatos por curso, semestre e habilidades
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gerencie vagas e candidaturas em um só lugar</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Professores */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="oportune-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mb-4" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary-foreground">
                  Professores
                </h3>
                <ul className="text-gray-300 space-y-2 text-left text-sm sm:text-base">
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Divulgue projetos de pesquisa e extensão</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Encontre alunos interessados em suas áreas</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gerencie inscrições de forma organizada</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="px-4 sm:px-6 py-12 sm:py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Pronto para começar?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base px-2">
          Junte-se a centenas de estudantes e empresas que já estão usando o
          Oportune+ para encontrar as melhores oportunidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link href="/cadastro">
            <Button
              variant="oportune"
              className="w-full sm:w-auto px-8 py-3 hover:scale-105 transition-transform"
            >
              Criar minha conta
            </Button>
          </Link>
          <Link href="/faq">
            <Button
              variant="oportune_blank"
              className="w-full sm:w-auto px-8 py-3 hover:scale-105 transition-transform"
            >
              Ver perguntas frequentes
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">© Oportune — 2025</span>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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
