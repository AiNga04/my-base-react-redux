import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../action/userAction";
import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    email: "",
    image: "",
    refresh_token: "",
    role: "",
    username: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          email: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
          refresh_token: action?.payload?.DT?.refresh_token,
          role: action?.payload?.DT?.role,
          username: action?.payload?.DT?.username,
        },
        isAuthenticated: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          email: "",
          image: "",
          refresh_token: "",
          role: "",
          username: "",
        },
        isAuthenticated: false,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
