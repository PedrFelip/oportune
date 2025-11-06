import { toast } from "react-toastify";

export const showMessage = {
  success: (msg: string) => {
    toast.dismiss();
    toast.success(msg);
  },
  error: (msg: string) => {
    toast.dismiss();
    toast.error(msg);
  },
  warn: (msg: string) => {
    toast.dismiss();
    toast.warn(msg);
  },
  warning: (msg: string) => {
    toast.dismiss();
    toast.warning(msg);
  },
  info: (msg: string) => {
    toast.dismiss();
    toast.info(msg);
  },
  loading: (msg: string) => {
    toast.dismiss();
    toast.loading(msg);
  },
  dismiss: () => toast.dismiss(),
};
