export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const doLogin = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = (data) => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
