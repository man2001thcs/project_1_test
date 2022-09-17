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

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function EditAuthor() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const author_id = new URLSearchParams(search).get("author_id");
  const success = new URLSearchParams(search).get("success");
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isSubmitting, setSubmitting] = useState();

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

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/author/edit.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Change complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "author/list";
    }, 2000);
  };

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "author/list";
    }
  }, [result]);

  function edit_author(inputName, inputAddress, inputPhone, inputSpecial) {
    return (
      <div>
        <form
          action={link.server_link + "controller/author/edit.php"}
          method="post"
          onSubmit={(event) => {
            handleSubmitM(event);
          }}
        >
          <div
            class="container"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px 30px 20px",
            }}
          >
            <h2 style={{
            fontWeight: "bold",
            fontSize: '24px',
            marginBottom: '20px',
          }}><i class="fa fa-info-circle"></i> Edit author </h2>
            <div class="row">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <TextField
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
                  <TextField
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
                  <TextField
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
                  <TextField
                    name="specialization"
                    className="form-control"
                    value={inputSpecial}
                    onChange={(e) => setInputSpecial(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Change failed
                </Alert>
              )}
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

                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>{edit_author(inputName, inputAddress, inputPhone, inputSpecial)}</div>
  );
}

export default EditAuthor;
