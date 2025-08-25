export interface logUserDTO {
    email: string
    senha: string
}

interface baseUserDTO {
    nome: string
    email: string
    senha: string
    tipo: "ESTUDANTE" | "PROFESSOR" | "EMPRESA"
}

interface estudanteDTO extends baseUserDTO {
    tipo: "ESTUDANTE"
    dataNascimento: Date
    genero: string
    phone?: string

    faculdade?: string
    curso: string
    matricula: string
    semestreAtual: number
    periodoAtual: "MATUTINO" | "VESPERTINO" | "NOTURNO"
    dataFormatura: Date
}

interface professorDTO extends baseUserDTO {
    tipo: "PROFESSOR"
    dataNascimento: Date
    genero: string
    phone?: string

    areaAtuacao: string
    areasInteresse: string[]
    departamento: string
    titulacao: string
    lattes: string
}

interface empresaDTO extends baseUserDTO {
    tipo: "EMPRESA"
    nomeFantasia: string

    cnpj: string
    ramo: string
    setor: string
    descricao?: string

    emailContato?: string
    phone?: string
}

export type createUserDTO = estudanteDTO | professorDTO | empresaDTO