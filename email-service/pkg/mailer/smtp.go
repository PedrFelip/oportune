package mailer

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gopkg.in/gomail.v2"
)

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
