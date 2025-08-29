package mailer

import (
	"fmt"
	"os"

	"gopkg.in/gomail.v2"
)

func Enviar() {
	d := gomail.NewDialer(
		os.Getenv("SMTP_HOST"),
		587,
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
	)

	fmt.Println(d)
}
