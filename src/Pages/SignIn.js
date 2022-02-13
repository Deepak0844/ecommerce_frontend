import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { tab, mobile } from "../Responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStarts,
  loginSuccess,
  loginFailed,
} from "../redux/action/userAction";
import { publicRequest } from "../requestMethod";
import Spinner from "../Components/Spinner";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 10px;
  padding: 10px;
  background: skyblue;
  background-image: linear-gradient(
    to right top,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
  ${tab({
    flexDirection: "column",
    justifyContent: "flex-start",
  })}
  ${mobile({
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
  })}
`;
const WrapperRight = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 10px;
  ${tab({ paddingTop: "0px" })}
  ${mobile({
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: " blur(5px)",
    webkitBackdropFilter: " blur(5px)",
    border: " 1px solid rgba(255, 255, 255, 0.3)",
  })}
`;
const WrapperLeft = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  ${mobile({ display: "none" })};
`;
const Title = styled.h2`
  text-align: center;
  padding: 10px 0;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const Image = styled.img`
  max-width: 500px;
  width: 100%;
  height: 300px;
  object-fit: cover;
  ${tab({ height: "300px" })};
`;
const Error = styled.h6`
  color: white;
  background: red;
  padding: 5px;
  text-align: center;
`;
const SignInBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ForotPassBtn = styled.p`
  margin: 0;
  font-family: "poppins";
  padding: 0;
`;
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (signinUser) => {
        signIn(signinUser);
      },
    });

  const signIn = (signinUser) => {
    dispatch(loginStarts());
    publicRequest
      .post("/auth/signin", signinUser)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        history.push("/");
      })
      .catch((err) => {
        dispatch(loginFailed(err.response.data.message));
      });
  };
  return (
    <Container>
      <WrapperLeft>
        <Image src="https://cdni.iconscout.com/illustration/premium/thumb/user-showing-user-login-page-in-website-or-application-1886527-1597938.png" />
      </WrapperLeft>
      <WrapperRight>
        <Title>Sign In</Title>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            color="secondary"
            variant="standard"
            id="email"
            value={values.email}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></TextField>
          <FormControl
            error={errors.password && touched.password}
            fullWidth
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText color="error" id="component-error-text">
              {errors.password && touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            style={{
              marginTop: "10px",
            }}
            disabled={isFetching}
            variant="contained"
            color="secondary"
          >
            Sign In {isFetching && <Spinner />}
          </Button>
          <SignInBtn>
            <p style={{ margin: 0, display: "inline" }}>
              Don't have an account?
              <Button
                style={{ color: "white", textDecoration: "underLine" }}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </p>
            <Button
              color="warning"
              onClick={() => {
                history.push("/forgot-password");
              }}
            >
              <ForotPassBtn>Forgot Password?</ForotPassBtn>
            </Button>
            <Button onClick={() => history.push("/admin/signin")} color="error">
              Login as Admin
            </Button>
          </SignInBtn>
        </Form>
      </WrapperRight>
    </Container>
  );
}
//validation schema
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide valid email")
    .required("please fill the Email"),
  password: yup.string().required("please fill the Password"),
});

export default SignIn;
