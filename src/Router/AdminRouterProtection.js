import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRouterProtection(props) {
  const isAdmin = useSelector(
    (state) => state.user?.currentUser?.loginData?.isAdmin
  );

  if (isAdmin) {
    //token and userinfo is not null protected routes will accessible
    return <Route {...props} />;
  } else {
    //return to sign in page
    return <Redirect to="/signin" />;
  }
}
