import bcrypt from "bcrypt";
import { createUserDTO } from "../interfaces/createUserDTO.ts";
import { cadastrarUsuarioRepository } from "../repositories/authRepository.ts";
import { capitalizeFirstLetter } from "../utils/functions.ts";

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
