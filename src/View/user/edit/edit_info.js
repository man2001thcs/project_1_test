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
import Alert from "@mui/material/Alert";

function EditUser(props) {
  const [result, setResult] = useState("");

  //console.log(props);

  const SignupSchema = Yup.object().shape({
    name: Yup.string("Invalid string!!").required("Required name!!"),
    phone_number: Yup.number("Invalid number!!").required("Required number!!"),
    address: Yup.string("Invalid string!!").required("Required address!!"),
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
      fullname: props.fullname,
      phone_number: props.phone_number,
      address: props.address,
      emailS: localStorage.getItem("email"),
      codeS: localStorage.getItem("codeLogin"),
    },

    onSubmit: (values, actions) => {
      console.log(values);
      setTimeout(() => {
        console.log(values);
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            fullname: props.fullname,
            phone_number: props.phone_number,
            address: props.address,
            emailS: localStorage.getItem("email"),
            codeS: localStorage.getItem("codeLogin"),
          },

          // you can also set the other form states here
        });

        //alert("Change complete!!");
      }, 2000);
    },
  });

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "home";
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
            <i class="fa fa-id-card"></i> Change info{" "}
          </h2>

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
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Change failed
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

export default EditUser;
