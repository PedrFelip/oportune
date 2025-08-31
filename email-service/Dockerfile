# Estágio de build
FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /email-service . 

# Estágio de produção
FROM alpine:latest

WORKDIR /app

# Copia o binário compilado do estágio de build
COPY --from=builder /email-service .

COPY templates ./templates

EXPOSE 3002

CMD ["./email-service"]