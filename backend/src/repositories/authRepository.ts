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
        genero: data.genero,
        // faculdade: data.faculdade, // Ainda não registra
        curso: data.curso,
        matricula: data.matricula,
        semestre: data.semestre,
        periodo: data.periodo,
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
        // areasInteresse: data.areasInteresse, // Não vem com o form de criar conta
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

  return user;
};
export const confirmarEmailRepository = async (userId: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      emailVerificado: true,
    },
  });
};

export const isVerifiedRepository = async (email: string) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
    return user.emailVerificado;
  } catch (error) {
    console.error("Erro ao verificar status de email:", error);
    throw new Error("Erro ao verificar status de email");
  }
}

export const buscarUsuarioPorEmailRepository = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

export const atualizarSenhaRepository = async (userId: string, novaSenha: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      senha: novaSenha,
    },
  })
}