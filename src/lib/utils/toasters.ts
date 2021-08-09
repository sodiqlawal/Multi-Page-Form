import { toast } from "react-toastify";

export const toastSuccess = (msg: string) => {
  return toast.success(msg);
};

export const toastError = (msg: string) => {
  return toast.error(msg);
};

export const toastWarning = (msg: string) => {
  return toast.warning(msg);
};

export const toastInfo = (msg: string) => {
  return toast.info(msg);
};
