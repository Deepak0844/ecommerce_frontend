import React from "react";
import styled from "styled-components";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Products from "../Components/Products";
import Slider from "../Components/Slider";

const Container = styled.div``;
function Home() {
  return (
    <Container>
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <Footer />
    </Container>
  );
}

export default Home;
