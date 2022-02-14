import { TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green } from "@mui/material/colors";
import { publicRequest } from "../requestMethod";
import styled from "styled-components";
import { tab } from "../Responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://raw.githubusercontent.com/Deepak0844/blogger_frontend/master/public/images/1643390361953.jpeg");
  height:100vh;
  ${tab({
    alignItems: "flex-start",
  })};
`;
const ForgotPasswordForm = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  gap: 15px;
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
const Form_H2 = styled.div`
  text-align: center;
  font-family: "poppins";
`;
const SuccessMessage = styled.div`
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
const ResetBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

//forgot password page
function ForgotPassword() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (emailVerify) => {
        verifyBtn(emailVerify);
      },
    });

  const verifyBtn = (emailVerify) => {
    setLoading(true);
    publicRequest
      .post(`/auth/forgot-password`, emailVerify)
      .then((res) => {
        setError("");
        setSuccess(res.data.message);
        // history.push("/signin");
        setLoading(false);
        console.log(res.data.message);
        // history.push("/signin");
      })
      .catch((err) => {
        // toast.error(err.response.data.message);
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Container>
      {success ? (
        <SuccessMessage>
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: "100px" }}
          />
          <h5>{success}</h5>
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="info"
            onClick={() => history.push("/signin")}
          >
            Sign In
          </Button>
        </SuccessMessage>
      ) : (
        <ForgotPasswordForm onSubmit={handleSubmit}>
          <Form_H2>Forgot Password</Form_H2>
          {error && (
            <p style={{ color: "red", marginBottom: "0px" }}>{error}</p>
          )}
          <TextField
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
            label="Enter your email"
            variant="standard"
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
          />
          <ResetBtn>
            <Button
              variant="contained"
              disabled={loading}
              color="warning"
              type="submit"
            >
              Send Password Reset Link
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[800],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </ResetBtn>
        </ForgotPasswordForm>
      )}
    </Container>
  );
}

//validation schema for email
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please Provide a valid Email")
    .required("fill the email please"),
});
export default ForgotPassword;
