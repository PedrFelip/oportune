import UserType from "../types/userType.ts"

export interface createUserDTO {
    nome: string,
    email: string,
    senha: string,
    tipo: UserType,
}

export interface logUserDTO {
    email: string
    senha: string
}