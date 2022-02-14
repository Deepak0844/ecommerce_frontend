import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { sliderItems } from "../data";
import { mobile } from "../Responsive";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 0 20px;
`;
const Image = styled.img`
  height: 70vh;
  object-fit: cover;
  cursor: pointer;
  ${mobile({ height: "25vh" })}
`;

function Slider() {
  const history = useHistory();
  return (
    <Container>
      <Carousel>
        {sliderItems.map((item) => (
          <Carousel.Item
            key={item.id}
            interval={3000}
            onClick={() => history.push(`/products/${item.category}`)}
          >
            <Image className="d-block w-100" src={item.img} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Slider;
