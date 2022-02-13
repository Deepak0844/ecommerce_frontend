import React from "react";
import AdminRouterProtection from "./AdminRouterProtection";

const Dashboard = React.lazy(() => import("../Admin/Pages/Dashboard"));
const ProductList = React.lazy(() => import("../Admin/Pages/ProductList"));
const CreateProduct = React.lazy(() => import("../Admin/Pages/CreateProduct"));
const EditProduct = React.lazy(() => import("../Admin/Pages/EditProduct"));
const UserList = React.lazy(() => import("../Admin/Pages/UserList"));

//these router will protected needs authentication
const ToProtectAdmin = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/product",
    component: ProductList,
    exact: true,
  },
  {
    path: "/admin/create/product",
    component: CreateProduct,
    exact: true,
  },
  {
    path: "/admin/edit/:id",
    component: EditProduct,
    exact: true,
  },
  {
    path: "/admin/users",
    component: UserList,
    exact: true,
  },
];

function AdminRouter() {
  return (
    <div>
      {ToProtectAdmin.map((route, index) => {
        return (
          <AdminRouterProtection
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

export default AdminRouter;
