import Swal from "sweetalert2";

export const mostrarErro = (mensagem) => {
  Swal.fire({
    title: "Erro",
    text: mensagem,
    icon: "error",
    confirmButtonText: "Refazer",
    confirmButtonColor: "#2474e4",

    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
