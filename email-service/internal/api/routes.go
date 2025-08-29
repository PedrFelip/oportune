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

	return app
}
