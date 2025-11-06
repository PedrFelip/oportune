export function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.error("Erro:", error.message);
  } else {
    console.error("Erro desconhecido:", error);
  }
}
