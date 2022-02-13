import { Badge, Button, IconButton, MenuItem } from "@mui/material";
import Menu1 from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/action/userAction";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.product);
  const user = useSelector((state) => state?.user.currentUser?.loginData);
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: "teal" }}>
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav style={{ marginRight: "-100px" }}>
            {!user && (
              <>
                <Nav.Link href="#" onClick={() => history.push("/signup")}>
                  <b>Sign Up</b>
                </Nav.Link>
                <Nav.Link
                  onClick={() => history.push("/signin")}
                  eventKey={2}
                  href="#"
                >
                  <b>Sign In</b>
                </Nav.Link>
              </>
            )}
            <Nav.Link
              sx={{ paddingBottom: "4px" }}
              onClick={() => history.push("/cart")}
              eventKey={2}
              href="#"
            >
              <Badge
                badgeContent={user ? cartQuantity.length : 0}
                color="primary"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Nav.Link>
            <Nav.Link eventKey={3} href="#">
              {user && (
                <>
                  <IconButton
                    sx={{ padding: 0 }}
                    size="medium"
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
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </Menu1>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
