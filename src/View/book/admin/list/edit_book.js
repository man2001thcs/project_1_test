import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function EditBook() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const book_id = new URLSearchParams(search).get("book_id");
  const authorName = new URLSearchParams(search).get("author");

  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [listState3, setListState3] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isSubmitting, setSubmitting] = useState();

  const [voucher_id, setVoucher] = useState();
  const [author_id, setAuthor] = useState();

  //Data fetch session
  const urlBook =
    link.server_link +
    "controller/book/log_session/user_book.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlBook);
        setListState1(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState1(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlBook, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

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

  const urlVoucher =
    link.server_link +
    "controller/voucher/log_session/user_voucher.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

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

  const book = listState1?.find((element) => {
    return element?.WpBook.id === book_id;
  });

  const voucher_options = listState3?.sort(
    (a, b) => -(b?.WpVoucher.name).localeCompare(a?.WpVoucher.name)
  );

  const author_options = listState2?.sort(
    (a, b) => -(b?.WpAuthor.name).localeCompare(a?.WpAuthor.name)
  );

  //console.log(voucher_id);

  function select_Voucher(voucher_options, book) {
    var temp = [];
    book?.WpBook.voucher_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        var temp1 = listState3?.find((element) => {
          return element?.WpVoucher.id === item;
        });
        temp.push(temp1);
      });
    //console.log(temp);
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
              isOptionEqualToValue={(option, value) =>
                option?.WpVoucher.id === value?.WpVoucher.id
              }
              onChange={(e, value) => setVoucher(JSON.stringify(value))}
              limitTags={3}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={temp.map((item, index) => {
                    return item?.WpVoucher.name + "; ";
                  })}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  //console.log(author_id);

  function select_Author(author_options, book) {
    var temp = [];
    book?.WpBook.author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        var temp1 = listState2?.find((element) => {
          return element?.WpAuthor.id === item;
        });
        temp.push(temp1);
      });


    //console.log(temp);
    return (
      <div class="row">
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div class="form-group">
            <InputLabel style={{ fontSize: 12 }}>Author</InputLabel>

            <Autocomplete
              multiple
              id="tags-outlined"
              options={author_options ?? []}
              getOptionLabel={(option) => option?.WpAuthor.name}
              getOptionValue={(option) => option?.WpAuthor.name}
              isOptionEqualToValue={(option, value) =>
                option?.WpAuthor.id === value?.WpAuthor.id
              }
              onChange={(e, value) => setAuthor(JSON.stringify(value))}
              limitTags={3}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={temp.map((item, index) => {
                    return item?.WpAuthor.name + "; ";
                  })}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  const [inputName, setInputName] = useState(book?.WpBook.name);
  const [inputPrices, setInputPrice] = useState(book?.WpBook.price);
  const [inputType, setInputType] = useState(book?.WpBook.type);
  const [inputpageNum, setInputpageNum] = useState(book?.WpBook.page_number);
  const [inputboughtNum, setInputboughtNum] = useState(
    book?.WpBook.bought_number
  );
  const [inputremainNum, setInputremainNum] = useState(
    book?.WpBook.remain_number
  );
  const [description, setDescription] = useState(book?.WpBook.description);

  useEffect(() => {
    setInputName(book?.WpBook.name);
    setInputPrice(book?.WpBook.price);
    setInputboughtNum(book?.WpBook.bought_number);
    setInputremainNum(book?.WpBook.remain_number);
    setInputpageNum(book?.WpBook.page_number);
    setDescription(book?.WpBook.description);
    setInputType(book?.WpBook.type);
  }, [book]);

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/book/edit.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });

      setSubmitting(false);
      //window.location.href = link.client_link + "book/list";
    }, 2000);
  };

  //console.log(author_id);

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "book/list";
    }
  }, [result]);

  return (
    <div>
      <form method="post" onSubmit={(e) => handleSubmitM(e)}>
        <div
          class="container"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "30px 30px 30px",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            <i class="fa fa-book"></i> Change new book{" "}
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
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
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
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      value={inputPrices}
                      onChange={(e) => setInputPrice(e.target.value)}
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
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      value={inputpageNum}
                      onChange={(e) => setInputpageNum(e.target.value)}
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
                      value={inputboughtNum}
                      onChange={(e) => setInputboughtNum(e.target.value)}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
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
                      value={inputremainNum}
                      onChange={(e) => setInputremainNum(e.target.value)}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
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
                      value={inputType}
                      onChange={(e) => setInputType(e.target.value)}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      inputProps={{ style: { fontSize: 16, padding: 10 } }}
                      variant="standard"
                    />
                  </div>
                </div>
              </div>

              {select_Author(author_options, book)}

              {select_Voucher(voucher_options, book)}
            </div>

            <div class="row">
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
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
                    Value={book?.WpBook.id}
                  />
                  <input
                    type="hidden"
                    name="voucher_id"
                    id="voucher_id"
                    Value={voucher_id}
                  />
                  <input
                    type="hidden"
                    name="author_id"
                    id="author_id"
                    Value={author_id}
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
        </div>
      </form>
    </div>
  );
}

export default EditBook;
