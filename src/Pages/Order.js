import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { userRequest } from "../requestMethod";
import BackDrop from "../Components/BackDrop";
import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.userId}
        </TableCell>
        <TableCell align="center">
          {new Date(row.createdAt).toDateString()}
        </TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Purchased Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell align="center">Product name</TableCell>
                    <TableCell align="center">Product image</TableCell>
                    <TableCell align="center">Order ID</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}.
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {value.title}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          src={value.image}
                          alt={value.name}
                        />
                      </TableCell>
                      <TableCell align="center">{value._id}</TableCell>
                      <TableCell align="center">
                        {value.productQuantity}
                      </TableCell>
                      <TableCell align="center">{value.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Order() {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const userId = useSelector(
    (state) => state.user?.currentUser?.loginData?._id
  );
  React.useEffect(() => {
    setLoading(true);
    userRequest
      .get(`/order/find/${userId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <BackDrop />
      ) : (
        <TableContainer sx={{ marginTop: "20px" }} component={Paper}>
          <h4 style={{ fontFamily: "poppins", padding: "10px 0px" }}>Orders</h4>
          <Table aria-label="collapsible table">
            <TableHead style={{ background: "tomato" }}>
              <TableRow>
                <TableCell style={{ width: "10px" }} />
                <TableCell align="center">User ID</TableCell>
                <TableCell align="center">Ordered At</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Total amount (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Order;
