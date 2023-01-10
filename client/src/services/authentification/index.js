import { postReq, getReq } from "../requests";
import jwtDecode from "jwt-decode";

const defaultPreferences = {
  crypto:[]
};
export const isLogged = () => JSON.parse(localStorage.getItem("user")) || false;
export const getToken = () => localStorage.getItem("jwt") || "";

export const getRole = () => {
  try {
    const jwt = getToken();
    const decoded = jwtDecode(jwt);

    return decoded.role;
  } catch (e) {
    return "";
  }
};

export const login = async (email, password) => {
  try {
    const res = await postReq({
      endpoint: "/users/login",
      data: { email, password }
    });


    if (res) {
      const { token, user } = res.data;
      localStorage.setItem("jwt", token);

      const { firstname, lastname, avatar, _id, role } = user;
      localStorage.setItem(
        "user",
        JSON.stringify({ firstname, lastname, avatar, _id })
      );
      localStorage.setItem("role", role);
      // will be removed ?

      localStorage.setItem(
        "preferences",
        JSON.stringify({
          ...defaultPreferences,
        })
      );
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
};

export const register = async (firstname, lastname, email, password, role) => {
  try {
    const res = await postReq({
      endpoint: "/users/signup",
      data: { firstname, lastname, email, password, role },
    });

    if (res) {
      const { token, user } = res.data;
      localStorage.setItem("jwt", token);

      const { firstname, lastname, avatar, _id, role } = user;
      localStorage.setItem(
        "user",
        JSON.stringify({ firstname, lastname, avatar, _id })
      );
      localStorage.setItem("role", role);
      // will be removed ?

      localStorage.setItem(
        "preferences",
        JSON.stringify({
          ...defaultPreferences,
        })
      );
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
};

export const registerLoginGoogle = async () => {

  const res = await getReq({
    endpoint: `/users/auth/google`,
  });

  return res ? res : [];
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
  localStorage.removeItem("preferences");
};

export const getPreferences = () =>
  JSON.parse(localStorage.getItem("preferences")) || defaultPreferences;

export const setPreferences = (preference) => {
  const preferences = JSON.parse(localStorage.getItem("preferences"));

  localStorage.setItem(
    "preferences",
    JSON.stringify({ ...preferences, ...preference })
  );
};