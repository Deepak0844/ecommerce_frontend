import { Add, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { mobile, tab } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethod";
import DeleteIcon from "@mui/icons-material/Delete";
import { delete_cart } from "../redux/action/cartAction";

const KEY =
  "pk_test_51KQFMRSHN4qQ71vW8vufJvEnR4IlkU0jL87HRKr6kEy3SARgPpNZBr7hUIVl5uY7dflIRaauD2PoRUVtpBCpJelC00JLySTzBB";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  ${tab({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  object-fit: cover;
  ${mobile({ width: "150px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ alignItems: "flex-start", marginLeft: "10px", marginTop: "10px" })}
`;

const ProductPricePc = styled.div`
  margin-top: 20px;
  font-size: 27px;
  display: block;
  ${mobile({
    marginBottom: "20px",
    display: "none",
  })};
`;
const ProductPriceM = styled.div`
  font-size: 17px;
  display: none;
  ${mobile({
    marginBottom: "20px",
    display: "block",
  })};
`;

const Hr = styled.hr`
  background-color: black;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h6`
  font-weight: 400;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const ProductContainer = styled.div``;
const DeleteBtn = styled.div``;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const EmptyText = styled.h3``;
const ShopBtn = styled.div`
  ${mobile({
    display: "none",
  })};
`;

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.currentUser?.loginData);
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  //cart product by user
  const cartProductByUser =
    cart && cart.product?.filter((item) => item.userId === user?._id);
  //checkout
  const makeRequest = () => {
    userRequest
      .post("/checkout/payment", {
        tokenId: stripeToken.id,
        amount: cart.total,
      })
      .then(() => {
        history.push("/success", {
          stripeData: stripeToken,
          products: cart,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    stripeToken && cart?.total >= 1 && makeRequest();
  }, [stripeToken, cart?.total, history, makeRequest]);

  const handleRemove = (id) => {
    dispatch(delete_cart(id));
  };
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>MyCart</Title>
        <Top>
          <ShopBtn>
            <Button
              onClick={() => {
                history.push("/");
              }}
              color="secondary"
              variant="outlined"
            >
              <b>CONTINUE SHOPPING</b>
            </Button>
          </ShopBtn>
          <TopTexts>
            <TopText>
              Total Item- <b>{cart ? cart.product.length : 0}</b>
            </TopText>
          </TopTexts>
        </Top>
        <CartItem>
          <Info>
            {cartProductByUser.length > 0 ? (
              cartProductByUser.map((prod, index) => (
                <ProductContainer key={index}>
                  <Product>
                    <ProductDetail>
                      <Image src={prod.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {prod.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {prod._id}
                        </ProductId>
                        <ProductColor>
                          <b>Colour:</b> {prod.colour}
                        </ProductColor>
                        <ProductSize>
                          <b>Size:</b> {prod.size}
                        </ProductSize>
                        <ProductPriceM>
                          <b>Price: </b>
                          <b>₹ </b>
                          {prod.price}
                        </ProductPriceM>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductPricePc>
                        <b>Price: </b>
                        <b>₹ </b>
                        {prod.price * prod.productQuantity}
                      </ProductPricePc>
                      <DeleteBtn>
                        <Button onClick={() => handleRemove(prod._id)}>
                          <DeleteIcon color="error" />
                        </Button>
                      </DeleteBtn>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </ProductContainer>
              ))
            ) : (
              <Empty>
                <EmptyText>Your Basket is empty</EmptyText>
                <Button onClick={() => history.push("/")}>Back to shop</Button>
              </Empty>
            )}
          </Info>
          <Summary>
            <SummaryTitle>PRICE DETAILS</SummaryTitle>
            <Hr />
            <SummaryItem>
              <SummaryItemText>
                Price ({cart ? cart.product.length : 0} items)
              </SummaryItemText>
              <SummaryItemPrice>₹ {cart ? cart.total : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Charges</SummaryItemText>
              <SummaryItemPrice>Free</SummaryItemPrice>
            </SummaryItem>

            <Hr />
            <SummaryItem type="total">
              <SummaryItemText>Total Amount</SummaryItemText>
              <SummaryItemPrice>
                <b>₹</b> {cart?.total}
              </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Deepak Shop"
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart?.total}`}
              amount={cart?.total * 100}
              token={onToken}
              stripeKey={KEY}
              currency="INR"
            >
              <Button variant="contained" color="inherit">
                CHECKOUT NOW
              </Button>
            </StripeCheckout>
          </Summary>
        </CartItem>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
