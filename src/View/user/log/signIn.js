import "bootstrap";
import { useState } from "react";
import "../../../css/logout.css";
import $ from "jquery";
import Header from "../../element/header";
import * as Yup from "yup";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const search = useLocation().search;
  const sign = new URLSearchParams(search).get("sign");

  const [result, setResult] = useState("");

  const codeLogin = GenerateRandomCode.TextCode(4);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required"),
    passwordS: Yup.string()
      .matches(phoneRegExp, "Password is not valid")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    re_passwordS: Yup.string()
      .oneOf([Yup.ref("passwordS"), null], "Passwords don't match!")
      .matches(phoneRegExp, "Password is not valid")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    localStorage.setItem("login_code", "");
    localStorage.setItem("cart", []);
  }, []);

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
    <div className="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h1 class="panel-title">Sign in</h1>
        </div>
        <div class="panel-body">
          <div class="row">
            <div
              class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
              style={{ backgroundColor: "#303134" }}
            >
              <div class="page-header">
                {(parseInt(sign) !== 1 && parseInt(sign) !== 2 && parseInt(sign) !== 3) &&(
                  <h3 style={{ color: "white" }}>Please register</h3>
                )}
                
                {parseInt(sign) === 2 && (
                  <h3 style={{ color: "white" }}>
                    Account has already existed
                  </h3>
                )}
                {parseInt(sign) === 3 && (
                  <h3 style={{ color: "white" }}>
                    Registation failed. Please try again
                  </h3>
                )}
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="login">
                <div className="form">
                  <Formik
                    initialValues={{
                      emailS: "",
                      passwordS: "",
                      re_passwordS: "",
                      fullname: "",
                      address: "",
                      phone_number: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(event) => {
                      handleSumbit(event);
                    }}
                  >
                    {({ errors, touched }) => (
                      <form
                        action={
                          link.server_link + "controller/user/sign_in.php"
                        }
                        method="post"
                      >
                        <h2>Sign in</h2>
                        <Field
                          name="emailS"
                          placeholder="Email"
                          className="form-control"
                          type="text"
                        />
                        <Field
                          name="passwordS"
                          placeholder="Password"
                          className="form-control"
                          type="password"
                        />
                        <Field
                          name="re_passwordS"
                          placeholder="Re-enter Password"
                          className="form-control"
                          type="password"
                        />
                        <Field
                          name="fullname"
                          placeholder="Name"
                          className="form-control"
                          type="text"
                        />
                        <Field
                          name="address"
                          placeholder="Address"
                          className="form-control"
                          type="text"
                        />
                        <Field
                          name="phone_number"
                          placeholder="Phone number"
                          className="form-control"
                          type="text"
                        />
                        <input
                          type="submit"
                          Value="Sign In"
                          className="login_button"
                        />
                        <p></p>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
