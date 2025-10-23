let start: (() => void) | null = null;
let stop: (() => void) | null = null;

export const registerLoading = (startFn: () => void, stopFn: () => void) => {
  start = startFn;
  stop = stopFn;
};

export const startLoading = () => start?.();
export const stopLoading = () => stop?.();

// 👉 criar um “ponto global de acesso” (singleton) que o contexto registra quando o app inicia.
// Usa o contexto do react em arquivos .ts