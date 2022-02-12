import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { sliderItems } from "../data";
import { mobile } from "../Responsive";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 0 20px;
`;
const Image = styled.img`
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "25vh" })}
`;

function Slider() {
  return (
    <Container>
      <Carousel>
        {sliderItems.map((item) => (
          <Carousel.Item key={item.id} interval={3000}>
            <Image className="d-block w-100" src={item.img} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Slider;
