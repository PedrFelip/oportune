package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/pedrfelip/oportune/email-service/internal/api"
)

func main() {
	fmt.Println("email service")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar .env")
	}

	server := api.SetupRoutesApp()

	fmt.Printf("Server iniciado na porta 3002")
	server.Run(":3002")
}
