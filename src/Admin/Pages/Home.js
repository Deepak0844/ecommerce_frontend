import React from "react";
import styled from "styled-components";
import ChartData from "../Components/Chart";
import NewUserTable from "../Components/NewUserTable";
import OrderTable from "../Components/OrderTable";
import Stats from "../Components/Stats";

function Home() {
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
  return (
    <Container className="table">
      <Stats />
      <ChartContainer>
        <ChartData />
      </ChartContainer>
      <TableContainer>
        <NewUserTable />
        <OrderTable />
      </TableContainer>
    </Container>
  );
}

export default Home;
