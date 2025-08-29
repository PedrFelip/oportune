/*
  Warnings:

  - You are about to drop the column `emailContato` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `redesSociais` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `dataFormatura` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `periodoAtual` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `semestreAtual` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `areaAtuacao` on the `professores` table. All the data in the column will be lost.
  - You are about to drop the column `areasInteresse` on the `professores` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `professores` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `professores` table. All the data in the column will be lost.
  - Added the required column `website` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_formatura` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nascimento` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_atuacao` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nascimento` to the `professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."empresas" DROP COLUMN "emailContato",
DROP COLUMN "phone",
DROP COLUMN "redesSociais",
ADD COLUMN     "email_contato" TEXT,
ADD COLUMN     "redes_sociais" TEXT[],
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."estudantes" DROP COLUMN "dataFormatura",
DROP COLUMN "dataNascimento",
DROP COLUMN "periodoAtual",
DROP COLUMN "phone",
DROP COLUMN "semestreAtual",
ADD COLUMN     "data_formatura" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodo" "public"."Periodo" NOT NULL,
ADD COLUMN     "semestre" INTEGER NOT NULL,
ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "public"."professores" DROP COLUMN "areaAtuacao",
DROP COLUMN "areasInteresse",
DROP COLUMN "dataNascimento",
DROP COLUMN "phone",
ADD COLUMN     "area_atuacao" TEXT NOT NULL,
ADD COLUMN     "areas_interesse" TEXT[],
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telefone" TEXT;
