import Swal from "sweetalert2";

export function SwalError(erro: any, buttonText: any, description: any, timer = 3000) {
  return Swal.fire({
    title: erro,
    text: description,
    icon: "error",
    confirmButtonText: buttonText,
    confirmButtonColor: "#FF0000",

    timer: timer,
    timerProgressBar: true,
    showConfirmButton: true,
  });
}
