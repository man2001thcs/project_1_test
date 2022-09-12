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

function EditBook() {
  const [result, setResult] = useState("");
  const search = useLocation().search;
  const book_id = new URLSearchParams(search).get("book_id");
  const success = new URLSearchParams(search).get("success");
  console.log(book_id);
  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [inputName, setInputName] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputPrices, setInputPrice] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputpageNum, setInputpageNum] = useState("");
  const [inputboughtNum, setInputboughtNum] = useState("");
  const [inputremainNum, setInputremainNum] = useState("");
  const [description, setDescription] = useState("");

  /* if (book_id === "" || book_id != null ){
    window.location.href = "http://localhost:3000/book/list";
  }
  */

  const urlBook =
    link.server_link +
    "controller/book/log_session/" +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" +
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

  const book = listState1?.find((element) => {
    return element?.WpBook.id === book_id;
  });

  useEffect(() => {
    setInputName(book?.WpBook.name);
    setInputPrice(book?.WpBook.price);
    setInputAuthor(book?.WpBook.author_id);
    setInputboughtNum(book?.WpBook.bought_number);
    setInputremainNum(book?.WpBook.remain_number);
    setInputpageNum(book?.WpBook.page_number);
    setDescription(book?.WpBook.description);
    setInputType(book?.WpBook.type);
  }, [book]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
    price: Yup.number()
      .required("Required number!!"),
    page_number: Yup.number()
      .required("Required number!!"),
    bought_number: Yup.number()
      .required("Required number!!"),
    remain_number: Yup.number()
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

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element.WpAuthor.id === author_id;
    });
  }

  const author_option = listState2?.map((item, index) => (
    <option value={item?.WpAuthor.id}>{item?.WpAuthor.name}</option>
  ));

  console.log(inputName);

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

  function edit_book(
    inputName,
    inputPrices,
    inputpageNum,
    inputboughtNum,
    inputremainNum,
    description,
    author_id
  ) {
    return (
      <div>
        <h1>Edit book</h1>
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
              action={link.server_link + "controller/book/edit.php"}
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
                      <label htmlFor="price">Price:</label>
                      <Field
                        name="price"
                        className="form-control"
                        type="text"
                        value={inputPrices}
                        onChange={(e) => setInputPrice(e.target.value)}
                      />
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
                        value={inputpageNum}
                        onChange={(e) => setInputpageNum(e.target.value)}
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
                        value={inputboughtNum}
                        onChange={(e) => setInputboughtNum(e.target.value)}
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
                        value={inputremainNum}
                        onChange={(e) => setInputremainNum(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="type">Type:</label>
                      <Field
                        name="type"
                        className="form-control"
                        type="text"
                        value={inputType}
                        onChange={(e) => setInputType(e.target.value)}
                      />
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        <option value={book_id} selected="selected">
                          {find_author(book?.WpBook.author_id)?.WpAuthor.name}
                        </option>
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
                        name="id"
                        id="id"
                        Value={book?.WpBook.id}
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
    <div>
      {edit_book(
        inputName,
        inputPrices,
        inputpageNum,
        inputboughtNum,
        inputremainNum,
        description,
        inputAuthor
      )}
    </div>
  );
}

export default EditBook;
