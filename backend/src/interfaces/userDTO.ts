// export interface logUserDTO {
//     email: string
//     senha: string
// }

// interface baseUserDTO {
//     nome: string
//     email: string
//     senha: string
//     tipo: "ESTUDANTE" | "PROFESSOR" | "EMPRESA"
//     termos: boolean
// }

// interface estudanteDTO extends baseUserDTO {
//     tipo: "ESTUDANTE"
//     dataNascimento: Date
//     genero: string
//     telefone?: string

//     faculdade?: string
//     curso: string
//     matricula: string
//     semestre: number
//     periodo: "MATUTINO" | "VESPERTINO" | "NOTURNO"
//     dataFormatura?: Date
// }

// interface professorDTO extends baseUserDTO {
//     tipo: "PROFESSOR"
//     dataNascimento: Date
//     genero: string
//     telefone?: string

//     areaAtuacao: string
//     areasInteresse?: string[]
//     departamento: string
//     titulacao: string
//     lattes: string
// }

// interface empresaDTO extends baseUserDTO {
//     tipo: "EMPRESA"
//     nomeFantasia: string

//     cnpj: string
//     ramo: string
//     setor: string
//     descricao?: string

//     emailContato?: string
//     telefone?: string
// }

// export type createUserDTO = estudanteDTO | professorDTO | empresaDTO