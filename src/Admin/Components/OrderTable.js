import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";
import styled from "styled-components";
import { mobile } from "../../Responsive";
import axios from "axios";

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 10px;
  flex: 6;
  border-radius: 8px;
  background: white;
  ${mobile({
    flex: "1",
    width: "300px",
  })};
`;
const Title = styled.h4`
  font-family: "poppins";
  font-weight: 500;
`;

function OrderTable({ token }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("https://backendecommerceapp.herokuapp.com/order", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err.response.data.message));
  }, []);
  return (
    <Container>
      <TableContainer sx={{ width: "100%", padding: "10px" }} component={Paper}>
        <Title style={{ marginLeft: "10px" }}>Orders</Title>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Customer</b>
              </TableCell>
              <TableCell align="center">
                <b>Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Amount</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ minWidth: 100 }} component="th" scope="row">
                    {row.userId}
                  </TableCell>
                  <TableCell align="center">{format(row.createdAt)}</TableCell>
                  <TableCell align="center">₹ {row.amount}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrderTable;
