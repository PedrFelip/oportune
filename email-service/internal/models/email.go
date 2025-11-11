package models

// para define o corpo JSON esperado na requisição.
type AtivacaoRequest struct {
	Name   string `json:"name" binding:"required"`
	Email  string `json:"email" binding:"required"`
	UserID string `json:"userID" binding:"required"`
}

type TemplateData struct {
	Name            string
	Email           string
	ConfirmationURL string
}

// Request para recuperação de senha
type RecuperacaoSenhaRequest struct {
	Name   string `json:"name" binding:"required"`
	Email  string `json:"email" binding:"required"`
	UserID string `json:"userID" binding:"required"`
}

// Template data para recuperação de senha
type RecuperacaoSenhaTemplateData struct {
	Name     string
	Email    string
	ResetURL string
}

// Request para notificação de candidatura aprovada
type CandidaturaAprovadaRequest struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	VagaTitulo      string `json:"vagaTitulo" binding:"required"`
	ResponsavelNome string `json:"responsavelNome" binding:"required"`
	VagaTipo        string `json:"vagaTipo" binding:"required"`
	DataCandidatura string `json:"dataCandidatura" binding:"required"`
	DashboardURL    string `json:"dashboardURL" binding:"required"`
}

// Template data para candidatura aprovada
type CandidaturaAprovadaTemplateData struct {
	Name            string
	Email           string
	VagaTitulo      string
	ResponsavelNome string
	VagaTipo        string
	DataCandidatura string
	DashboardURL    string
}

// Request para notificação de candidatura recusada
type CandidaturaRecusadaRequest struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	VagaTitulo      string `json:"vagaTitulo" binding:"required"`
	ResponsavelNome string `json:"responsavelNome" binding:"required"`
	VagaTipo        string `json:"vagaTipo" binding:"required"`
	DataCandidatura string `json:"dataCandidatura" binding:"required"`
	DashboardURL    string `json:"dashboardURL" binding:"required"`
}

// Template data para candidatura recusada
type CandidaturaRecusadaTemplateData struct {
	Name            string
	Email           string
	VagaTitulo      string
	ResponsavelNome string
	VagaTipo        string
	DataCandidatura string
	DashboardURL    string
}
