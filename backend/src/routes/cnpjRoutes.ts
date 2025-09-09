
import { FastifyInstance } from 'fastify';
import { consultarCnpjController } from '../controllers/cnpjController';

export async function cnpjRoutes(app: FastifyInstance) {
  
  app.get('/cnpj/:cnpj', consultarCnpjController );
}
