import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./stores/auth.store";
import { RootState } from "./redux";

/** Guarda o recupera el token del Local Storage antes de que resuelva las rutas */
const SessionManager: React.FC<{
  children?: any;
}> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionToken = window.localStorage.getItem("token");
    if (sessionToken && !auth.token) {
      dispatch(setToken(sessionToken));
    } else if (!sessionToken && auth.token) {
      window.localStorage.setItem("token", auth.token);
    }
  }, [auth, dispatch]);

  return children;
};

export default SessionManager;
