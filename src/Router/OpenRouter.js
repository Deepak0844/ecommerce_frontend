import { lazy } from "react";

const Home = lazy(() => import("../Pages/Home"));
const ProductList = lazy(() => import("../Pages/ProductList"));
const Product = lazy(() => import("../Pages/Product"));
const SignIn = lazy(() => import("../Pages/SignIn"));
const SignUp = lazy(() => import("../Pages/SignUp"));
const AdminSignIn = lazy(() => import("../Admin/Pages/AdminSignIn"));
const ForgotPassword = lazy(() => import("../Pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/ResetPassword"));
const AccountActivatedSuccess = lazy(() =>
  import("../Pages/AccountActivatedSuccess")
);
const PasswordChangedSuccess = lazy(() =>
  import("../Pages/PasswordChangedSuccess")
);

export const openRouter = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/products/:category",
    component: ProductList,
    exact: true,
  },
  {
    path: "/product/:id",
    component: Product,
    exact: true,
  },
  {
    path: "/Signin",
    component: SignIn,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true,
  },
  {
    path: "/admin/signin",
    component: AdminSignIn,
    exact: true,
  },
];

export const otherRouter = [
  {
    path: "/account-verification/:token",
    component: AccountActivatedSuccess,
    exact: true,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
    exact: true,
  },
  {
    path: "/passwordchanged-Successfully",
    component: PasswordChangedSuccess,
    exact: true,
  },
];
