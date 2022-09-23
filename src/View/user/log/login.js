import "bootstrap";
import { useState } from "react";
import $ from "jquery";
import Header from "../../element/header";
import * as Yup from "yup";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";

import Alert from "@mui/material/Alert";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

function Login(props) {
  const [result, setResult] = useState("-1");

  const [openLogin, setOpenLogin] = useState(false);

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  // const codeLogin = GenerateRandomCode.TextCode(8);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required"),
    passwordS: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
  });

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/user/login.php",
      data: values,
      success(data) {
        console.log(data);
        setResult(data);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      emailS: "",
      passwordS: "",
      codeS: GenerateRandomCode.TextCode(8),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      //console.log(values);
      localStorage.setItem("email", formik.values.emailS);
      localStorage.setItem("password", formik.values.passwordS);
      localStorage.setItem("codeLogin", formik.values.codeS);
      localStorage.setItem("cart", []);
      setTimeout(() => {
        //console.log(values);
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            emailS: "",
            passwordS: "",
            codeS: GenerateRandomCode.TextCode(8),
          },

          // you can also set the other form states here
        });

        //alert("Login complete!!");
        //window.location.href = link.client_link + "home";
      }, 500);
    },
  });

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Login complete!!");
      setResult("-1");
      window.location.href = link.client_link + "home";
    }
    if (parseInt(result) === 0) {
      setTimeout(() => {
        setResult("-1");
      }, 2000);
    }
  }, [result]);

  return (
    <div>
      <button
        type="button"
        class="btn btn-success btn-lg"
        onClick={() => handleClickOpenLogin()}
        style={{
          margin: "2px",
          fontWeight: "bold",
          fontSize: "14px",
          marginLeft: "30px",
        }}
      >
        Login <i class="fa fa-sign-in"></i>
      </button>
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        PaperProps={{
          sx: {
            width: "30%",
          },
        }}
      >
        <DialogContent
          style={{
            height: "700px !important",
            background: `url(${link.login_link}) center center no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px 30px 30px",
              borderRadius: "10px",
              margin: "40px 30px 30px",
            }}
          >
            <form method="post" onSubmit={formik.handleSubmit}>
              <h2 style={{ fontWeight: "bold" }}>Đăng nhập</h2>

              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Login failed, try again
                </Alert>
              )}

              <div className="input_part">
                <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                  Email
                </InputLabel>
                <TextField
                  name="emailS"
                  placeholder="Email"
                  className="form-control"
                  variant="outlined"
                  value={formik.values.emailS}
                  onChange={formik.handleChange}
                  inputProps={{ style: { fontSize: 14, color: "black" } }}
                  style={{ marginBottom: "40px" }}
                  error={
                    formik.touched?.emailS && Boolean(formik.errors?.emailS)
                  }
                  helperText={formik.touched?.emailS && formik.errors?.emailS}
                />

                <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                  Password
                </InputLabel>
                <TextField
                  name="passwordS"
                  placeholder="Password"
                  className="form-control"
                  type="password"
                  variant="outlined"
                  inputProps={{ style: { fontSize: 14, color: "black" } }}
                  value={formik.values.passwordS}
                  style={{ marginBottom: "40px" }}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.passwordS &&
                    Boolean(formik.errors?.passwordS)
                  }
                  helperText={
                    formik.touched?.passwordS && formik.errors?.passwordS
                  }
                />

                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting}
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {formik.isSubmitting ? "Please wait..." : "Login"}
                </Button>
              </div>

              <p style={{ color: "white" }}>
                Chưa có tài khoản? <span>Đăng kí </span>{" "}
                <a
                  href={link.server_link + "controller/user/sign_in.php"}
                  style={{ color: "white" }}
                >
                  ngay!
                </a>
              </p>
              <p></p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
