import React from "react";
import styled from "styled-components";
import {
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { mobile, tab } from "../Responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  signupStarts,
  signupSuccess,
  signupFailed,
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
  background-image: linear-gradient(
    to right bottom,
    #aa427d,
    #9d4589,
    #8c4994,
    #784e9d,
    #5f53a4,
    #4a5eab,
    #3067b0,
    #006fb1,
    #007dad,
    #00858f,
    #00885e,
    #3c8727
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

  ${mobile({ display: "none" })}
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
  max-width: 600px;
  width: 100%;
  height: 450px;
  height: 600px;
  object-fit: cover;
  ${tab({ height: "450px" })}
`;
const Error = styled.h6`
  color: white;
  background: red;
  padding: 5px;
  text-align: center;
`;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newUser) => {
        signUp(newUser);
      },
    });

  const signUp = (newUser) => {
    dispatch(signupStarts());
    const { confirmPassword, ...other } = newUser;
    publicRequest
      .post("/auth/signup", other)
      .then((res) => dispatch(signupSuccess()))
      .catch((err) => dispatch(signupFailed(err.response.data.message)));
  };
  return (
    <Container>
      <WrapperLeft>
        <Image src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-page-1886582-1598253.png"></Image>
      </WrapperLeft>
      <WrapperRight>
        <Title>Sign Up</Title>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User Name"
            color="secondary"
            variant="standard"
            id="userName"
            value={values.userName}
            error={errors.userName && touched.userName}
            helperText={errors.userName && touched.userName && errors.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          ></TextField>
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
            color="secondary"
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
                    onClick={() => setShowPassword(!showPassword)}
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

          <FormControl
            error={errors.confirmPassword && touched.confirmPassword}
            fullWidth
            variant="standard"
            color="secondary"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText color="error" id="component-error-text">
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Button
            style={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isFetching}
          >
            Sign Up{isFetching && <Spinner />}
          </Button>
        </Form>
      </WrapperRight>
    </Container>
  );
}

//validation schema
const formValidationSchema = yup.object({
  userName: yup.string().required("please fill the User Name"),
  email: yup
    .string()
    .email("please provide valid email")
    .required("please fill the Email"),
  password: yup
    .string()
    .required("please fill the Password")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /[a-z]/,
      "Password should contain at least one lower caser case letter"
    )
    .matches(
      /[A-Z]/,
      "Password should contain at least one upper caser case letter"
    )
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?~]/,
      "Password should contain at least one non-alphanumeric character (@,!,#,etc)"
    ),
  confirmPassword: yup
    .string()
    .required("please fill the confirm password")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /[a-z]/,
      "Password should contain at least one lower caser case letter"
    )
    .matches(
      /[A-Z]/,
      "Password should contain at least one upper caser case letter"
    )
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?~]/,
      "Password should contain at least one non-alphanumeric character (@,!,#,etc)"
    )
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});
export default SignUp;
// background-image: url("https://www.tata.com/content/dam/tata/images/careers/desktop/tgip_overview2_banner_desktop_1920x1080.jpg");
// box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
// background: white;
