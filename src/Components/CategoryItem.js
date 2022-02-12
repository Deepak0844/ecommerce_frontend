import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  margin: 3px;
  width: 300px;
  height: 380px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Info = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  color: black;
  padding-top: 5px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 5px;
  background-color: #fb641b;
  color: white;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
`;

function CategoryItem({ item }) {
  const history = useHistory();
  return (
    <Container
      onClick={() => {
        history.push(`/products/${item.category}`);
      }}
    >
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
}

export default CategoryItem;
