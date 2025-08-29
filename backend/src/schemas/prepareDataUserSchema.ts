export function prepareDataForZod(rawData: any) {
  const baseData = {
    nome: rawData.nome,
    email: rawData.email,
    senha: rawData.senha,
    senhaConfirmada: rawData.senhaConfirmada,
    termos: rawData.termos,
    tipo: rawData.tipo?.trim().toUpperCase(),
  };

  switch (baseData.tipo) {
    case "ESTUDANTE":
      return {
        ...baseData,
        dataNascimento: rawData.dataNascimento,
        genero:
          typeof rawData.genero === "string"
            ? rawData.genero.toUpperCase()
            : rawData.genero?.value.toUpperCase(),
        telefone: rawData.telefone,
        curso: rawData.curso,
        matricula: rawData.matricula,
        semestre: rawData.semestre,
        periodo:
          typeof rawData.periodo === "string"
            ? rawData.periodo.toUpperCase()
            : rawData.periodo?.value.toUpperCase(),
      };

    case "PROFESSOR":
      return {
        ...baseData,
        dataNascimento: rawData.dataNascimento,
        genero:
          typeof rawData.genero === "string"
            ? rawData.genero.toUpperCase()
            : rawData.genero?.value.toUpperCase(),
        telefone: rawData.telefone,
        areaAtuacao: rawData.areaAtuacao,
        departamento: rawData.departamento,
        titulacao: rawData.titulacao,
        lattes: rawData.lattes,
      };

    case "EMPRESA":
      return {
        ...baseData,
        nomeFantasia: rawData.nome,
        cnpj: rawData.cnpj,
        ramo: rawData.ramo,
        setor: rawData.setor,
        descricao: rawData.descricao,
        emailContato: rawData.emailContato,
        telefone: rawData.telefone,
        website: rawData.website,
      };

    default:
      return baseData;
  }
}
