export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const loginStarts = () => {
  return {
    type: "LOGIN_START",
  };
};

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailed = (error) => {
  return {
    type: "LOGIN_FAILED",
    payload: error,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const signupStarts = () => {
  return {
    type: "SIGNUP_START",
  };
};

export const signupSuccess = () => {
  return {
    type: "SIGNUP_SUCCESS",
  };
};

export const signupFailed = (error) => {
  return {
    type: "SIGNUP_FAILED",
    payload: error,
  };
};
