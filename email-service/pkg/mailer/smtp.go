package mailer

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pedrfelip/oportune/email-service/internal/models"
	"gopkg.in/gomail.v2"
)

func templateProcess(pathTemplate string, data models.TemplateData) (string, error) {
	var body bytes.Buffer
	caminho, _ := filepath.Abs(pathTemplate)

	t, err := template.ParseFiles(caminho)
	if err != nil {
		return "", fmt.Errorf("falha ao carregar template: %w", err)
	}
	if err := t.Execute(&body, data); err != nil {
		return "", fmt.Errorf("falha ao executar template: %w", err)
	}

	return body.String(), nil
}

func tokenConfimacao(userID string) (string, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	expiracao := time.Now().Add(15 * time.Minute)

	claims := &jwt.RegisteredClaims{
		Subject:   userID,
		ExpiresAt: jwt.NewNumericDate(expiracao),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func Enviar() {
	d := gomail.NewDialer(
		os.Getenv("SMTP_HOST"),
		587,
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
	)

	fmt.Println(d)
}
