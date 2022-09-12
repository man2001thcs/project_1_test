import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useLocation } from "react-router-dom";

function EditUser() {
  const [result, setResult] = useState("");
  const [loginState, setLoginState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    phone_number: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required address!!"),

    email: Yup.string().email("Invalid email").required("Required"),
  });

  console.log(localStorage.getItem("email"));

  const urlAccount = link.user_link +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" + GenerateRandomCode.NumCode(4);
  console.log(urlAccount);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlAccount);
        setLoginState(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
        setLoginState(null);
      } finally {
        setLoading(false);
      }
    };

    fetch(urlAccount, {
      method: "HEAD",
    }).then((res) => {
      if (res.status === 200) {
        getData();
      } else {
      }
    });

    setName(loginState?.fullname);
    setAddress(loginState?.address);
    setPhone(loginState?.phone_number);
  }, []);

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
      <h1>Change information</h1>
      {(parseInt(success) === 0) && (
         <h3 style={{color: "red"}}>Change information failed</h3>
      )}
      {(parseInt(success) === 1) && (
         <h3 style={{color: "green"}}>Change information successed</h3>
      )}
      <Formik
        initialValues={{
          name: loginState?.fullname,
          phone_number: loginState?.address,
          address: loginState?.phone_number,
        }}
        enableReinitialize={true}
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
                    <label htmlFor="name">Name:</label>
                    <Field name="name" className="form-control" type="text" />
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
                    <label htmlFor="phone_number">Phone number:</label>
                    <Field
                      name="phone_number"
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

export default EditUser;
