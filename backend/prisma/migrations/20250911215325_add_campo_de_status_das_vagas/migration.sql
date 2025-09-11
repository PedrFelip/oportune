-- CreateEnum
CREATE TYPE "public"."StatusVaga" AS ENUM ('ATIVA', 'INATIVA', 'ENCERRADA');

-- AlterTable
ALTER TABLE "public"."Vaga" ADD COLUMN     "statusVaga" "public"."StatusVaga" NOT NULL DEFAULT 'ATIVA';
