-- AlterTable
ALTER TABLE "public"."estudantes" ADD COLUMN     "experienciasProfissionais" TEXT[] DEFAULT ARRAY[]::TEXT[];
