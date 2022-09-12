import "bootstrap";
import { useState } from "react";
import "../../../css/login.css";
import $ from "jquery";
import Header from "../../element/header";
import * as Yup from "yup";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const search = useLocation().search;
  const sign = new URLSearchParams(search).get("sign");
  const success = new URLSearchParams(search).get("success");

  const [result, setResult] = useState("");

  const codeLogin = GenerateRandomCode.TextCode(8);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required"),
    passwordS: Yup.string()
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("login_code", codeLogin);
    localStorage.setItem("cart", []);
  }, []);

  function click_button() {
    localStorage.setItem("codeLogin", codeLogin);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("cart", []);
    setTimeout(() => {
      Header.forceUpdate();
    }, 3000);
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    localStorage.setItem("codeLogin", codeLogin);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
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
          <h1 class="panel-title">Login</h1>
        </div>
        <div class="panel-body">
          <div class="row">
            <div
              class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
              style={{ backgroundColor: "#303134" }}
            >
              <div class="page-header">
              {(parseInt(sign) !== 1 && parseInt(sign) !== 2 && parseInt(sign) !== 3) &&(
                  <h3 style={{ color: "white" }}>Please login</h3>
                )}
                {(parseInt(sign) === 1) && (
                  <h3 style={{ color: "white" }}>Registration success, please login</h3>
                )}
                {(parseInt(success) === 0) && (
                  <h3 style={{ color: "white" }}>Login failed</h3>
                )}
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="login">
                <div className="form">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(event) => {
                      handleSumbit(event);
                    }}
                  >
                    {({ errors, touched }) => (
                      <form
                        action={link.server_link + "controller/user/login.php"}
                        method="post"                       
                      >
                        <h2>Đăng nhập</h2>
                        <Field
                          name="emailS"
                          placeholder="Email"
                          className="form-control"
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Field
                          name="passwordS"
                          placeholder="Password"
                          className="form-control"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                          type="hidden"
                          name="codeLogin"
                          id="codeLogin"
                          Value={codeLogin}
                        />
                        <input
                          type="submit"
                          Value="Sign In"
                          className="login_button"
                          onClick={() => click_button()}
                        />

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

export default Login;
