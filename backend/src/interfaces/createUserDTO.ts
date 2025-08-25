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
    semestreAtual: string
    periodoAtual: "MATUTINO" | "VESPERTINO" | "NOTURNO"
    dataFormaturaPrevista: Date
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
    cnpj: string
    ramo: string
    setor: string
    descricao: string

    email: string
    telefone: string
    redesSociais: string[]
}

export type createUserDTO = estudanteDTO | professorDTO | empresaDTO