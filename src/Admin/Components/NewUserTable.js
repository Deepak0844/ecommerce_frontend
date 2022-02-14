import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { userRequest } from "../../requestMethod";
import styled from "styled-components";
import BackDrop from "../../Components/BackDrop";

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 10px;
  flex: 4;
  border-radius: 8px;
  background: white;
`;
const Title = styled.h4`
  font-family: "poppins";
  font-weight: 500;
`;

function NewUserTable() {
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    userRequest
      .get("/user/?new=true")
      .then((res) => {
        setNewUser(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <Container>
      <TableContainer sx={{ padding: "10px" }} component={Paper}>
        <Title style={{ marginLeft: "10px" }}>New Join Users</Title>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newUser &&
              newUser?.slice(0, 5).map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ minWidth: 100 }} component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default NewUserTable;
