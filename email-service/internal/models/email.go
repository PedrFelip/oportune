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
