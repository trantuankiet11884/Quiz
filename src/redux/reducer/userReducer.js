import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const initial_state = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT.access_token,
          refresh_token: action?.payload?.DT.refresh_token,
          username: action?.payload?.DT.username,
          image: action?.payload?.DT.image,
          role: action?.payload?.DT.role,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
