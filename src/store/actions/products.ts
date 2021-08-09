import { createAction } from "@reduxjs/toolkit";
import { ProductActionTypes } from "./actionTypes";
import withPayloadType from "lib/utils/withPayloadType";
import { TProduct } from "models/product";

// fetch all products
interface FetchProductErrorPayload {
  error: Error;
}

export interface FetchProductSuccessPayload {
  total: number;
  products: TProduct[];
}

export const fetchProducts = createAction(ProductActionTypes.FETCH_PRODUCTS);

export const fetchProductsSuccess = createAction(
  ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  withPayloadType<FetchProductSuccessPayload>()
);

export const fetchProductsError = createAction(
  ProductActionTypes.FETCH_PRODUCTS_ERROR,
  withPayloadType<FetchProductErrorPayload>()
);

// create product
export interface TEditProductPayload {
  onSuccess?: () => void;
  onCompleted?: () => void;
}

export const createProduct = createAction(
  ProductActionTypes.CREATE_PRODUCT,
  withPayloadType<TEditProductPayload>()
);

export const createProductSuccess = createAction(
  ProductActionTypes.CREATE_PRODUCT_SUCCESS,
  withPayloadType<TProduct>()
);

export const createProductError = createAction(
  ProductActionTypes.CREATE_PRODUCT_ERROR,
  withPayloadType<Error>()
);

// edit product
export interface TEditProductPayload {
  id: string;
  product: TProduct;
  onSuccess?: () => void;
  onCompleted?: () => void;
}

export const editProduct = createAction(
  ProductActionTypes.EDIT_PRODUCT,
  withPayloadType<TEditProductPayload>()
);

export const editProductSuccess = createAction(
  ProductActionTypes.EDIT_PRODUCT_SUCCESS,
  withPayloadType<TProduct>()
);

export const editProductError = createAction(
  ProductActionTypes.EDIT_PRODUCT_ERROR,
  withPayloadType<Error>()
);

// delete product
export interface DeleteProductPayload {
  id: string;
  onSuccess?: () => void;
}

interface DeleteProductErrorPayload {
  error: Error;
}

export const deleteProduct = createAction(
  ProductActionTypes.DELETE_PRODUCT,
  withPayloadType<DeleteProductPayload>()
);

export const deleteProductSuccess = createAction(
  ProductActionTypes.DELETE_PRODUCT_SUCCESS,
  withPayloadType<DeleteProductPayload>()
);

export const deleteProductError = createAction(
  ProductActionTypes.DELETE_PRODUCT_ERROR,
  withPayloadType<DeleteProductErrorPayload>()
);
