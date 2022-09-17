import "bootstrap";
import { useState } from "react";
import "../../../css/sign_in.css";
import $ from "jquery";
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

function SignIn() {
  const [result, setResult] = useState("");

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  // const codeLogin = GenerateRandomCode.TextCode(8);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required"),
    passwordS: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required password!!"),
    re_passwordS: Yup.string()
      .oneOf([Yup.ref("passwordS"), null], "Passwords don't match!")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required password!!"),
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required address!!"),
    phone_number: Yup.number("Invalid number!!").required("Required number!!"),
  });

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/user/sign_in.php",
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
      re_passwordS: "",
      fullname: "",
      phone_number: "",
      address: "",
      codeS: GenerateRandomCode.TextCode(8),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      if (formik.values.passwordS === formik.values.re_passwordS) {
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
              passwordS: "",
              re_passwordS: "",
            },

            // you can also set the other form states here
          });

          //alert("Register complete!!");
          //window.location.href = link.client_link + "login";
        }, 500);
      } else {
        alert("Register failed!!");
      }
    },
  });

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Register complete!!");
      setResult("-1");
      window.location.href = link.client_link + "login";
    }
  }, [result]);

  return (
    <div className="container">
      <form method="post" onSubmit={formik.handleSubmit}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px 30px 20px",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            <i class="fa fa-id-card"></i> Register{" "}
          </h2>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Email
              </InputLabel>
              <TextField
                name="emailS"
                placeholder="Email"
                className="form-control"
                type="text"
                variant="outlined"
                value={formik.values.emailS}
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={formik.touched?.emailS && Boolean(formik.errors?.emailS)}
                helperText={formik.touched?.emailS && formik.errors?.emailS}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
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
                  formik.touched?.passwordS && Boolean(formik.errors?.passwordS)
                }
                helperText={
                  formik.touched?.passwordS && formik.errors?.passwordS
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Re-enter Password
              </InputLabel>
              <TextField
                name="re_passwordS"
                placeholder="Re-enter password"
                className="form-control"
                type="password"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.re_passwordS}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.re_passwordS &&
                  Boolean(formik.errors?.re_passwordS)
                }
                helperText={
                  formik.touched?.re_passwordS && formik.errors?.re_passwordS
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Full name
              </InputLabel>
              <TextField
                name="fullname"
                placeholder="Full name"
                className="form-control"
                type="text"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.fullname}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.fullname && Boolean(formik.errors?.fullname)
                }
                helperText={formik.touched?.fullname && formik.errors?.fullname}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Phone number
              </InputLabel>
              <TextField
                name="phone_number"
                placeholder="Phone"
                className="form-control"
                type="text"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.phone_number}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.phone_number &&
                  Boolean(formik.errors?.phone_number)
                }
                helperText={
                  formik.touched?.phone_number && formik.errors?.phone_number
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Address
              </InputLabel>
              <TextField
                name="address"
                placeholder="Address"
                className="form-control"
                type="text"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.address}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.address && Boolean(formik.errors?.address)
                }
                helperText={formik.touched?.address && formik.errors?.address}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Register failed, account existed
                </Alert>
              )}
              <div className="form-group">
                <Button
                  type="submit"
                  style={{ fontSize: 14, fontWeight: "bold" }}
                  className="btn btn-primary"
                  disabled={formik.isSubmitting}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  {formik.isSubmitting ? "Please wait..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
