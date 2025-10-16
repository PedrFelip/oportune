
export const phoneRegex = /^\(?[1-9]{2}\)? ?(9[0-9]{4}-?[0-9]{4}|[2-5][0-9]{3}-?[0-9]{4})$/;

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export const onlyLettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const lattesRegex = /^https?:\/\/(?:www\.)?lattes\.cnpq\.br\/\d{16}\/?$/

export const verificarIdadeMinima = (dataNascimentoStr: string, idadeMinima = 16) => {
  const hoje = new Date();
  const dataNascimento = new Date(dataNascimentoStr);

  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesDiff = hoje.getMonth() - dataNascimento.getMonth();
  const diaDiff = hoje.getDate() - dataNascimento.getDate();

  if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
    idade--;
  }

  return idade >= idadeMinima;
};

export const primeiraLetraMaiuscula = (str: string) => {
  return str.replace(/^./, char => char.toUpperCase());
}