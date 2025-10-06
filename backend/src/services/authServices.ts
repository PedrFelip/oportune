import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserCleanDTO, loginUserDTO } from "../schemas/userSchemas.ts";
import {
  cadastrarUsuarioRepository,
  logarUsuarioRepository,
  confirmarEmailRepository,
  isVerifiedRepository,
} from "../repositories/authRepository.ts";
import { capitalizeFirstLetter } from "../utils/functions.ts";
import { JWT_SECRET } from "../config/config.ts";
import { fa } from "zod/locales";

export const cadastrarUsuarioService = async (data: createUserCleanDTO) => {
  try {
    const senha_hash = await bcrypt.hash(data.senha, 10);

    const capitalizeName = capitalizeFirstLetter(data.nome);

    data.senha = senha_hash;
    data.nome = capitalizeName;

    if (data.tipo === "ESTUDANTE") {
      data.semestre = Number(data.semestre);
    }

    const result = await cadastrarUsuarioRepository(data);

    return result;
  } catch (err: any) {
    console.log(err);
    throw new Error("Erro ao registrar o usuário");
  }
};

export const logarUsuarioService = async (data: loginUserDTO) => {
  try {
    const user = await logarUsuarioRepository(data);

    const SenhaValida = await bcrypt.compare(data.senha, user.senha);

    if (!SenhaValida) {
      throw new Error("Credenciais Inválidas");
    }

    const { senha, ...safeUser } = user;

    const token = jwt.sign({ sub: user.id, role: user.tipo }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, safeUser };
  } catch (err: any) {
    throw new Error("Erro ao fazer login");
  }
};

export const confirmarEmailService = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sub: string;
      exp: number;
    };

    if (!decoded.sub) {
      throw new Error("Token ausente");
    }

    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token expirado");
    }

    await confirmarEmailRepository(decoded.sub);

    return { message: "Email confirmado com sucesso!" };
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    }
    if (err.name === "JsonWebTokenError") {
      throw new Error("Token inválido");
    }
    console.error("erro no service de confimacao de email", err);
    throw new Error("Nao foi possivel verificar email");
  }
};

export const isVerifiedService = async (email: string) => {
  try {
    const isVerified = await isVerifiedRepository(email)
    if (isVerified === false) {
      return false
    }
    return isVerified
  } catch (error) {
    console.error("Erro ao verificar status de email:", error);
    throw new Error("Erro ao verificar status de email");
  }
}
