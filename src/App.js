import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Categories from "./Components/Categories";
import Home from "./Pages/Home";
import AdminDashBoard from "./Admin/Components/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otherRouter, openRouter } from "./Router/OpenRouter";
import { Suspense } from "react";
import ProtectedRouter from "./Router/ProtectedRouter";
import BackDrop from "./Components/BackDrop";
import AdminRouter from "./Router/AdminRouter";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<BackDrop />}>
        <Switch>
          {otherRouter.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
                key={index}
              />
            );
          })}
          {openRouter.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
                key={index}
              />
            );
          })}
          <Route
            path="/admin"
            // exact={true}
            name="admin pages"
            component={AdminDashBoard}
          />
          <Route
            path="/"
            name="protected pages"
            render={(props) => <ProtectedRouter {...props} />}
          />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
