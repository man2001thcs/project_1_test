import { useState, useEffect } from "react";
import axios from "axios";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import BookComU from "./book_com";
import { useLocation } from "react-router-dom";

let PageSize = 6;

function BookListU(props) {
  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const search = useLocation().search;
  const searchInput = new URLSearchParams(search).get("search");
  const searchFilter = new URLSearchParams(search).get("filter");

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

  //console.log(listState2);

  //find thing
  function find_author(author_id) {
    return listState2?.find((element) => {
      return element.WpAuthor.id === author_id;
    });
  }

  //show author from a string
  const showAuthor = (book_this) => {
    console.log(book_this?.WpBook.author_id);

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

  function check_type(type) {
    if (type === "novel") {
      return "Novel";
    } else if (type === "short_story") {
      return "Short story";
    } else if (type === "comic") {
      return "Comic";
    }
  }

  console.log(find_author("1"));

  function bookListShow(typeN) {
    if (searchInput?.length >= 2) {
      if (searchFilter === "book") {
        //console.log("ok");
        const bookListSearch = listState1
          ?.filter(
            (item) =>
              item?.WpBook.type === typeN &&
              (item?.WpBook.name).includes(searchInput)
          )
          .sort((a, b) =>
            parseInt(a?.WpBook.bought_number) <
            parseInt(b?.WpBook.bought_number)
              ? 1
              : -1
          )
          .filter((item, index) => index < 8)
          .map((item, index) => {
            return (
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <BookComU
                  key={index}
                  id={item["WpBook"].id}
                  name={item["WpBook"].name}
                  author_id={showAuthor(item) ?? "Not found!!"}
                  price={item["WpBook"].price}
                  type={check_type(item["WpBook"].type)}
                ></BookComU>
              </div>
            );
          });
        return bookListSearch;
      }
    } else {
      const bookListAll = listState1
        ?.filter((item, index) => item?.WpBook.type === typeN)
        .sort((a, b) =>
          parseInt(a?.WpBook.bought_number) < parseInt(b?.WpBook.bought_number)
            ? 1
            : -1
        )
        .filter((item, index) => index < 8)
        .map((item, index) => {
          return (
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <BookComU
                key={index}
                id={item["WpBook"].id}
                name={item["WpBook"].name}
                author_id={showAuthor(item) ?? "Not found!!"}
                price={item["WpBook"].price}
                type={check_type(item["WpBook"].type)}
              ></BookComU>
            </div>
          );
        });
      return bookListAll;
    }
  }

  return (
    <div className="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">
            <strong style={{ fontSize: "20px" }}>Tiểu thuyết</strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row" style={{ paddingLeft: "2%" }}>
            {bookListShow("novel")}
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">
            <strong style={{ fontSize: "20px" }}>Truyện ngắn</strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row" style={{ paddingLeft: "2%" }}>
            {bookListShow("short_story")}
          </div>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">
            <strong style={{ fontSize: "20px" }}>Comic</strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row" style={{ paddingLeft: "2%" }}>
            {bookListShow("comic")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookListU;
