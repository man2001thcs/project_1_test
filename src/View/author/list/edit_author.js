import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function EditAuthor() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const author_id = new URLSearchParams(search).get("author_id");
  const success = new URLSearchParams(search).get("success");
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputSpecial, setInputSpecial] = useState("");

  /* if (book_id === "" || book_id != null ){
    window.location.href = "http://localhost:3000/book/list";
  }
  */

  const urlAuthor =
    link.server_link +
    "controller/author/log_session/user_author.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlAuthor);
        setListState2(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState2(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlAuthor, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

  const author = listState2?.find((element) => {
    return element?.WpAuthor.id === author_id;
  });

  useEffect(() => {
    setInputName(author?.WpAuthor.name);
    setInputAddress(author?.WpAuthor.address);
    setInputPhone(author?.WpAuthor.phone);
    setInputSpecial(author?.WpAuthor.specialization);
  }, [author]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    address: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    phone: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    specialization: Yup.string()
      .min(2, "Too Short!")
      .required("Required description!!"),
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

  function edit_author(inputName, inputAddress, inputPhone, inputSpecial) {
    return (
      <div>
        <h1>Author edit</h1>
        {parseInt(success) === 0 && (
          <h3 style={{ color: "red" }}>Change failed</h3>
        )}
        {parseInt(success) === 1 && (
          <h3 style={{ color: "green" }}>Change successed</h3>
        )}
        <Formik
          validationSchema={SignupSchema}
          onSubmit={(event) => {
            handleSumbit(event);
          }}
        >
          {({ errors, touched }) => (
            <form
              action={link.server_link + "controller/author/edit.php"}
              method="post"
            >
              <div>
                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <Field
                        name="name"
                        className="form-control"
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
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
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="phone">Phone:</label>
                      <Field
                        name="phone"
                        className="form-control"
                        type="text"
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="specialization">Description:</label>
                      <Field
                        name="specialization"
                        className="form-control"
                        as="textarea"
                        value={inputSpecial}
                        onChange={(e) => setInputSpecial(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        Value={author?.WpAuthor.id}
                      />
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

  return (
    <div>{edit_author(inputName, inputAddress, inputPhone, inputSpecial)}</div>
  );
}

export default EditAuthor;
