import { call, takeLatest, put } from "redux-saga/effects";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  editProduct,
  editProductSuccess,
  editProductError,
  createProduct,
  createProductSuccess,
  createProductError,
  deleteProduct,
  deleteProductSuccess,
  deleteProductError,
} from "../actions/products";

import {
  fetchProductService,
  editProductService,
  createProductService,
  deleteProductService,
} from "services/products";
import { toastError, toastSuccess } from "lib/utils/toasters";

function* fetchProductsSaga() {
  try {
    const { payload } = yield call(fetchProductService);

    yield put(
      fetchProductsSuccess({
        total: payload.data.total,
        products: payload.data,
      })
    );
  } catch (error) {
    yield put(
      fetchProductsError({
        error,
      })
    );
    toastError(error.message);
  }
}

function* createProductSaga(action: ReturnType<typeof createProduct>) {
  try {
    const { payload } = yield call(createProductService, action.payload);

    yield put(createProductSuccess(payload.data));
    toastSuccess("Product created successfully!");
    action.payload.onSuccess?.();
  } catch (error) {
    yield put(createProductError(error));
    toastError(error.message);
  } finally {
    action.payload.onCompleted?.();
  }
}

function* editProductSaga(action: ReturnType<typeof editProduct>) {
  try {
    const { payload } = yield call(editProductService, action.payload);

    yield put(editProductSuccess(payload.data));
    toastSuccess("Product edited successfully!");
    action.payload.onSuccess?.();
  } catch (error) {
    yield put(editProductError(error));
    toastError(error.message);
  } finally {
    action.payload.onCompleted?.();
  }
}

function* deleteProductSaga(action: ReturnType<typeof deleteProduct>) {
  try {
    const { id } = yield call(deleteProductService, action.payload);

    yield put(deleteProductSuccess({ id }));
    toastSuccess("Product deleted successfully!");
    action.payload.onSuccess?.();
  } catch (error) {
    yield put(deleteProductError(error));
    toastError(error.message);
  }
}

function* productSaga() {
  yield takeLatest(fetchProducts, fetchProductsSaga);
  yield takeLatest(createProduct, createProductSaga);
  yield takeLatest(editProduct, editProductSaga);
  yield takeLatest(deleteProduct, deleteProductSaga);
}

export default productSaga;
