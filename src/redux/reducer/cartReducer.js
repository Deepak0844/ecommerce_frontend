import {
  ADD_TO_CART,
  AFTER_CHECKOUT_SUCCESS,
  DELETE_CART,
} from "../action/cartAction";
import { initialValue } from "../initialValue";

const cartReducer = (state = initialValue.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        userId: action.payload.userId,
        product: [...state.product, action.payload],
        // cartQuantity: state.cartQuantity + 1,
        total:
          state.total + action.payload.price * action.payload.productQuantity,
      };
    case AFTER_CHECKOUT_SUCCESS:
      return {
        product: [],
        // cartQuantity: 0,
        total: 0,
      };
    case DELETE_CART:
      const productToRemove = state.product.find((item) => item);
      return {
        ...state,
        product: state.product.filter((item) => item._id !== action.payload),
        total:
          state.total - productToRemove.price * productToRemove.productQuantity,
      };
    default:
      return state;
  }
};

export default cartReducer;
