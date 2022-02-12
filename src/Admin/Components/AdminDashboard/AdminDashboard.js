import React from "react";
import { Layout, Menu } from "antd";
import { useState } from "react";
// import TableChartIcon from "@mui/icons-material/TableChart";
// import LinkIcon from "@mui/icons-material/Link";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Visibility } from "@material-ui/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu1 from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import NewUserTable from "../NewUserTable/NewUserTable";
import OrderTable from "../OrderTable/OrderTable";
import Home from "../../Pages/Home/Home";
import CreateProduct from "../../Pages/CreateProduct/CreateProduct";
import ProductList from "../../Pages/ProductList/ProductList";
//router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditProduct from "../../Pages/EditProduct/EditProduct";

const { Header, Content, Sider } = Layout; //for dashboard layout
export default function AdminDashBoard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(history);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Layout>
        <Sider
          style={{ zIndex: 1 }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ marginTop: "50px" }}
          >
            <Menu.Item
              onClick={() => {
                history.push("/admin/home");
              }}
              key="1"
            >
              Home
            </Menu.Item>
            <Menu.Item key="2">Users</Menu.Item>
            <Menu.Item
              onClick={() => {
                history.push("/admin/product");
              }}
              key="3"
            >
              Products
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
                <Route exact path="/admin/home">
                  <Home />
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
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
