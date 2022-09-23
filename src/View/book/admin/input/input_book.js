import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import { useState, useEffect } from "react";
import axios from "axios";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function InputBook() {
  const [result, setResult] = useState("");
  const [listState2, setListState2] = useState();
  const [listState3, setListState3] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;


  //fetch data session
  const urlAuthor =
    link.server_link +
    "controller/author/log_session/user_author.json?timeStamp=" +
    GenerateRandomCode.NumCode(10);

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

  const urlVoucher =
    link.server_link +
    "controller/voucher/log_session/user_voucher.json?timeStamp=" +
    GenerateRandomCode.NumCode(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlVoucher);
        setListState3(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState3(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlVoucher, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

  //

  /*
  const author_options = listState2?.sort(
    (a, b) => -(b?.WpAuthor.name).localeCompare(a?.WpAuthor.name)
  );

  const voucher_options = listState3?.sort(
    (a, b) => -(b?.WpVoucher.name).localeCompare(a?.WpVoucher.name)
  );
  */

  //select voucher component
  function select_Voucher(voucher_options) {
    return (
      <div class="row">
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div class="form-group">
            <InputLabel style={{ fontSize: 12 }}>Voucher</InputLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={voucher_options ?? []}
              getOptionLabel={(option) => option?.WpVoucher.name}
              getOptionValue={(option) => option?.WpVoucher.name}
              onChange={(e, value) =>
                formik.setFieldValue("voucher_id", JSON.stringify(value))
              }
              isOptionEqualToValue={(option, value) =>
                option?.WpVoucher.id === value?.WpVoucher.id
              }
              limitTags={3}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Favorites" />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  //select author component
  function select_Author(author_options) {
    return (
      <div class="row">
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div class="form-group">
            <InputLabel style={{ fontSize: 12 }}>Voucher</InputLabel>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={author_options ?? []}
              getOptionLabel={(option) => option?.WpAuthor.name}
              getOptionValue={(option) => option?.WpAuthor.name}
              onChange={(e, value) =>
                formik.setFieldValue("author_id", JSON.stringify(value))
              }
              isOptionEqualToValue={(option, value) =>
                option?.WpAuthor.id === value?.WpAuthor.id
              }
              limitTags={3}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Author" />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  //validation
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),

    price: Yup.number("Enter a valid number").required("Required number!!"),

    page_number: Yup.number("Enter a valid number").required(
      "Required number!!"
    ),

    type: Yup.string().required("Required type!!"),

    bought_number: Yup.number("Enter a valid number").required(
      "Required number!!"
    ),

    remain_number: Yup.number("Enter a valid number").required(
      "Required number!!"
    ),

    description: Yup.string().required("Required description!!"),
  });

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/book/create.php",
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
      price: "",
      page_number: "",
      bought_number: "",
      remain_number: "",
      description: "",
      type: "",
      author_id: "",
      voucher_id: "",
      emailS: localStorage.getItem("email"),
      codeS: localStorage.getItem("codeLogin"),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      setTimeout(() => {
        console.log(values);
        handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            name: "",
            price: "",
            page_number: "",
            bought_number: "",
            remain_number: "",
            description: "",
            type: "",
          },

          // you can also set the other form states here
        });

        //alert("Insert complete!!");
        //window.location.href = link.client_link + "book/list";
      }, 2000);
    },
  });

  //check return status
  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Insert complete!!");
      setResult("-1");
      window.location.href = link.client_link + "book/list";
    }
  }, [result]);

  //console.log(formik.values.voucher_id);
  return (
    <div>
      <form method="post" onSubmit={formik.handleSubmit}>
        <div
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
            <i class="fa fa-book"></i> Insert new book{" "}
          </h2>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>Name</InputLabel>
                    <TextField
                      name="name"
                      className="form-control"
                      variant="standard"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      error={
                        formik.touched?.name && Boolean(formik.errors?.name)
                      }
                      helperText={formik.touched?.name && formik.errors?.name}
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>Price</InputLabel>
                    <TextField
                      name="price"
                      className="form-control"
                      variant="standard"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      error={
                        formik.touched?.price && Boolean(formik.errors?.price)
                      }
                      helperText={formik.touched?.price && formik.errors?.price}
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>
                      Page number
                    </InputLabel>
                    <TextField
                      name="page_number"
                      className="form-control"
                      variant="standard"
                      value={formik.values.page_number}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      error={
                        formik.touched.page_number &&
                        Boolean(formik.errors.page_number)
                      }
                      helperText={
                        formik.touched.page_number && formik.errors.page_number
                      }
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>
                      Bought number
                    </InputLabel>
                    <TextField
                      name="bought_number"
                      className="form-control"
                      variant="standard"
                      value={formik.values.bought_number}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      error={
                        formik.touched.bought_number &&
                        Boolean(formik.errors.bought_number)
                      }
                      helperText={
                        formik.touched.bought_number &&
                        formik.errors.bought_number
                      }
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>
                      Remain number
                    </InputLabel>
                    <TextField
                      name="remain_number"
                      className="form-control"
                      value={formik.values.remain_number}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
                      error={
                        formik.touched.remain_number &&
                        Boolean(formik.errors.remain_number)
                      }
                      helperText={
                        formik.touched.remain_number &&
                        formik.errors.remain_number
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>Type</InputLabel>
                    <TextField
                      name="type"
                      className="form-control"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
                      error={formik.touched.type && Boolean(formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div className="form-group">
                    <InputLabel style={{ fontSize: 12 }}>Content</InputLabel>
                    <TextField
                      name="description"
                      className="form-control"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </div>
                </div>
              </div>

              {select_Author(
                listState2?.sort(
                  (a, b) => -(b?.WpAuthor.name).localeCompare(a?.WpAuthor.name)
                )
              )}

              {select_Voucher(
                listState3?.sort(
                  (a, b) =>
                    -(b?.WpVoucher.name).localeCompare(a?.WpVoucher.name)
                )
              )}
            </div>

            <div class="row">
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
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
        </div>
      </form>
    </div>
  );
}

export default InputBook;
