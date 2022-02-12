export const ADD_TO_CART = "ADD_TO_CART";
export const AFTER_CHECKOUT_SUCCESS = "AFTER_CHECKOUT_SUCCESS";
export const DELETE_CART = "DELETE_CART";
export const add_to_cart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const after_checkout_success = (product) => {
  return {
    type: "AFTER_CHECKOUT_SUCCESS",
  };
};

//
export const delete_cart = (id) => {
  return {
    type: "DELETE_CART",
    payload: id,
  };
};
