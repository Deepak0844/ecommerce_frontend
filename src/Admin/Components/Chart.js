import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { userRequest } from "../../requestMethod";

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  background: white;
`;

function ChartData() {
  const [chart, setChart] = useState([]);
  const months = [
    "jan",
    "feb",
    "march",
    "apr",
    "may",
    "jun",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  useEffect(() => {
    userRequest
      .get("user/stats")
      .then((res) =>
        res.data.map((dt) => {
          setChart((prev) => [
            ...prev,
            { name: months[dt._id - 1], "Active User": dt.total },
          ]);
        })
      )
      .catch((err) => console.log(err.response.data.message));
  }, []);
  return (
    <Container style={{ padding: "10px", border: "none" }}>
      {chart && (
        <Chart data={chart} title="User Analytics" grid dataKey="Active User" />
      )}
    </Container>
  );
}

function Chart({ title, data, dataKey, grid }) {
  return (
    <Container>
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default ChartData;
