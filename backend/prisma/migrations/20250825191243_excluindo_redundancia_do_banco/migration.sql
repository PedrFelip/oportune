/*
  Warnings:

  - You are about to drop the column `nomeCompleto` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCompleto` on the `professores` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."estudantes_nomeCompleto_key";

-- DropIndex
DROP INDEX "public"."professores_nomeCompleto_key";

-- AlterTable
ALTER TABLE "public"."estudantes" DROP COLUMN "nomeCompleto";

-- AlterTable
ALTER TABLE "public"."professores" DROP COLUMN "nomeCompleto";
