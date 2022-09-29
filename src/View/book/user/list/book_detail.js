import { useState, useEffect } from "react";
import React from "react";
import "bootstrap";
import $ from "jquery";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BookComU from "../home/book_com";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import "../../../../css/card_detail.css";
import "../../../../css/quantity_button.css";
import { Zoom, Fade } from "react-slideshow-image";
import "../../../../css/image_slide_styles.css";

function BookDes(props) {
  const [result, setResult] = useState("");
  const [valueNumber, setValueNumber] = useState(1);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const nl2br = require("react-nl2br");

  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [listState3, setListState3] = useState();

  const [imageLink, setImageLink] = useState([]);

  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };

  const [toggleInfo, setToggle] = useState(true);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [discount_id, setDiscount_id] = useState();
  const [discount_rate, setDiscount] = useState(0);
  const [item_n, setItemN] = useState(0);

  //fetch data
  const urlBook =
    link.book_link +
    "user_book.json?timeStamp=" +
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

  const urlVoucher =
    link.voucher_link +
    "user_voucher.json?timeStamp=" +
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

  const urlAuthor =
    link.author_link +
    "user_author.json?timeStamp=" +
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
  //

  const book = listState1?.find((element) => {
    return element.WpBook.id === id;
  });
  console.log(imageLink);

  useEffect(() => {
    var images = [];
    for (var i = 1; i <= book?.WpBook.image_number; i++) {
      images.push(
        link.image_link +
          book?.WpBook.id +
          "/" +
          i +
          ".jpg?timeStamp=" +
          GenerateRandomCode.NumCode(4)
      );
    }
    console.log(book?.WpBook.image_number);
    setImageLink(images);
  }, [book, listState1]);

  //console.log(book);
  //console.log(book?.WpBook.voucher_id?.split(","));

  function find_voucher(voucher_id) {
    return listState3?.find((element) => {
      return element.WpVoucher.id === voucher_id;
    });
  }

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element.WpAuthor.id === author_id;
    });
  }
  const showAuthor = (book_this) => {
    //console.log(book_this?.WpBook.author_id);

    const itemmap_this = book_this?.WpBook.author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        //console.log(item);
        var author = find_author(item);
        //console.log(author?.WpAuthor.name);
        if (index === 0) {
          return (
            <span
              style={{
                width: "fit-content",
                color: "white",
                fontSize: "14px",
                fontWeight: "lighter",
                backgroundColor: "#F73195",
                padding: "5px 8px 5px",
                borderRadius: "10px",
              }}
            >
              {author?.WpAuthor.name.length < 14
                ? author?.WpAuthor.name
                : author?.WpAuthor.name.substring(0, 13) + " ..."}
            </span>
          );
        } else if (index === 1)
          return (
            <span
              style={{
                width: "fit-content",
                color: "white",
                fontSize: "14px",
                fontWeight: "lighter",
                backgroundColor: "#F73195",
                padding: "5px 5px 5px",
                borderRadius: "10px",
              }}
            >
              ...
            </span>
          );
      });

    return itemmap_this;
  };

  const showAuthorTitle = (book_this) => {
    //console.log(book_this?.WpBook.author_id);

    const itemmap_this = book_this?.WpBook.author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        //console.log(item);
        var author = find_author(item);
        //console.log(author?.WpAuthor.name);

        return (
          <span
            style={{
              width: "fit-content",
              color: "black",
              fontSize: "18px",
              fontWeight: "lighter",
            }}
          >
            {author?.WpAuthor.name.length < 25
              ? author?.WpAuthor.name
              : author?.WpAuthor.name.substring(0, 25) + " ..."}
          </span>
        );
      });

    return itemmap_this;
  };

  const showAuthorLink = (book_this) => {
    //console.log(book_this?.WpBook.author_id);

    const itemmap_this = book_this?.WpBook.author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        //console.log(item);
        var author = find_author(item);
        //console.log(author?.WpAuthor.name);
        return (
          <p style={{ color: "black" }}>
            <a
              style={{ textDecoration: "none", color: "#55557B" }}
              href={
                link.client_link +
                "book/user/list" +
                "?search=" +
                author?.WpAuthor.name +
                "&filter=author"
              }
            >
              {author?.WpAuthor.name}
            </a>
          </p>
        );
      });

    return itemmap_this;
  };

  function checkAuthor(book_author_id) {
    var search = book_author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item) => {
        var searchB = book?.WpBook.author_id
          ?.split(";")
          ?.filter((item1) => item1 !== "")
          ?.find((element) => {
            return parseInt(element) === parseInt(item);
          });
        console.log(searchB);
        if (searchB === null || searchB === undefined || searchB === "")
          return false;
        else return true;
      });
    console.log(search);
    if (
      search === null ||
      search === undefined ||
      search === "" ||
      search["0"] === false ||
      search["0"] === "false"
    )
      return false;
    else return true;
  }

  const itemmap0 = listState1
    ?.sort((a, b) =>
      parseInt(a?.WpBook.bought_number) < parseInt(b?.WpBook.bought_number)
        ? 1
        : -1
    )
    ?.filter((item2, index) => checkAuthor(item2?.WpBook.author_id))
    ?.filter((item2, index) => index < 4)
    .map((item2, index) => {
      return (
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <BookComU
            key={index}
            id={item2?.WpBook.id}
            name={item2?.WpBook.name}
            author_id={showAuthor(item2) ?? "Not found!!"}
            price={item2?.WpBook.price}
            type="Novel"
          ></BookComU>
        </div>
      );
    });

  const itemmap1 = listState1
    ?.filter((item) => item?.WpBook.type === book?.WpBook.type)
    ?.sort((a, b) =>
      parseInt(a?.WpBook.bought_number) < parseInt(b?.WpBook.bought_number)
        ? 1
        : -1
    )
    ?.filter((item, index) => index < 4)
    .map((item, index) => {
      return (
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <BookComU
            key={index}
            id={item["WpBook"].id}
            name={item["WpBook"].name}
            author_id={showAuthor(item) ?? "Not found!!"}
            price={item["WpBook"].price}
            type="Novel"
          ></BookComU>
        </div>
      );
    });

  const itemmap2 = book?.WpBook.voucher_id
    ?.split(";")
    ?.filter((item) => item !== "")
    .map((item, index) => {
      var voucher = find_voucher(item);
      return (
        <div>
          {voucher?.WpVoucher.name.indexOf("DISCOUNT") !== -1 && (
            <span
              style={{
                display: "inline",
                backgroundColor: "#FBEBED",
                padding: "5px 6px 5px",
                color: "#EE4F2F",
              }}
              title={
                "Buy more than " +
                voucher?.WpVoucher.number_thres +
                " items, get " +
                voucher?.WpVoucher.discount_rate +
                " discount per item"
              }
            >
              {voucher?.WpVoucher.name}
            </span>
          )}
          {voucher?.WpVoucher.name.indexOf("PRICE") !== -1 && (
            <span
              style={{
                display: "inline",
                backgroundColor: "#FBEBED",
                padding: "5px 6px 5px",
                color: "#EE4F2F",
              }}
              title={
                " Get " +
                voucher?.WpVoucher.discount +
                " discount (Only when total price reach " +
                voucher?.WpVoucher.threshold +
                " discount per item"
              }
            >
              {voucher?.WpVoucher.name}
            </span>
          )}
        </div>
      );
    });

  function remain(book) {
    if (parseInt(book?.WpBook.remain_number) > 0) {
      return <p>Still remain</p>;
    } else {
      return <p>Out of stock</p>;
    }
  }

  //function for quantity button
  const increment = () => {
    if (valueNumber < book?.WpBook.remain_number)
      setValueNumber(valueNumber + 1);
  };

  const decrement = () => {
    if (valueNumber > 0) {
      setValueNumber(valueNumber - 1);
    }
  };
  //

  //console.log(itemmap0);

  useEffect(() => {
    book?.WpBook.voucher_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        var voucher = listState3?.find((element) => {
          return element.WpVoucher.id === item;
        });
        if (voucher?.WpVoucher.name.indexOf("DISCOUNT") !== -1) {
          setDiscount_id(voucher?.WpVoucher.id);
          setItemN(voucher?.WpVoucher.number_thres);
          setDiscount(voucher?.WpVoucher.discount_rate);
          //.log(item_n);
          // console.log(discount_rate);
        }
      });
  }, [listState3, valueNumber]);

  const addCart = () => {
    if (props.login) {
      if (valueNumber <= parseInt(book?.WpBook.remain_number)) {
        const item = {
          id: JSON.parse(localStorage.getItem("cart") || "[]").length,
          book_id: book?.WpBook.id,
          name: book?.WpBook.name,
          type: book?.WpBook.type,
          author_id: book?.WpBook.author_id,
          number: valueNumber,
          price: book?.WpBook.price,
          total_price: parseInt(book?.WpBook.price) * parseInt(valueNumber),
          rate:
            parseInt(valueNumber) >= parseInt(item_n)
              ? 1 - parseFloat(discount_rate)
              : 1,
          discount: book?.WpBook.voucher_id,
          item_discount_id: discount_id,
        };

        var temp = JSON.parse(localStorage.getItem("cart") || "[]");
        temp.push(item);
        localStorage.setItem("cart", JSON.stringify(temp));
        //localStorage.removeItem("cart");

        alert("Add success!!");
        window.location.href = link.client_link + "home";

        //console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
      } else alert("Add failed!!");
    } else {
      alert("Please login!!");
      window.location.href = link.client_link + "home";
    }
  };

  function description() {
    if (toggleInfo === true) {
      return (
        <div
          class="container-sm"
          style={{
            backgroundColor: "white",
            padding: "25px 20px 25px",
            fontStyle: "italic",
            whitespace: "pre-line",
          }}
        >
          {nl2br(book?.WpBook.description)}
        </div>
      );
    } else {
      return (
        <div
          class="container-sm"
          style={{
            backgroundColor: "white",
            padding: "25px 20px 25px",
            fontStyle: "italic",
            whitespace: "pre-line",
          }}
        >
          <p>Author Name: {showAuthor(book) ?? "Not found"}</p>
          <p>
            Phone number:{" "}
            {find_author(book?.WpBook.author_id)?.WpAuthor.phone ?? "Not found"}
          </p>
          <p>
            Address:{" "}
            {find_author(book?.WpBook.author_id)?.WpAuthor.address ??
              "Not found"}
          </p>
          <p>
            Description:{" "}
            {find_author(book?.WpBook.author_id)?.WpAuthor.specialization ??
              "Not found"}
          </p>
        </div>
      );
    }
  }

  function author_onclick() {
    setToggle(false);
    $("#description_button").removeClass("active");
    $("#author_button").addClass("active");
  }

  function description_onclick() {
    setToggle(true);
    $("#author_button").removeClass("active");
    $("#description_button").addClass("active");
  }

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

  function check_type(type) {
    if (type === "novel") {
      return "Novel";
    } else if (type === "short_story") {
      return "Short story";
    } else if (type === "comic") {
      return "Comic";
    }
  }

  return (
    <div>
      <div class="card">
        <div className="card__body">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="featured_text">
              <h2>
                Category: <span>{check_type(book?.WpBook.type)}</span>
              </h2>
              <h3>
                Author:{" "}
                <span style={{ fontSize: "20px" }}>{showAuthorTitle(book)}</span>
              </h3>
            </div>
            <div className="slide-container">
              <Fade {...zoomOutProperties}>
                {imageLink.map((each, index) => (
                  <div className="each-fade">
                    <img
                      key={index}
                      style={{
                        width: "100%",
                        position: "center",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                      src={each}
                    />
                  </div>
                ))}
              </Fade>
            </div>
          </div>
          <div
            class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
            style={{ display: "inline-block" }}
          >
            <div className="description">
              <h2>Book name</h2>
              <p>{book?.WpBook.name}</p>
            </div>
            <div className="description">
              <h2>Author</h2>
              <p> {showAuthorLink(book)}</p>
            </div>
            <div className="description">
              <h2>Category</h2>
              <p>{book?.WpBook.type}</p>
            </div>
            <div className="description">
              <h2>Voucher</h2>
              {itemmap2}
              {(book?.WpBook.voucher_id === null ||
                book?.WpBook.voucher_id === "") && (
                <span
                  style={{
                    display: "inline",
                    padding: "5px 6px 5px",
                    fontStyle: "italic",
                  }}
                >
                  None
                </span>
              )}
            </div>
            <div className="description">
              <h2>Status</h2>
              {remain(book)}
            </div>
            <div className="description">
              <h2>Number</h2>

              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <button
                  type="button"
                  className="quantity-input__modifier quantity-input__modifier--left"
                  onClick={() => decrement()}
                >
                  &mdash;
                </button>
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <input
                  className="quantity-input__screen"
                  type="text"
                  value={valueNumber}
                  max={book?.WpBook.remain_number}
                />
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <button
                  type="button"
                  className="quantity-input__modifier quantity-input__modifier--right"
                  onClick={() => increment()}
                >
                  &#xff0b;
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card__footer">
          <div className="recommend">
            <p>Recommended</p>
          </div>
          <div className="action">
            <form action method="post" onsubmit="alert('Thêm thành công!')">
              <div>
                <button
                  type="button"
                  className="active"
                  name="buy_button"
                  disabled={!(parseInt(book?.WpBook.remain_number) > 0)}
                  id="buy_button"
                  onClick={() => addCart()}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="active"
                  style={{ backgroundColor: "red", borderColor: "red" }}
                  href={link.client_link}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="card__footer"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              id="description_button"
              name="description_button"
              class="nav-link active"
              style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
              onClick={() => description_onclick()}
            >
              Description
            </button>
          </li>
          <li class="nav-item">
            <button
              style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}
              id="author_button"
              name="author_button"
              class="nav-link"
              onClick={() => author_onclick()}
            >
              Author detail
            </button>
          </li>
        </ul>
        {description()}
      </div>

      <div className="card__footer">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">
              <strong style={{ fontSize: "20px" }}>Same category</strong>
            </h2>
          </div>
          <div class="panel-body">
            <div
              style={{
                paddingLeft: "2%",
                overflowX: "scroll",
                height: "400px",
                overflow: "auto",
              }}
            >
              {itemmap1?.some((element) => element !== undefined) > 0 ? (
                itemmap1
              ) : (
                <p>
                  <strong>No similar book found</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card__footer">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">
              <strong style={{ fontSize: "20px" }}>Same author</strong>
            </h2>
          </div>
          <div class="panel-body">
            <div
              style={{
                paddingLeft: "2%",
                overflowX: "scroll",
                height: "400px",
                overflow: "auto",
              }}
            >
              {itemmap0?.some((element) => element !== undefined) > 0 ? (
                itemmap0
              ) : (
                <p>
                  <strong>No similar book found</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDes;
