import { IAuthTokenBody } from "core/http-services";

/** STATE */
export interface IAuthState {
  token?: string | null;
  error?: string | null;
  loading: boolean;
}

const initialState: IAuthState = {
  token: null,
  error: null,
  loading: false,
};

/** ACTIONS */

export const AUTH_SET_TOKEN = "[AUTH] Set token";
export const AUTH_SET_ERROR = "[AUTH] Set error";
export const AUTH_CLEAR_TOKEN = "[AUTH] Clear token";
export const GET_AUTH = "[AUTH] Get token";

/** ACTION CREATORS */

/** Obtiene el token de autentificación y lo guarda en el store @action */
export function signIn(body: IAuthTokenBody) {
  return { type: GET_AUTH, payload: body };
}

/** Setea el token en el store @action */
export function setToken(token: IAuthState["token"]) {
  return { type: AUTH_SET_TOKEN, payload: token };
}

/** Setea el token en el store @action */
export function setAuthError(error: { message: string; status: number }) {
  return { type: AUTH_SET_ERROR, payload: error };
}

/** Limpia el token del store y la sesión del localstorage @action */
export function signOut() {
  window.localStorage.removeItem("token");
  return { type: AUTH_CLEAR_TOKEN, payload: undefined };
}

/** REDUCERS */
const auth = function (state = initialState, action: any) {
  switch (action.type) {
    case GET_AUTH: {
      return {
        loading: true,
      };
    }
    case AUTH_SET_TOKEN: {
      return {
        token: action.payload,
        error: null,
        loading: false,
      };
    }
    case AUTH_SET_ERROR: {
      return {
        token: null,
        error: action.payload,
        loading: false,
      };
    }
    case AUTH_CLEAR_TOKEN: {
      return {
        token: null,
        error: null,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
