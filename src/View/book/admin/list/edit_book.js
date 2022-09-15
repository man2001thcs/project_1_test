import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import bootstrap from "bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";

function EditBook() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const book_id = new URLSearchParams(search).get("book_id");
  const success = new URLSearchParams(search).get("success");
  const authorName = new URLSearchParams(search).get("author");

  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [listState3, setListState3] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isSubmitting, setSubmitting] = useState();

  const [voucher_id, setVoucher] = useState();

  /* if (book_id === "" || book_id != null ){
    window.location.href = "http://localhost:3000/book/list";
  }
  */

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


  const book = listState1?.find((element) => {
    return element?.WpBook.id === book_id;
  });

  const voucher_options = listState3?.sort(
    (a, b) => -(b?.WpVoucher.name).localeCompare(a?.WpVoucher.name)
  );
  
  console.log(voucher_options);

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element["WpAuthor"].id === author_id;
    });
  }

  function select_Voucher(voucher_options, book) {
    var temp = [];
    book?.WpBook.voucher_id?.split(";")?.map((item, index) => {
      var temp1= listState3?.find((element) => {
        return element?.WpVoucher.id === item;
      });
      temp.push(temp1);
    });
    console.log(temp);
    return (
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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
              onChange={(e, value) =>
                setVoucher(JSON.stringify(value))
              }
              limitTags={3}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField

                  {...params}             
                  placeholder={temp.map((item, index) => {
                    return item?.WpVoucher.name + '; ';
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

  const author_options = listState2
    ?.map((option) => {
      const firstLetter = option?.WpAuthor.name[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    })
    .sort((a, b) => -(b?.firstLetter).localeCompare(a?.firstLetter));

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
      alert("Change complete!!");
      setSubmitting(false);
      window.location.href = link.client_link + "book/list";
    }, 2000);
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Edit book</h1>
      {parseInt(success) === 0 && (
        <h3 style={{ color: "red" }}>Change failed</h3>
      )}
      {parseInt(success) === 1 && (
        <h3 style={{ color: "green" }}>Change successed</h3>
      )}

      <form
        action={link.server_link + "controller/book/edit.php"}
        method="post"
        onSubmit={(e) => handleSubmitM(e)}
      >
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
                  inputProps={{ style: { fontSize: 16, padding: 10 } }}
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Page number</InputLabel>
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
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Bought number</InputLabel>
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
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="form-group">
                <InputLabel style={{ fontSize: 12 }}>Remain number</InputLabel>
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

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <InputLabel style={{ fontSize: 12 }}>Author</InputLabel>
              <div class="form-group">
                <Autocomplete
                  autoHighlight
                  options={author_options}
                  groupBy={(option) => option?.firstLetter}
                  getOptionLabel={(option) => option?.WpAuthor.name}
                  isOptionEqualToValue={(option, value) =>
                    option?.WpAuthor.id === value?.WpAuthor.id
                  }
                  renderInput={(params) => (
                    <TextField
                      id="author_id"
                      name="author_id"
                      placeholder={authorName}
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {select_Voucher(voucher_options, book)}

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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

export default EditBook;
