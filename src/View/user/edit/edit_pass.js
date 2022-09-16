import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import { ActionTypes } from "@mui/base";

function EditPassword(props) {
  const [result, setResult] = useState("");
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  //console.log(props);

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .test("wrong", "Wrong password", (val) => `${val}` === props.password)
      .matches(phoneRegExp, "Input is not valid")
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required password!!"),
    new_password: Yup.string()
      .matches(phoneRegExp, "Input is not valid")
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required password!!"),
    re_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords don't match!")
      .matches(phoneRegExp, "input is not valid")
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required password!!"),
  });

  //console.log(localStorage.getItem("email"));

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/user/edit.php",
      data: values,
      success(data) {
        console.log(data);
        setResult(data);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      re_new_password: "",
      emailS: localStorage.getItem("email"),
      codeS: localStorage.getItem("codeLogin"),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      setTimeout(() => {
        console.log(values);
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            password: "",
            new_password: "",
            re_new_password: "",
            emailS: localStorage.getItem("email"),
            codeS: localStorage.getItem("codeLogin"),
          },

          // you can also set the other form states here
        });

        alert("Change complete!!");
        window.location.href = link.client_link + "home";
      }, 2000);
    },
  });

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
            <i class="fa fa-id-card"></i> Change info{" "}
          </h2>

          {parseInt(result) === 0 && (
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                color: "red",
                fontStyle: "italic",
              }}
            >
              Change failed
            </h3>
          )}

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Old password
              </InputLabel>
              <TextField
                name="password"
                placeholder="Old password"
                className="form-control"
                type="password"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.password}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.password && Boolean(formik.errors?.password)
                }
                helperText={formik.touched?.password && formik.errors?.password}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                New password
              </InputLabel>
              <TextField
                name="new_password"
                placeholder="New password"
                className="form-control"
                type="password"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.new_password}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.new_password &&
                  Boolean(formik.errors?.new_password)
                }
                helperText={
                  formik.touched?.new_password && formik.errors?.new_password
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <InputLabel style={{ fontSize: 14, fontWeight: "bold" }}>
                Confirm password
              </InputLabel>
              <TextField
                name="re_new_password"
                placeholder="Confirm"
                className="form-control"
                type="password"
                variant="outlined"
                inputProps={{ style: { fontSize: 14, color: "black" } }}
                value={formik.values.re_new_password}
                style={{ marginBottom: "40px" }}
                onChange={formik.handleChange}
                error={
                  formik.touched?.re_new_password &&
                  Boolean(formik.errors?.re_new_password)
                }
                helperText={
                  formik.touched?.re_new_password &&
                  formik.errors?.re_new_password
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
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
                  {formik.isSubmitting ? "Please wait..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPassword;
