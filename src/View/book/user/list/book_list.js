import BookCom from "./book_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useLocation } from "react-router-dom";
import cssVars from "@mui/system/cssVars";

let PageSize = 6;

function BookList(props) {
  const [listState, setListState] = useState();
  const [listState2, setListState2] = useState();
  const [listStateSearch, setListStateSearch] = useState();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  //fetch data
  const urlBook =
    link.book_link +
    "user_book.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  const search = useLocation().search;
  const searchInput = new URLSearchParams(search).get("search");
  const searchFilter = new URLSearchParams(search).get("filter");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlBook);
        setListState(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState(null);
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

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element.WpAuthor.id === author_id;
    });
  }

  function checkAuthor(book_author_id, author_name) {
    var search = book_author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      ?.find((element) => {
        return find_author(element)?.WpAuthor.name.includes(author_name);
      });
    if (search === null || search === undefined || search === "") return false;
    else return true;
  }

  const showAuthor = (book_this) => {
    console.log(book_this?.WpBook.author_id);

    const itemmap_this = book_this?.WpBook.author_id
      ?.split(";")
      ?.filter((item) => item !== "")
      .map((item, index) => {
        console.log(item);
        var author = find_author(item);
        //console.log(author?.WpAuthor.name);
        if (index === 0) {
          return (
            <span
              style={{
                width: "fit-content",
                color: "black",
                fontSize: "14px",
                fontWeight: "lighter",
              }}
            >
              {author?.WpAuthor.name.length < 14
                ? author?.WpAuthor.name
                : author?.WpAuthor.name.substring(0, 13) + " ..."}
            </span>
          );
        } else
          return (
            <span
              style={{
                width: "fit-content",
                color: "black",
                fontSize: "14px",
                fontWeight: "lighter",
              }}
            >
              ...
            </span>
          );
      });

    return itemmap_this;
  };

  useEffect(() => {
    if (searchInput?.length >= 2) {
      if (searchFilter === "author") {
        setListStateSearch(
          listState?.filter((item) =>
            checkAuthor(item?.WpBook.author_id, searchInput)
          )
        );
      } else {
        setListStateSearch(
          listState?.sort(
            (a, b) => -(b?.WpBook.name).localeCompare(a?.WpBook.name)
          )
        );
      }
    } else {
      setListStateSearch(
        listState?.sort(
          (a, b) => -(b?.WpBook.name).localeCompare(a?.WpBook.name)
        )
      );
    }
  }, [listState, searchFilter, searchInput]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    //console.log("ok");

    if (currentPage === 1) {
      return listStateSearch?.slice(0, 6);
    }

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listStateSearch?.slice(firstPageIndex ?? 0, lastPageIndex ?? 6);
  }, [currentPage, listStateSearch]);

  const itemmap1 = (currentTableData ?? listState?.slice(0, 6))?.map(
    (item, index) => (
      <BookCom
        key={index}
        id={item?.WpBook.id}
        name={item["WpBook"].name}
        author={showAuthor(item)}
        price={item["WpBook"].price}
        pageNum={item["WpBook"].page_number}
        boughtNum={item["WpBook"].bought_number}
        remainNum={item["WpBook"].remain_number}
      ></BookCom>
    )
  );

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3
            class="panel-title"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Book list {searchFilter === "author" && ": Author search (" + searchInput + ")"}
          </h3>
        </div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Book name</th>
                <th>Author</th>
                <th>Price</th>
                <th>Page number</th>
                <th>Bought number</th>
                <th>Remain number</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {itemmap1}
          </table>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={listStateSearch?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default BookList;
