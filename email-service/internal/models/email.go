package models

// para define o corpo JSON esperado na requisição.
type AtivacaoRequest struct {
	Email  string `json:"email" binding:"required"`
	Name   string `json:"name" binding:"required"`
	UserID string `json:"userID" binding:"required"`
}

type TemplateData struct {
	Name            string
	ConfirmationURL string
}
