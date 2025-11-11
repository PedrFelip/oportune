import axios from 'axios'

interface CandidaturaAprovadaPayload {
  name: string
  email: string
  vagaTitulo: string
  responsavelNome: string
  vagaTipo: string
  dataCandidatura: string
  dashboardURL: string
}

interface CandidaturaRecusadaPayload {
  name: string
  email: string
  vagaTitulo: string
  responsavelNome: string
  vagaTipo: string
  dataCandidatura: string
  dashboardURL: string
}

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || 'http://localhost:3002/api'

export const notificationService = {
  async enviarCandidaturaAprovada(payload: CandidaturaAprovadaPayload): Promise<void> {
    try {
      await axios.post(`${EMAIL_SERVICE_URL}/enviar-candidatura-aprovada`, payload, {
        timeout: 10000,
      })
    } catch (error: any) {
      // Log o erro mas não falha a operação
      console.error(
        'Erro ao enviar email de candidatura aprovada:',
        error.response?.data || error.message,
      )
      // Não relança o erro para não quebrar o fluxo de aprovação
    }
  },

  async enviarCandidaturaRecusada(payload: CandidaturaRecusadaPayload): Promise<void> {
    try {
      await axios.post(`${EMAIL_SERVICE_URL}/enviar-candidatura-recusada`, payload, {
        timeout: 10000,
      })
    } catch (error: any) {
      // Log o erro mas não falha a operação
      console.error(
        'Erro ao enviar email de candidatura recusada:',
        error.response?.data || error.message,
      )
      // Não relança o erro para não quebrar o fluxo de recusa
    }
  },
}
