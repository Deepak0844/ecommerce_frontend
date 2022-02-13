import React from "react";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Products from "../Components/Products";
import { mobile } from "../Responsive";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useParams } from "react-router-dom";
const Container = styled.div``;
const Title = styled.h2`
  font-weight: 400;
  margin: 10px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  margin: 20px;
  align-items: center;
  ${mobile({
    width: "0px 20px",
    display: "flex",
    flexDirection: "column",
    margin: "0px 20px",
  })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px", display: "none" })}
`;

function ProductList() {
  const { category } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <NavBar />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Colour
            </InputLabel>
            <Select
              sx={{ height: 50 }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={handleFilters}
              autoWidth
              value={filters.colour}
              name="colour"
              label="colour"
            >
              <MenuItem value="white">white</MenuItem>
              <MenuItem value="black">black</MenuItem>
              <MenuItem value="red">red</MenuItem>
              <MenuItem value="blue">blue</MenuItem>
              <MenuItem value="yellow">yellow</MenuItem>
              <MenuItem value="green">green</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Size
            </InputLabel>
            <Select
              sx={{ height: 50 }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={handleFilters}
              autoWidth
              value={filters.size}
              name="size"
              label="Size"
            >
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem defaultValue={true} value="M">
                M
              </MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
            </Select>
          </FormControl>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Sort
            </InputLabel>
            <Select
              sx={{ height: 50 }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              autoWidth
              label="sort"
            >
              <MenuItem defaultValue={true} value="newest">
                Newest
              </MenuItem>
              <MenuItem value="asc">Price (asc)</MenuItem>
              <MenuItem value="desc">Price (desc)</MenuItem>
            </Select>
          </FormControl>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
}

export default ProductList;
