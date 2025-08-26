import prisma from "../../prisma/client.ts";
import { createUserDTO, logUserDTO } from "../interfaces/userDTO.ts";

export const cadastrarUsuarioRepository = async (data: createUserDTO) => {
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
        phone: data.phone,
        dataNascimento: new Date(data.dataNascimento),
        genero: data.genero,
        faculdade: data.faculdade,
        curso: data.curso,
        matricula: data.matricula,
        semestreAtual: data.semestreAtual,
        periodoAtual: data.periodoAtual,
        dataFormatura: new Date(data.dataFormatura),
        userId: user.id,
      },
    });
  }

  if (data.tipo === "PROFESSOR") {
    await prisma.professor.create({
      data: {
        phone: data.phone,
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
        phone: data.phone,
        emailContato: data.emailContato,
        redesSociais: [],
        userId: user.id,
      },
    });
  }

  return user;
};

export const logarUsuarioRepository = async (data: logUserDTO) => {
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
