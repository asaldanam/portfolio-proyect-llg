import {
  deleteUserCall,
  fetchUserDetail,
  updateUserCall,
} from "core/http-services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  deleteUser,
  REQUEST_DELETE_USER,
  REQUEST_UPDATE_USER,
  REQUEST_USER_DETAIL,
  setUserDetails,
  setUserDetailsError,
  updateUser,
} from "../stores/user-details.store";

/** Obtiene el detalle del usuario @saga */
function* getUserDetailsSaga(action: any) {
  try {
    const { data } = yield call(fetchUserDetail, action.payload);
    yield put(setUserDetails(data.data));
  } catch (e) {
    yield put(
      setUserDetailsError({
        message: e?.response?.data?.error || "error",
        status: e?.response?.status || "error",
      })
    );
  }
}

/** Actualiza el usuario @saga */
function* updateUserSaga(action: any) {
  try {
    const { data } = yield call(updateUserCall, action.payload);
    yield put(updateUser(data));
  } catch (e) {
    yield put(
      setUserDetailsError({
        message: e?.response?.data?.error || "error",
        status: e?.response?.status || "error",
      })
    );
  }
}

/** Elimina el usuario @saga */
function* deleteUserSaga(action: any) {
  try {
    yield call(deleteUserCall, action.payload);
    yield put(deleteUser());
  } catch (e) {
    yield put(
      setUserDetailsError({
        message: e?.response?.data?.error || "error",
        status: e?.response?.status || "error",
      })
    );
  }
}

/** EXPORT WATCHERS */

export function* watchGetUserDetails() {
  yield takeLatest(REQUEST_USER_DETAIL, getUserDetailsSaga);
}

export function* watchUpdateUserSaga() {
  yield takeLatest(REQUEST_UPDATE_USER, updateUserSaga);
}

export function* watchDeleteUserSaga() {
  yield takeLatest(REQUEST_DELETE_USER, deleteUserSaga);
}
