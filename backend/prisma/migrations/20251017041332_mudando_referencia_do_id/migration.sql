-- DropForeignKey
ALTER TABLE "public"."candidaturas" DROP CONSTRAINT "candidaturas_estudanteId_fkey";

-- AddForeignKey
ALTER TABLE "public"."candidaturas" ADD CONSTRAINT "candidaturas_estudanteId_fkey" FOREIGN KEY ("estudanteId") REFERENCES "public"."estudantes"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
