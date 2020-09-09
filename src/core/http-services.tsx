import axios from "axios";

const URL_PATH = "https://reqres.in/api";

/** Body para /login */
export interface IAuthTokenBody {
  email: string;
  password: string;
}

/** Devuelve el token de inicio de sesión */
export async function fetchAuthToken(body: IAuthTokenBody) {
  const response = await axios.post(URL_PATH + "/login", body);
  return response;
}

/** Devuelve el listado de usuarios */
export async function fetchUsers(page?: number) {
  const response = await axios.get(
    `${URL_PATH}/users${page && `?page=${page}`}`
  );
  return response;
}

/** Devuelve el detalle de un usuario */
export async function fetchUserDetail(userId: number) {
  const response = await axios.get(`${URL_PATH}/users/${userId}`);
  return response;
}

export interface IUserUpdateBody {
  userId: number;
  first_name?: string;
  last_name?: string;
  email?: string;
}

/** Actualiza los datos del usuario */
export async function updateUserCall({
  userId,
  first_name,
  last_name,
  email,
}: IUserUpdateBody) {
  const response = await axios.put(`${URL_PATH}/users/${userId}`, {
    first_name,
    last_name,
    email,
  });
  return response;
}

/** Elimina un determinado usuario */
export async function deleteUserCall(userId: number) {
  const response = await axios.delete(`${URL_PATH}/users/${userId}`);
  return response;
}
