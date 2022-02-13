import React from "react";
import { Layout, Menu } from "antd";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu1 from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Dashboard from "../Pages/Dashboard";
import CreateProduct from "../Pages/CreateProduct";
import ProductList from "../Pages/ProductList";
//router
import { Route, Switch, Router } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditProduct from "../Pages/EditProduct";
import UserList from "../Pages/UserList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminSignIn from "../Pages/AdminSignIn";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/userAction";
import AdminRouter from "../../Router/AdminRouter";
import { Suspense } from "react";

const { Header, Content, Sider } = Layout; //for dashboard layout
export default function AdminDashBoard() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Layout>
        <Sider
          style={{ zIndex: 2 }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <h2
            className="logo"
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: "10px",
              fontFamily: "poppins",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AdminPanelSettingsIcon fontSize="large" />
            Admin
          </h2>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ marginTop: "50px" }}
          >
            <Menu.Item
              onClick={() => {
                history.push("/admin/dashboard");
              }}
              key="1"
            >
              <b style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <DashboardIcon />
                Dashboard
              </b>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/admin/users");
              }}
              key="2"
            >
              <b style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <PersonIcon />
                Users
              </b>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/admin/product");
              }}
              key="3"
            >
              <b style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Inventory2Icon />
                Products
              </b>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/admin/create/product");
              }}
              key="4"
            >
              <b style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <AddBoxIcon />
                Add Products
              </b>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon
                  style={{ fontSize: "30px", color: "white" }}
                />
              </IconButton>
              <Menu1
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    dispatch(logout());
                    history.push("/signin");
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu1>
            </div>
          </Header>
          <Content style={{ minHeight: "93.8vh", height: "auto" }}>
            <div className="site-layout-background">
              {/* adding all components */}
              <Switch>
                <Suspense fallback={false}>
                  <Route
                    path="/"
                    name="protected pages"
                    render={(props) => <AdminRouter {...props} />}
                  />
                </Suspense>
              </Switch>
              {/* <Route exact path="/admin/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/admin/product">
                  <ProductList />
                </Route>
                <Route exact path="/create/product">
                  <CreateProduct />
                </Route>
                <Route exact path="/edit/:id">
                  <EditProduct />
                </Route>
                <Route exact path="/admin/users">
                  <UserList />
                </Route>
              </Switch> */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
