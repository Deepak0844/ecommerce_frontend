import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { after_checkout_success } from "../redux/action/cartAction";
import { Result, Button } from "antd";
import { useLocation } from "react-router";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Success() {
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = location.state?.products;

  const address = {
    address: data?.card.address_line1,
    city: data?.card.address_city,
    country: data?.card.address_country,
  };

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.loginData);
  const [orderId, setOrderId] = useState(null);
  const history = useHistory();
  useEffect(() => {
    userRequest
      .post("/order", {
        userId: currentUser?._id,
        products: cart?.product.map((item) => item),
        amount: cart?.total,
        address,
      })
      .then((res) => {
        setOrderId(res.data._id);
        dispatch(after_checkout_success());
      })
      .catch((err) => console.log(err));
  }, [dispatch, currentUser]);
  return (
    <Container>
      <Result
        status="success"
        title={orderId ? `Order has been created successfully` : `Successfull.`}
        subTitle={
          orderId
            ? `Your order number is ${orderId}`
            : ` Your order is being prepared...`
        }
        extra={[
          <Button key="back" onClick={() => history.push("/")} type="primary">
            Back to Shop
          </Button>,
          <Button onClick={() => history.push("/orders")} key="orders">
            Your Orders
          </Button>,
        ]}
      />
    </Container>
  );
}

export default Success;
