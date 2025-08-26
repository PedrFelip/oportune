import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDTO, logUserDTO } from "../interfaces/userDTO.ts";
import {
  cadastrarUsuarioRepository,
  logarUsuarioRepository,
} from "../repositories/authRepository.ts";
import { capitalizeFirstLetter } from "../utils/functions.ts";
import { JWT_SECRET } from "../config/config.ts";

export const cadastrarUsuarioService = async (data: createUserDTO) => {
  try {
    const senha_hash = await bcrypt.hash(data.senha, 10);

    const capitalizeName = capitalizeFirstLetter(data.nome);

    data.senha = senha_hash;
    data.nome = capitalizeName;

    await cadastrarUsuarioRepository(data);
  } catch (err: any) {
    console.log(err);
    throw new Error("Erro ao registrar o usuário");
  }
};

export const logarUsuarioService = async (data: logUserDTO) => {
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
