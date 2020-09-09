import { all } from "redux-saga/effects";
import watchSignIn from "./sagas/auth.saga";
import watchGetUsers from "./sagas/users.saga";
import {
  watchGetUserDetails,
  watchDeleteUserSaga,
  watchUpdateUserSaga,
} from "./sagas/user-details.saga";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchUpdateUserSaga(),
    watchSignIn(),
    watchGetUsers(),
    watchGetUserDetails(),
    watchDeleteUserSaga(),
  ]);
}
