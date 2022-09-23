import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import { useState, useEffect } from "react";
import link from "../../../config/const";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function InputAuthor() {
  const [result, setResult] = useState("");
  const search = useLocation().search;

  //validation form
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    phone: Yup.number("Enter a valid number").required("Required number!!"),
    address: Yup.string().required("Required address!!"),
    specialization: Yup.string()

      .min(2, "Too Short!")
      .required("Required description!!"),
  });

  //submit function
  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/author/create.php",
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
      address: "",
      phone: "",
      specialization: "",
      emailS: localStorage.getItem("email"),
      codeS: localStorage.getItem("codeLogin"),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        console.log(values);
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            name: "",
            address: "",
            phone: "",
            specialization: "",
          },

          // you can also set the other form states here
        });
        //alert("Insert complete!!");
        //window.location.href = link.client_link + "author/list";
      }, 2000);
    },
  });

  //

  //check return status
  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Insert complete!!");
      setResult("-1");
      window.location.href = link.client_link + "author/list";
    }
  }, [result]);

  return (
    <div>
      <form
        action={link.server_link + "controller/author/create.php"}
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div
          class="container"
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
            <i class="fa fa-info-circle"></i> Insert new author{" "}
          </h2>

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
                <InputLabel style={{ fontSize: 12 }}>Phone</InputLabel>
                <TextField
                  name="phone"
                  className="form-control"
                  variant="standard"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Address</InputLabel>
                <TextField
                  name="address"
                  className="form-control"
                  variant="standard"
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.address && Boolean(formik.errors?.address)
                  }
                  helperText={formik.touched?.address && formik.errors?.address}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Description</InputLabel>
                <TextField
                  name="specialization"
                  className="form-control"
                  variant="standard"
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  value={formik.values.specialization}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.specialization &&
                    Boolean(formik.errors?.specialization)
                  }
                  helperText={
                    formik.touched?.specialization &&
                    formik.errors?.specialization
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

export default InputAuthor;
