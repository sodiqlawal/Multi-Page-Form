import { TProduct } from "models/product";
import { api } from "services/api";
import { TEditProductPayload } from "store/actions/products";

export const fetchProductService = () => api("products", "GET");

export const createProductService = (product: TProduct) =>
  api("products", "POST", {
    body: { ...product },
  });

export const editProductService = ({ id, ...product }: TEditProductPayload) =>
  api(`products/${id}`, "PATCH", {
    body: { ...product },
  });

export const deleteProductService = (id: string) =>
  api(`products/${id}`, "DELETE");
