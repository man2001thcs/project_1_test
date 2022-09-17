import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import { useState, useEffect } from "react";
import link from "../../../config/const";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function InputVoucher() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    threshold: Yup.number("Enter a valid number")
      .max(100000000, "Too Long!")
      .required("Required number!!"),
    number_thres: Yup.number("Enter a valid number")
      .max(100000000, "Too Long!")
      .required("Required number!!"),
    discount: Yup.number("Enter a valid number")
      .max(10000000, "Too Long!")
      .required("Required number!!"),
    discount_rate: Yup.number("Enter a valid number")
      .max(10000000, "Too Long!")
      .required("Required number!!"),
  });
  const isSubmitting = false;

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/voucher/create.php",
      data: values,
      success(data) {
        console.log(data);
        setResult(data);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      threshold: "",
      number_thres: "",
      discount: "",
      discount_rate: "",
      emailS: localStorage.getItem("email"),
      codeS: localStorage.getItem("codeLogin"),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            name: "",
            threshold: "",
            number_thres: "",
            discount: "",
            discount_rate: "",
            emailS: localStorage.getItem("email"),
            codeS: localStorage.getItem("codeLogin"),
          },
          // you can also set the other form states here
        });
        //alert("Insert complete!!");
      }, 2000);
    },
  });

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Insert complete!!");
      setResult("-1");
      window.location.href = link.client_link + "voucher/list";
    }
  }, [result]);

  return (
    <div>
      <h1>Insert Voucher</h1>
      {parseInt(success) === 0 && (
        <h3 style={{ color: "red" }}>Insert failed</h3>
      )}
      {parseInt(success) === 1 && (
        <h3 style={{ color: "green" }}>Insert successed</h3>
      )}

      <form
        action={link.server_link + "controller/voucher/create.php"}
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div
          class="container"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "30px 30px 30px",
          }}
        >
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Name</InputLabel>
                <TextField
                  name="name"
                  className="form-control"
                  variant="standard"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  error={formik.touched?.name && Boolean(formik.errors?.name)}
                  helperText={formik.touched?.name && formik.errors?.name}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Threshold</InputLabel>
                <TextField
                  name="threshold"
                  className="form-control"
                  variant="standard"
                  value={formik.values.threshold}
                  onChange={formik.handleChange}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  error={
                    formik.touched.threshold && Boolean(formik.errors.threshold)
                  }
                  helperText={
                    formik.touched.threshold && formik.errors.threshold
                  }
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>
                  Threshold number
                </InputLabel>
                <TextField
                  name="number_thres"
                  className="form-control"
                  variant="standard"
                  value={formik.values.number_thres}
                  onChange={formik.handleChange}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  error={
                    formik.touched.number_thres &&
                    Boolean(formik.errors.number_thres)
                  }
                  helperText={
                    formik.touched.number_thres && formik.errors.number_thres
                  }
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Discount</InputLabel>
                <TextField
                  name="discount"
                  className="form-control"
                  variant="standard"
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.discount && Boolean(formik.errors?.discount)
                  }
                  helperText={
                    formik.touched?.discount && formik.errors?.discount
                  }
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Discount rate</InputLabel>
                <TextField
                  name="discount_rate"
                  className="form-control"
                  variant="standard"
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  value={formik.values.discount_rate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.discount_rate &&
                    Boolean(formik.errors?.discount_rate)
                  }
                  helperText={
                    formik.touched?.discount_rate &&
                    formik.errors?.discount_rate
                  }
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Insert failed
                </Alert>
              )}
              <div className="form-group">
                <TextField
                  type="hidden"
                  name="emailS"
                  id="emailS"
                  value={localStorage.getItem("email")}
                />
                <TextField
                  type="hidden"
                  name="codeS"
                  id="codeS"
                  value={localStorage.getItem("codeLogin")}
                />
                <Button
                  type="submit"
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

export default InputVoucher;
