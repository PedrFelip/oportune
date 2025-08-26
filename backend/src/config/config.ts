if (!process.env.JWT_SECRET){
  throw new Error("Chave secreta não informada")
}

export const JWT_SECRET = process.env.JWT_SECRET