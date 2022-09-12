import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import link from "../../../../config/const";
import { useLocation } from "react-router-dom";
import GenerateRandomCode from "react-random-code-generator";


function InputBook() {
  const [result, setResult] = useState("");
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  const urlAuthor = link.server_link +
    "controller/author/log_session/user_author.json?timeStamp=" + GenerateRandomCode.NumCode(4);

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

  //console.log(listState2);

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element["WpAuthor"].id === author_id;
    });
  }

  const author_option = listState2
    ?.map((item, index) => (
      <option value={item?.WpAuthor.id}>{item?.WpAuthor.name}</option>
    ));

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    price: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    page_number: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    bought_number: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    remain_number: Yup.number()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required number!!"),
    description: Yup.string()
      .min(2, "Too Short!")
      .required("Required description!!"),
    author_id: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
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
      <h1>Insert new book</h1>
      {(parseInt(success) === 0) && (
         <h3 style={{color: "red"}}>Insert failed</h3>
      )}
      {(parseInt(success) === 1) && (
         <h3 style={{color: "green"}}>Insert successed</h3>
      )}
      <Formik
        initialValues={{
          name: "",
          price: "",
          page_number: "",
          bought_number: "",
          remain_number: "",
          description: "",
          author_id: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(event) => {
          handleSumbit(event);
        }}
      >
        {({ errors, touched }) => (
          <form
            action={link.server_link + "controller/book/create.php"}
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
                    <label htmlFor="price">Price:</label>
                    <Field name="price" className="form-control" type="text" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="page_number">Page number:</label>
                    <Field
                      name="page_number"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="bought_number">Bought number:</label>
                    <Field
                      name="bought_number"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="remain_number">Remain number:</label>
                    <Field
                      name="remain_number"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <Field name="type" className="form-control" type="text" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label htmlFor="description">Content:</label>
                    <Field
                      name="description"
                      className="form-control"
                      as="textarea"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="form-group">
                    <label for="author_id">Author:</label>

                    <select
                      name="author_id"
                      id="author_id"
                      class="form-control"
                    >
                      <option value="none">-- Select One --</option>
                      {author_option}
                    </select>
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

export default InputBook;
