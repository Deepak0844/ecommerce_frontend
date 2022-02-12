import { Badge, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import React from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/action/userAction";

function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.product);
  const user = useSelector((state) => state?.user.currentUser?.loginData);
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: "teal" }}>
      <Container>
        <Navbar.Brand onClick={() => history.push("/")}>Ecommerce</Navbar.Brand>
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
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
