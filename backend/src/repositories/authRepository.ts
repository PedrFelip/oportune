import prisma from "../../prisma/client.ts";
import { createUserCleanDTO, loginUserDTO } from "../schemas/userSchemas.ts";

export const cadastrarUsuarioRepository = async (data: createUserCleanDTO) => {
  // Cria o registro base do usuário
  const user = await prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipo: data.tipo,
    },
  });

  // Cria dados específicos conforme o tipo
  if (data.tipo === "ESTUDANTE") {
    await prisma.estudante.create({
      data: {
        telefone: data.telefone,
        dataNascimento: new Date(data.dataNascimento),
        // genero: data.genero,
        // faculdade: data.faculdade, // Ainda não registra
        curso: data.curso,
        matricula: data.matricula,
        semestre: data.semestre,
        // periodo: data.periodo,
        userId: user.id,
      },
    });
  }

  if (data.tipo === "PROFESSOR") {
    await prisma.professor.create({
      data: {
        telefone: data.telefone,
        dataNascimento: new Date(data.dataNascimento),
        genero: data.genero,
        areasInteresse: data.areasInteresse,
        areaAtuacao: data.areaAtuacao,
        departamento: data.departamento,
        titulacao: data.titulacao,
        lattes: data.lattes,
        userId: user.id,
      },
    });
  }

  if (data.tipo === "EMPRESA") {
    await prisma.empresa.create({
      data: {
        nomeFantasia: data.nomeFantasia,
        cnpj: data.cnpj,
        ramo: data.ramo,
        setor: data.setor,
        descricao: data.descricao,
        telefone: data.telefone,
        emailContato: data.emailContato,
        website: data.website,
        userId: user.id,
      },
    });
  }

  return user;
};

export const logarUsuarioRepository = async (data: loginUserDTO) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
    },
    include: {
      estudante: true,
      professor: true,
      empresa: true,
    },
  });

  if (user.tipo === "ESTUDANTE") {
    return { ...user, estudante: user.estudante };
  } else if (user.tipo === "PROFESSOR") {
    return { ...user, professor: user.professor };
  } else if (user.tipo === "EMPRESA") {
    return { ...user, empresa: user.empresa };
  }

  return user
};
