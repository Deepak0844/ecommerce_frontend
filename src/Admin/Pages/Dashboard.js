import React from "react";
import styled from "styled-components";
import ChartData from "../Components/Chart";
import NewUserTable from "../Components/NewUserTable";
import OrderTable from "../Components/OrderTable";
import Stats from "../Components/Stats";
import { useSelector } from "react-redux";

const Container = styled.div``;
const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: none !important;
`;
const ChartContainer = styled.div`
  margin: 10px 10px;
  border: none !important;
`;

function Dashboard() {
  const token = useSelector((state) => state.user.currentUser.authToken);
  return (
    <Container className="table">
      <Stats token={token} />
      <ChartContainer>
        <ChartData token={token} />
      </ChartContainer>
      <TableContainer>
        <NewUserTable token={token} />
        <OrderTable token={token} />
      </TableContainer>
    </Container>
  );
}

export default Dashboard;
