import React from "react";
import RouterProtection from "./RouterProtection";

const Cart = React.lazy(() => import("../Pages/Cart"));
const Orders = React.lazy(() => import("../Pages/Order"));
const Success = React.lazy(() => import("../Pages/Success"));

//these router will protected needs authentication
const ToProtect = [
  {
    path: "/cart",
    component: Cart,
    exact: true,
  },
  {
    path: "/success",
    component: Success,
    exact: true,
  },
  {
    path: "/orders",
    component: Orders,
    exact: true,
  },
];

function ProtectedRouter() {
  return (
    <div>
      {ToProtect.map((route, index) => {
        return (
          <RouterProtection
            path={route.path}
            key={index}
            component={route.component}
            exact={route.exact}
          />
        );
      })}
    </div>
  );
}

export default ProtectedRouter;
