import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
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
  TablePagination,
  Fab,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../Responsive";
import { toast } from "react-toastify";
import BackDrop from "../../Components/BackDrop";

const Container = styled.div`
  padding: 10px;
  margin-top: 30px;
`;
const Title = styled.h3`
  font-family: "poppins";
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const AddBtn = styled.div`
  ${mobile({
    display: "none",
  })};
`;
const FloatBtn = styled.div`
  display: none;
  ${mobile({
    display: "block",
  })};
`;
const columns = [
  { id: "_id", label: "ID", minWidth: 100 },
  { id: "image", type: "image", label: "Image", minWidth: 170 },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "left",
  },
  {
    id: "inStock",
    label: "Stock",
    minWidth: 170,
    align: "left",
  },
  {
    id: "price",
    label: "Price (₹)",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    type: "button",
    align: "center",
  },
];

//display all available products
export default function ProductList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [product, setProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    userRequest
      .get("/product")
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  }, [refresh]);

  const deleteProduct = (id) => {
    setLoading(true);
    userRequest
      .delete(`/product/${id}`)
      .then(() => {
        toast.success("Product deleted successfully");
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      {loading ? (
        <BackDrop />
      ) : (
        <>
          <TopContainer>
            <Title>Products</Title>
            <AddBtn>
              <Button
                onClick={() => history.push("/admin/create/product")}
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </AddBtn>
          </TopContainer>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "75vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        <b>{column.label}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.type === "image" ? (
                                  <img
                                    style={{
                                      borderRadius: "5px",
                                      height: "100px",
                                      width: "100px",
                                      objectFit: "cover",
                                    }}
                                    alt={row.title}
                                    src={value}
                                  />
                                ) : column.type === "button" ? (
                                  <>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        onClick={() => {
                                          history.push(
                                            `/admin/edit/${row._id}`
                                          );
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
                                  </>
                                ) : (
                                  value.toString()
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={product.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FloatBtn>
            <Fab
              onClick={() => history.push("/admin/create/product")}
              style={{ position: "absolute", bottom: 20, right: 25 }}
              size="medium"
              color="secondary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </FloatBtn>
        </>
      )}
    </Container>
  );
}
