import { TProduct } from "models/product";
import { api } from "services/api";
import { TEditProductPayload } from "store/actions/products";

export const fetchProductService = () => api("products");

export const createProductService = (product: TProduct) =>
  api("products", {
    body: { ...product },
  });

export const editProductService = (payload: TEditProductPayload) =>
  api(`products/${payload.id}`, {
    patch: true,
  });

export const deleteProductService = (id: string) =>
  api(`products/${id}`, {
    del: true,
  });
