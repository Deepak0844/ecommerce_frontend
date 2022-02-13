import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { resetPasswordBackground } from "./background/backgroundImages";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 10px;
  background-image: url("${resetPasswordBackground}");
`;
const ResetPasswordInput = styled.form`
  background: rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.1px);
  -webkit-backdrop-filter: blur(5.1px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 15px;
  max-width: 500px;
  margin-top: 20%;
`;
const ResetPasswordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
const InvalidPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 10%;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.1px);
  -webkit-backdrop-filter: blur(5.1px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  width: 500px;
  padding: 10px;
  ${mobile({
    width: "100%",
  })};
`;
const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const InvalidPage_h5 = styled.h5`
  text-align: center;
  font-family: "poppins ";
`;
const InvalidPage_Btn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const URL = "https://backendecommerceapp.herokuapp.com";
//reset password -when user click a link from mail after forgot password process
function ResetPassword() {
  const history = useHistory();
  const { token } = useParams();

  const [response, setResponse] = useState(false); //to verify token is matched or not
  const [loading, setLoading] = useState(false);

  //validation
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    axios
      .get(`${URL}/auth/forgot-password/verify`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setResponse(true);
        console.log(res.data);
      })
      .catch((err) => {
        setResponse(false);
        console.log(err.response.data.message);
      });
  }, [token]);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        confirmPassword: "",
        password: "",
        token: token,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newPassword) => {
        verifyBtn(newPassword);
      },
    });

  const verifyBtn = (newPassword) => {
    setLoading(true);
    const { confirmPassword, ...others } = newPassword;

    console.log(others);
    axios
      .post(`${URL}/auth/change-password`, others)
      .then(() => {
        setLoading(false);
        history.push("/passwordchanged-Successfully");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      {response ? ( //response ok text fiels will display
        <ResetPasswordWrapper>
          <ResetPasswordInput onSubmit={handleSubmit}>
            <DialogTitle
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: "30px",
              }}
            >
              Change Password
            </DialogTitle>
            <FormControl
              margin="dense"
              fullWidth
              error={errors.password && touched.password}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
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
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText color="error" id="component-error-text">
                {errors.password && touched.password && errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl
              margin="dense"
              fullWidth
              error={errors.confirmPassword && touched.confirmPassword}
              variant="outlined"
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              <FormHelperText color="error" id="component-error-text">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <SubmitBtn>
              <Button
                variant="contained"
                disabled={loading}
                color="success"
                type="submit"
              >
                Change Password{" "}
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
            </SubmitBtn>
          </ResetPasswordInput>
        </ResetPasswordWrapper>
      ) : (
        //else link no longer message will display
        <InvalidPage className="invalidPage">
          <ErrorOutlineOutlinedIcon
            color="error"
            style={{ fontSize: "50px" }}
          />
          <InvalidPage_h5>
            Sorry, your password reset link is no longer valid.
          </InvalidPage_h5>
          <InvalidPage_Btn>
            <Button
              onClick={() => history.push("/forgot-password")}
              color="warning"
            >
              Forgot password
            </Button>
            <Button onClick={() => history.push("/signin")} color="info">
              Sign In
            </Button>
          </InvalidPage_Btn>
        </InvalidPage>
      )}
    </Container>
  );
}
// password validation schema
const formValidationSchema = yup.object({
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

export default ResetPassword;
