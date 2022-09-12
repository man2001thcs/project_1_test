
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

  const urlBook = link.book_link +
    "user_book.json?timeStamp=" + GenerateRandomCode.NumCode(4);

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

  const urlAuthor = link.author_link +
    "user_author.json?timeStamp=" + GenerateRandomCode.NumCode(4);

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
      return element?.WpAuthor.id === author_id;
    });
  }

  console.log(find_author("1"));

  function bookListShow(typeN) {
    if (searchInput?.length >= 2) {
      //console.log("ok");
      const bookListSearch = listState1
        ?.filter(
          (item) => item?.WpBook.type === typeN && (item?.WpBook.name).includes(searchInput)
        )
        .map((item, index) => {
          return (
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <BookComU
                key={index}
                id={item["WpBook"].id}
                name={item["WpBook"].name}
                author_id={
                  find_author(item["WpBook"].author_id)?.WpAuthor.name ??
                  "Not found!!"
                }
                price={item["WpBook"].price}
                type="Novel"
              ></BookComU>
            </div>
          );
        });
        return bookListSearch;
    } else {
      const bookListAll = listState1
        ?.filter((item) => item?.WpBook.type === typeN)
        .map((item, index) => {
          return (
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <BookComU
                key={index}
                id={item["WpBook"].id}
                name={item["WpBook"].name}
                author_id={
                  find_author(item?.WpBook.author_id)?.WpAuthor.name ??
                  "Not found!!"
                }
                price={item["WpBook"].price}
                type="Novel"
              ></BookComU>
            </div>
          );
        });
      return bookListAll;
    }
  }

  /*const itemmap1 = listState1?.map((item, index) => {
    if (item["WpBook"].type === "novel")
      return (
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <BookComU
            key={index}
            id={item["WpBook"].id}
            name={item["WpBook"].name}
            author_id={
              find_author(item["WpBook"].author_id)?.WpAuthor.name ??
              "Not found!!"
            }
            price={item["WpBook"].price}
            type="Novel"
          ></BookComU>
        </div>
      );
  });
 

  const itemmap2 = listState1?.map((item, index) => {
    if (item["WpBook"].type === "short_story")
      return (
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <BookComU
            key={index}
            id={item["WpBook"].id}
            name={item["WpBook"].name}
            author_id={
              find_author(item["WpBook"].author_id)?.WpAuthor.name ??
              "Not found!!"
            }
            price={item["WpBook"].price}
            type="Short story"
          ></BookComU>
        </div>
      );
  });
   */

  return (
    <div className="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">
            <strong>Tiểu thuyết</strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row" style={{ paddingLeft: "2%"}}>
            {bookListShow("novel")}
          </div>
        </div>

        <div class="panel-heading">
          <h2 class="panel-title">
            <strong>Truyện ngắn</strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row" style={{ paddingLeft: "2%" }}>
            {bookListShow("short_story")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookListU;
