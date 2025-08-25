-- DropIndex
DROP INDEX "public"."estudantes_matricula_key";

-- AlterTable
ALTER TABLE "public"."estudantes" ADD COLUMN     "faculdade" TEXT;
