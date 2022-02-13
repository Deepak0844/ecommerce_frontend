import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouterProtection(props) {
  const isLogin = useSelector((state) => state.user.isLogin);

  if (isLogin) {
    //token and userinfo is not null protected routes will accessible
    return <Route {...props} />;
  } else {
    //return to sign in page
    return <Redirect to="/signin" />;
  }
}
