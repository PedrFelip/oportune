/*
  Warnings:

  - The `cursosAlvo` column on the `vagas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."vagas" DROP COLUMN "cursosAlvo",
ADD COLUMN     "cursosAlvo" TEXT[];
