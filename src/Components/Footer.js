import React from "react";
import styled from "styled-components";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../Responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #b9b9b9;
  background: #bebebe;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  padding: 20px 10px;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  margin-right: 0px;
`;
const ContactItem = styled.div`
margin:bottom:20px;
display:flex;
align-items:center;
padding-bottom:10px
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Title item="left">Categories</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
        </List>
      </Left>
      <Right>
        <Title item="right">Contact</Title>
        <ContactItem>
          <BusinessIcon style={{ marginRight: "10px" }} />
          No:22 Chennai ,India
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          +91 9874563210
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          No:22 Chennai ,India
        </ContactItem>
      </Right>
    </Container>
  );
}

export default Footer;
