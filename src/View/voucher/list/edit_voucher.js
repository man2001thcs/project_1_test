import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
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

function EditVoucher() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const voucher_id = new URLSearchParams(search).get("voucher_id");
  const success = new URLSearchParams(search).get("success");
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [inputName, setInputName] = useState("");
  const [inputThreshold, setInputThreshold] = useState("");
  const [inputThresholdnum, setInputThresholdnum] = useState("");
  const [inputDiscount, setInputDiscount] = useState("");
  const [inputDiscountR, setInputDiscountR] = useState("");

  const [isSubmitting, setSubmitting] = useState("");

  /* if (book_id === "" || book_id != null ){
    window.location.href = "http://localhost:3000/book/list";
  }
  */

  const urlVoucher =
    link.server_link +
    "controller/voucher/log_session/user_voucher.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlVoucher);
        setListState2(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState2(null);
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

  const voucher = listState2?.find((element) => {
    return element?.WpVoucher.id === voucher_id;
  });

  useEffect(() => {
    setInputName(voucher?.WpVoucher.name);
    setInputThreshold(voucher?.WpVoucher.threshold);
    setInputThresholdnum(voucher?.WpVoucher.number_thres);
    setInputDiscount(voucher?.WpVoucher.discount);
    setInputDiscountR(voucher?.WpVoucher.discount_rate);
  }, [voucher]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    threshold: Yup.number("Enter a valid number")
      .max(10, "Too Long!")
      .required("Required number!!"),
    discount: Yup.number("Enter a valid number")
      .max(10, "Too Long!")
      .required("Required number!!"),
    discount_rate: Yup.number("Enter a valid number")
      .max(10, "Too Long!")
      .required("Required number!!"),
  });

  const handleSubmit = (values) => {
    $.ajax({
      type: "POST",
      url: link.server_link + "controller/voucher/edit.php",
      data: values,
      success(data) {
        console.log(data);
        setResult(data);
      },
    });
  };

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/voucher/edit.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Change complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "voucher/list";
    }, 2000);
  };

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "voucher/list";
    }
  }, [result]);

  return (
    <div>
      <h1>Voucher edit</h1>
      {parseInt(success) === 0 && (
        <h3 style={{ color: "red" }}>Change failed</h3>
      )}
      {parseInt(success) === 1 && (
        <h3 style={{ color: "green" }}>Change successed</h3>
      )}

      <form method="post" onSubmit={(e) => handleSubmitM(e)}>
        <div
          class="container"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "30px 30px 30px",
          }}
        >
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Name</InputLabel>
                <TextField
                  name="name"
                  className="form-control"
                  variant="standard"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Threshold</InputLabel>
                <TextField
                  name="threshold"
                  className="form-control"
                  variant="standard"
                  value={inputThreshold}
                  onChange={(e) => setInputThreshold(e.target.value)}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>
                  Threshold number
                </InputLabel>
                <TextField
                  name="number_thres"
                  className="form-control"
                  variant="standard"
                  value={inputThresholdnum}
                  onChange={(e) => setInputThresholdnum(e.target.value)}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Discount</InputLabel>
                <TextField
                  name="discount"
                  className="form-control"
                  variant="standard"
                  value={inputDiscount}
                  onChange={(e) => setInputDiscount(e.target.value)}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Discount rate</InputLabel>
                <TextField
                  name="discount_rate"
                  className="form-control"
                  variant="standard"
                  value={inputDiscountR}
                  onChange={(e) => setInputDiscountR(e.target.value)}
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {parseInt(result) === 0 && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  Register failed, account existed
                </Alert>
              )}
              <div className="form-group">
                <input
                  type="hidden"
                  name="id"
                  id="id"
                  Value={voucher?.WpVoucher.id}
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

export default EditVoucher;
