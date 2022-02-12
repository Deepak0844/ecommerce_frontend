import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethod";
//
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
//
function ProductList() {
  const [product, setProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let stop = "stop";
  useEffect(() => {
    userRequest
      .get("/product")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {product && <ProductTable product={product} setRefresh={setRefresh} />}
    </div>
  );
}

export default ProductList;

const Container = styled.div`
  padding: 10px;
  margin-top: 30px;
`;
const Title = styled.h3`
  font-family: "poppins";
`;
function ProductTable({ product, setRefresh }) {
  const history = useHistory();
  const deleteProduct = (id) => {
    setRefresh(true);
    userRequest
      .delete(`/product/${id}`)
      .then((res) => {
        console.log("product deleted successfully");
        setRefresh(true);
      })
      .catch((err) => console.log(err.response.data.message));
  };
  return (
    <Container>
      <Title>Products</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Price&nbsp;(₹)</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}.
                </TableCell>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="center">
                  <img
                    style={{
                      borderRadius: "5px",
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                    src={row.image}
                  />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">
                  {row.inStock ? "available" : "out of stock"}
                </TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        history.push(`/edit/${row._id}`);
                      }}
                      aria-label="EditIcon"
                      color="secondary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => deleteProduct(row._id)}
                      aria-label="Delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
