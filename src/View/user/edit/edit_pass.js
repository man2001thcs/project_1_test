import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useLocation } from "react-router-dom";

function EditPassword() {
  const [result, setResult] = useState("");
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .matches(phoneRegExp, "Password is not valid")
      .required("Required password!!"),
    new_password: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .matches(phoneRegExp, "Password is not valid")
      .required("Required new password!!"),
    new_password_re: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .oneOf([Yup.ref("new_password"), null], "Passwords don't match!")
      .matches(phoneRegExp, "Password is not valid")
      .required("Required new password to be re-entered!!"),
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

  console.log(localStorage.getItem("email"));

  return (
    <div>
      <h1>Signup</h1>
      {(success === 0) && (
         <h2>Change information failed</h2>
      )}
      {(success === 1) && (
         <h2>Change information successed</h2>
      )}
      <Formik
        initialValues={{
          password: "",
          new_password: "",
          new_password_re: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(event) => {
          handleSumbit(event);
        }}
      >
        {({ errors, touched }) => (
          <form
            action={link.server_link + "controller/user/edit.php"}
            method="post"
          >
            <div>
              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="password">Old password:</label>
                    <Field
                      name="password"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="new_password">New password:</label>
                    <Field
                      name="new_password"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="new_password_re">
                      New password re-enter:
                    </label>
                    <Field
                      name="new_password_re"
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

export default EditPassword;
