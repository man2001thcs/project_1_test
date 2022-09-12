import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import link from "../../../config/const";
import { useLocation } from "react-router-dom";

function InputAuthor() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    phone: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required address!!"),
    specialization: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required description!!"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const isSubmitting = false;

  const handleSumbit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
  };

  return (
    <div>
      <h1>Insert author</h1>
      {(parseInt(success) === 0) && (
         <h3 style={{color: "red"}}>Insert failed</h3>
      )}
      {(parseInt(success) === 1) && (
         <h3 style={{color: "green"}}>Insert successed</h3>
      )}
      <Formik
        initialValues={{
          name: "",
          address: "",
          phone: "",
          specialization: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(event) => {
          handleSumbit(event);
        }}
      >
        {({ errors, touched }) => (
          <form
            action={
              link.server_link +
              "controller/author/create.php"
            }
            method="post"
          >
            <div>
              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field name="name" className="form-control" type="text" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <Field name="phone" className="form-control" type="text" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <Field
                      name="address"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="specialization">Specialization:</label>
                    <Field
                      name="specialization"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <input
                      type="hidden"
                      name="emailS"
                      id="emailS"
                      Value={localStorage.getItem("email")}
                    />
                    <input
                      type="hidden"
                      name="codeS"
                      id="codeS"
                      Value={localStorage.getItem("codeLogin")}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Please wait..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default InputAuthor;
