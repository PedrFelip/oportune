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
