import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { mobile } from "../Responsive";
import { useParams } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../redux/action/cartAction";
import { useHistory } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "15px 10px" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h2`
  font-weight: 400;
  font-weight: bold;
  ${mobile({ marginTop: "10px" })}
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.h2`
  font-weight: 400;
  font-size: 40px;
  ${mobile({ fontSize: "25px" })}
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  width: 50%;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonContainer = styled.div`
  dispaly: flex;
  justify-content: center;
  text-align: center;
  width: 50%;
  ${mobile({ width: "100%" })}
`;

function Product() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const user = useSelector((state) => state?.user.currentUser?.loginData);
  useEffect(() => {
    publicRequest
      .get(`/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const [disable, setDisable] = useState(false);
  const addToCart = () => {
    user
      ? dispatch(
          add_to_cart({
            ...product,
            colour,
            size,
            productQuantity,
            userId: user?._id,
          })
        )
      : history.push("/signin");
    setDisable(true);
  };

  return (
    <Container>
      <NavBar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>₹ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Colour
                </InputLabel>
                <Select
                  sx={{ height: 50 }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  autoWidth
                  label="colour"
                >
                  {product.colour &&
                    product.colour.map((clr) => (
                      <MenuItem value={clr} key={clr}>
                        {clr}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Filter>
            <Filter>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Size
                </InputLabel>
                <Select
                  sx={{ height: 50 }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  autoWidth
                  label="Age"
                >
                  {product.size &&
                    product.size.map((size) => (
                      <MenuItem value={size} key={size}>
                        {size}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Filter>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Qty
              </InputLabel>
              <Select
                sx={{ height: 50 }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                autoWidth
                label="Qty"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </FilterContainer>
          <ButtonContainer>
            <Button
              disabled={disable}
              onClick={addToCart}
              color="success"
              variant="contained"
            >
              Add To Cart
            </Button>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Product;
