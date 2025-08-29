/*
  Warnings:

  - You are about to drop the column `phone` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `periodoAtual` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `semestreAtual` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `professores` table. All the data in the column will be lost.
  - Added the required column `website` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `estudantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."empresas" DROP COLUMN "phone",
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."estudantes" DROP COLUMN "periodoAtual",
DROP COLUMN "phone",
DROP COLUMN "semestreAtual",
ADD COLUMN     "periodo" "public"."Periodo" NOT NULL,
ADD COLUMN     "semestre" INTEGER NOT NULL,
ADD COLUMN     "telefone" TEXT,
ALTER COLUMN "dataFormatura" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."professores" DROP COLUMN "phone",
ADD COLUMN     "telefone" TEXT;
