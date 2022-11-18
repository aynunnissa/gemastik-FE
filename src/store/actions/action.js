import * as types from "./type";

// User
export const login = user => dispatch => {
  dispatch({
    type: types.LOGIN,
    user,
  });
};

export const logout = () => ({
  type: types.LOGOUT,
});

export const loadUser = () => ({
  type: types.LOAD_USER,
});

export const loadUserInfo = user => dispatch => {
  dispatch({
    type: types.LOAD_USER_INFO,
    user,
  });
};
