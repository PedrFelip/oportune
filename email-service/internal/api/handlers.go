package api

import (
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

	err := mailer.Enviar()
	}
}