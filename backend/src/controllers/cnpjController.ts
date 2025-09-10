import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { runPython } from '../utils/runPython.ts'; 

export async function consultarCnpjController(request: FastifyRequest, reply: FastifyReply) {

  const getCnpjParamsSchema = z.object({
    cnpj: z.string().trim().length(14, "O CNPJ deve ter 14 dígitos."),
  });

  const params = getCnpjParamsSchema.safeParse(request.params);

  if (!params.success) {
    return reply.status(400).send({ message: 'Parâmetro CNPJ inválido.', errors: params.error.format() });
  }

  const { cnpj } = params.data;

  try {

    const dadosEmpresa = await runPython('buscar_cnpj/pesquisar_cnpj', cnpj);

  
    return reply.status(200).send(dadosEmpresa);

  } catch (error: any) {
    console.error("Erro ao executar script de CNPJ:", error.message);
    return reply.status(500).send({ message: "Erro ao consultar dados do CNPJ.", details: error.message });
  }
}
