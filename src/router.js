import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Success from "./Pages/Success";

export default function AppRouter() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/:category">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/orders">
          <Order />
        </Route>
      </Switch>
    </div>
  );
}
