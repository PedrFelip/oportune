package mailer

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strconv"
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

func RecuperacaoSenha(nome, email, userID string) error {
	token, err := tokenConfimacao(userID)
	if err != nil {
		return fmt.Errorf("falha ao gerar token: %w", err)
	}

	url := os.Getenv("FRONTEND_URL")
	urlRecuperacao := fmt.Sprintf("%s/redefinir-senha?token=%s", url, token)

	template := models.RecuperacaoSenhaTemplateData{
		Name:     nome,
		Email:    email,
		ResetURL: urlRecuperacao,
	}

	bodyEmail, err := templateProcessRecuperacao("templates/recuperacao_senha.html", template)
	if err != nil {
		return err
	}

	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("SMTP_USER"))
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Recuperação de Senha - Oportune+")
	m.SetBody("text/html", bodyEmail)

	smtpPort, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))
	d := gomail.NewDialer(
		os.Getenv("SMTP_HOST"),
		smtpPort,
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
	)

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("falha ao enviar email: %w", err)
	}

	log.Printf("E-mail de recuperação de senha enviado com sucesso para %s \n", email)
	log.Printf("Token: %s\n", token)
	return nil
}

func templateProcessRecuperacao(pathTemplate string, data models.RecuperacaoSenhaTemplateData) (string, error) {
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

func Enviar(nome, email, userID string) error {
	token, err := tokenConfimacao(userID)
	if err != nil {
		return fmt.Errorf("falha ao gerar token: %w", err)
	}

	url := os.Getenv("FRONTEND_URL")
	urlConfirmacao := fmt.Sprintf("%s/confirmacao?token=%s", url, token)

	template := models.TemplateData{
		Name:            nome,
		ConfirmationURL: urlConfirmacao,
		Email:           email,
	}

	bodyEmail, err := templateProcess("templates/verificacao_email.html", template)
	if err != nil {
		return err
	}

	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("SMTP_USER"))
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Bem-vindo ao Oportune+! Confirme seu e-mail")
	m.SetBody("text/html", bodyEmail)

	smtpPort, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))
	d := gomail.NewDialer(
		os.Getenv("SMTP_HOST"),
		smtpPort,
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
	)

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("falha ao enviar email: %w", err)
	}

	log.Printf("E-mail de ativação enviado com sucesso para %s \n", email)
	log.Printf("Token: %s\n", token)
	return nil
}
