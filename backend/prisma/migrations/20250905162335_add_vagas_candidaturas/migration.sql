-- CreateEnum
CREATE TYPE "public"."StatusCandidatura" AS ENUM ('PENDENTE', 'ACEITA', 'RECUSADA');

-- CreateEnum
CREATE TYPE "public"."TipoVaga" AS ENUM ('ESTAGIO', 'PESQUISA', 'EXTENSAO');

-- CreateTable
CREATE TABLE "public"."Vaga" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "professorId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "public"."TipoVaga" NOT NULL,
    "requisitos" TEXT[],
    "prazoInscricao" TIMESTAMP(3) NOT NULL,
    "cursosAlvo" TEXT,
    "semestreMinimo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Candidatura" (
    "id" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "estudanteId" TEXT NOT NULL,
    "dataCandidatura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."StatusCandidatura" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidatura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "public"."professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Candidatura" ADD CONSTRAINT "Candidatura_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "public"."Vaga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Candidatura" ADD CONSTRAINT "Candidatura_estudanteId_fkey" FOREIGN KEY ("estudanteId") REFERENCES "public"."estudantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
