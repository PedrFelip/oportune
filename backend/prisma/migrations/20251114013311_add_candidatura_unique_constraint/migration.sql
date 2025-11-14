/*
  Warnings:

  - A unique constraint covering the columns `[vagaId,estudanteId]` on the table `candidaturas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "candidaturas_vagaId_estudanteId_key" ON "public"."candidaturas"("vagaId", "estudanteId");
