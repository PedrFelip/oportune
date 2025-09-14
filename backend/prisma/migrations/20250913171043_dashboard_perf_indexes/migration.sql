-- CreateIndex
CREATE INDEX "candidaturas_estudante_data_idx" ON "public"."candidaturas"("estudanteId", "dataCandidatura" DESC);

-- CreateIndex
CREATE INDEX "vagas_status_created_idx" ON "public"."vagas"("statusVaga", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "vagas_cursosAlvo_gin" ON "public"."vagas" USING GIN ("cursosAlvo");
