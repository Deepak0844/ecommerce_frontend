import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../Responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 10px;
  ${mobile({ padding: "0px", justifyContent: "center", gap: "10px" })};
`;
const Title = styled.h4`
  font-family: "poppins";
  padding: 10px;
`;
function Categories() {
  return (
    <>
      <Title>Categories</Title>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
}

export default Categories;
