import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styled from "styled-components";
import { passwordChangedSuccess } from "./background/backgroundImages";
import { tab } from "../Responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("${passwordChangedSuccess}");
  height: 100vh;
  ${tab({
    alignItems: "flex-start",
  })};
`;
const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 400px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.1px);
  -webkit-backdrop-filter: blur(5.1px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  ${tab({
    marginTop: "20%",
  })};
`;
//after successfully password changed
function PasswordChangedSuccess() {
  const history = useHistory();

  return (
    <Container>
      <Success>
        <CheckCircleOutlineIcon color="success" style={{ fontSize: "100px" }} />
        <h5>Password Changed Successfully</h5>
        <p>You can login with your new password</p>

        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="info"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </Button>
      </Success>
    </Container>
  );
}

export default PasswordChangedSuccess;
