import { userRequest } from "../../../requestMethod";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import "./Stats.css";

function Stats() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [lastMInc, setLastMInc] = useState(0);

  useEffect(() => {
    userRequest
      .get("order/income")
      .then((res) => {
        setLastMInc(res.data[1].total);
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Net Income</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹{lastMInc}</span>
        </div>
        <span className="featuredSub">last month income</span>
      </div>
    </div>
  );
}

export default Stats;
