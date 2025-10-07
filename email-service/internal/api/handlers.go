package api

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/pedrfelip/oportune/email-service/internal/models"
	"github.com/pedrfelip/oportune/email-service/pkg/mailer"
)

func EnviarEmailAivacaoHandler(c *gin.Context) {
	var req models.AtivacaoRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Corpo da requisição inválido: " + err.Error(),
		})
		return
	}

	err = mailer.Enviar(req.Name, req.Email, req.UserID)
	if err != nil {
		log.Printf("erro ao enviar e-mail: %v", err)
		c.JSON(500, gin.H{
			"error": "Erro interno ao enviar o email",
		})
	}
	c.JSON(200, gin.H{
		"message": "email enviado para " + req.Email,
	})
}

func EnviarEmailRecuperacaoSenhaHandler(c *gin.Context) {
	var req models.RecuperacaoSenhaRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Corpo da requisição inválido: " + err.Error(),
		})
		return
	}

	err = mailer.RecuperacaoSenha(req.Name, req.Email, req.UserID)
	if err != nil {
		log.Printf("erro ao enviar e-mail de recuperação: %v", err)
		c.JSON(500, gin.H{
			"error": "Erro interno ao enviar o email",
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "email de recuperação enviado para " + req.Email,
	})
}
