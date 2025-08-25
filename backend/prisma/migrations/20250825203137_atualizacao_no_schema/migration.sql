/*
  Warnings:

  - Added the required column `ramo` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setor` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lattes` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulacao` to the `professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."empresas" ADD COLUMN     "ramo" TEXT NOT NULL,
ADD COLUMN     "setor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."estudantes" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."professores" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "lattes" TEXT NOT NULL,
ADD COLUMN     "titulacao" TEXT NOT NULL;
