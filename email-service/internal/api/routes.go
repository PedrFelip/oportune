package api

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutesApp() *gin.Engine {
	app := gin.Default()

	app.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "check",
		})
	})

	api := app.Group("/api")
	{
		api.POST("/enviar-confirmacao", EnviarEmailAivacaoHandler)
		api.POST("/enviar-recuperacao-senha", EnviarEmailRecuperacaoSenhaHandler)
		api.POST("/enviar-candidatura-aprovada", EnviarCandidaturaAprovadaHandler)
		api.POST("/enviar-candidatura-recusada", EnviarCandidaturaRecusadaHandler)
	}

	return app
}
