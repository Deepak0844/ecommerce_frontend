import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { userRequest } from "../../requestMethod";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import BackDrop from "../../Components/BackDrop";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 10px;
  margin-top: 30px;
`;
const Title = styled.h3`
  font-family: "poppins";
`;

const columns = [
  { id: "_id", label: "ID", align: "center", minWidth: 100 },
  { id: "userName", align: "left", label: "User Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 140,
    align: "left",
    type: "time",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    type: "button",
    align: "center",
  },
];

//display all registered user
export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const token = useSelector((state) => state.user.currentUser.authToken);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://backendecommerceapp.herokuapp.com/user",{
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  }, [refresh]);

  const deleteUser = (id) => {
    setLoading(true);
    userRequest
      .delete(`/user/${id}`)
      .then(() => {
        toast.success("user deleted successfully");
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
          <Title>Users</Title>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                  {user &&
                    user
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                                  {column.type === "time" ? (
                                    new Date(value).toDateString()
                                  ) : column.type === "button" ? (
                                    <>
                                      <Button
                                        color="error"
                                        onClick={() => deleteUser(row._id)}
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    </>
                                  ) : (
                                    value
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
              count={user.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </Container>
  );
}
