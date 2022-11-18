import { LOGIN, LOGOUT, LOAD_USER } from "../actions/type";

const initialState = {
  token: "",
  role: "",
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      const storageData = localStorage.getItem("clotht");
      const user = JSON.parse(storageData);
      state.token = user.token;
      state.role = user.role;
      state.isLoggedIn = true;
      return {
        ...state,
      };
    case LOGIN:
      state.token = action.user.token;
      state.role = action.user.role;
      state.isLoggedIn = true;

      localStorage.setItem("clotht", JSON.stringify(action.user));
      return {
        ...state,
      };
    case LOGOUT:
      state.token = "";
      state.isLoggedIn = false;
      state.role = "";
      localStorage.removeItem("clotht");
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default authReducer;
