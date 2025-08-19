-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('ESTUDANTE', 'PROFESSOR', 'EMPRESA');

-- CreateEnum
CREATE TYPE "public"."Periodo" AS ENUM ('MATUTINO', 'VESPERTINO', 'NOTURNO');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "public"."UserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."estudantes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "phone" TEXT,
    "fotoPerfil" TEXT,
    "matricula" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "semestreAtual" INTEGER NOT NULL,
    "periodoAtual" "public"."Periodo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estudantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."professores" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "phone" TEXT,
    "fotoPerfil" TEXT,
    "areaAtuacao" TEXT NOT NULL,
    "areasInteresse" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."empresas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT,
    "logo" TEXT,
    "endereco" TEXT,
    "site" TEXT,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estudantes_userId_key" ON "public"."estudantes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "estudantes_nomeCompleto_key" ON "public"."estudantes"("nomeCompleto");

-- CreateIndex
CREATE UNIQUE INDEX "estudantes_matricula_key" ON "public"."estudantes"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "professores_userId_key" ON "public"."professores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "professores_nomeCompleto_key" ON "public"."professores"("nomeCompleto");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_userId_key" ON "public"."empresas"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_nomeFantasia_key" ON "public"."empresas"("nomeFantasia");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "public"."empresas"("cnpj");

-- AddForeignKey
ALTER TABLE "public"."estudantes" ADD CONSTRAINT "estudantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."professores" ADD CONSTRAINT "professores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."empresas" ADD CONSTRAINT "empresas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
