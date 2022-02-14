import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data";
import { mobile } from "../Responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import BackDrop from "./BackDrop";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ paddingTop: "0px" })}
`;

function Products({ category, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        category
          ? `https://backendecommerceapp.herokuapp.com/product?category=${category}`
          : "https://backendecommerceapp.herokuapp.com/product"
      )
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  console.log(loading);
  return (
    <Container>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : loading ? (
        <BackDrop />
      ) : (
        <h4 style={{ fontFamily: "poppins" }}>no products available</h4>
      )}
    </Container>
  );
}

export default Products;

{
  /* <Container>
{filteredProducts.length === 0 ? (
  <h4 style={{ fontFamily: "poppins" }}>no products available</h4>
) : (
  filteredProducts.map((item) => <Product item={item} key={item._id} />)
)}
</Container> */
}
