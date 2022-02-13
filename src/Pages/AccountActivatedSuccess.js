import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { publicRequest } from "../requestMethod";
import styled from "styled-components";
import { accountActivation } from "./background/backgroundImages";
import { tab } from "../Responsive";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("${accountActivation}");
  height: 100vh;
  ${tab({
    alignItems: "flex-start",
  })};
`;
const AccountActivation = styled.div`
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
//when user click the url from the email after signup to activate the account
function AccountActivatedSuccess() {
  const history = useHistory();
  const { token } = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    publicRequest
      .get(`/auth/account-verification/${token}`)
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [token]);
  return (
    <Container className="accountActivationContainer">
      <AccountActivation className="accountActivation">
        {/* when the user click the link after activating a account it shows warning */}
        {success ? ( //success ==true verified successfully message will display
          <>
            <CheckCircleOutlineIcon
              color="success"
              style={{ fontSize: "100px" }}
            />
            <h5>{success}</h5>
          </>
        ) : (
          //else link expired messsage will display
          <>
            <h3>Ecommerce App</h3>
            <WarningAmberIcon color="warning" style={{ fontSize: "80px" }} />
            <h5>Account Activation {error}</h5>
          </>
        )}
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="info"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </Button>
      </AccountActivation>
    </Container>
  );
}

export default AccountActivatedSuccess;
