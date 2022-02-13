import { userRequest } from "../../requestMethod";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
// import "./Stats.css";
import styled from "styled-components";

function Stats() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [lastMInc, setLastMInc] = useState(0);

  useEffect(() => {
    userRequest
      .get("order/income")
      .then((res) => {
        setLastMInc(res.data[1]?.total);
        setIncome(res.data);
        setPerc((res.data[1]?.total * 100) / res.data[0]?.total - 100);
      })
      .catch((err) => console.log(err));
  }, []);

  const Featured = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;
  const FeaturedItem = styled.div`
    flex: 1;
    margin: 10px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: white;
  `;
  const FeaturedTitle = styled.span`
    font-size: 20px;
  `;
  const FeaturedMoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
  `;
  const FeaturedMoney = styled.span`
    font-size: 30px;
    font-weight: 600;
  `;
  const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
  `;
  const FeaturedSub = styled.span`
    font-size: 15px;
    color: gray;
  `;
  return (
    <Featured>
      <FeaturedItem>
        <FeaturedTitle>Revanue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>₹{income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
            % {Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownwardIcon
                fontSize="large"
                style={{ marginLeft: "5px" }}
                color="error"
              />
            ) : (
              <ArrowUpwardIcon
                fontSize="large"
                style={{ marginLeft: "5px" }}
                color="success"
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Net Income</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>₹{lastMInc}</FeaturedMoney>
        </FeaturedMoneyContainer>
        <FeaturedSub>last month income</FeaturedSub>
      </FeaturedItem>
    </Featured>
  );
}

export default Stats;
