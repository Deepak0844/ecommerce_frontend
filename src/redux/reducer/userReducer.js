import { LOGIN_START } from "../action/userAction";
import { LOGIN_SUCCESS } from "../action/userAction";
import { LOGIN_FAILED } from "../action/userAction";
import { LOGOUT } from "../action/userAction";
import { SIGNUP_START } from "../action/userAction";
import { SIGNUP_SUCCESS } from "../action/userAction";
import { SIGNUP_FAILED } from "../action/userAction";
import { initialValue } from "../initialValue";

const userReducer = (state = initialValue.user, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        currentUser: null,
        isFetching: true,
        error: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
        error: "",
      };
    case LOGIN_FAILED:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: "",
      };
    case SIGNUP_START:
      return {
        ...state,
        currentUser: null,
        isFetching: true,
        error: "",
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: "",
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
