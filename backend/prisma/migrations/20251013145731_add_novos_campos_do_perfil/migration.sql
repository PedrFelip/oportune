-- AlterTable
ALTER TABLE "public"."estudantes" ADD COLUMN     "areasInteresse" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "habilidadesComportamentais" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "habilidadesTecnicas" TEXT[] DEFAULT ARRAY[]::TEXT[];
