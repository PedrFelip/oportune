/*
  Warnings:

  - You are about to drop the `Candidatura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vaga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Candidatura" DROP CONSTRAINT "Candidatura_estudanteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Candidatura" DROP CONSTRAINT "Candidatura_vagaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vaga" DROP CONSTRAINT "Vaga_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vaga" DROP CONSTRAINT "Vaga_professorId_fkey";

-- DropTable
DROP TABLE "public"."Candidatura";

-- DropTable
DROP TABLE "public"."Vaga";

-- CreateTable
CREATE TABLE "public"."vagas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "professorId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "public"."TipoVaga" NOT NULL,
    "requisitos" TEXT[],
    "prazoInscricao" TIMESTAMP(3) NOT NULL,
    "statusVaga" "public"."StatusVaga" NOT NULL DEFAULT 'ATIVA',
    "cursosAlvo" TEXT,
    "semestreMinimo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vagas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."candidaturas" (
    "id" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "estudanteId" TEXT NOT NULL,
    "dataCandidatura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."StatusCandidatura" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidaturas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."vagas" ADD CONSTRAINT "vagas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vagas" ADD CONSTRAINT "vagas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "public"."professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidaturas" ADD CONSTRAINT "candidaturas_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "public"."vagas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."candidaturas" ADD CONSTRAINT "candidaturas_estudanteId_fkey" FOREIGN KEY ("estudanteId") REFERENCES "public"."estudantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
