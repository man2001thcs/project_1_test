import BookCom from "./book_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useLocation } from "react-router-dom";
let PageSize = 6;

function BookList(props) {
  const [listState, setListState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const search = useLocation().search;
  const searchInput = new URLSearchParams(search).get("search");

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    if (currentPage === 1) {
      return listState?.slice(0, 6);
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listState?.slice(firstPageIndex ?? 0, lastPageIndex ?? 6);
  }, [currentPage]);

  //fetch data

  const urlBook =
    link.server_link +
    "controller/book/log_session/user_book.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

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

  //show book list with condition

  function bookListShow() {
    if (searchInput?.length >= 2) {
      //console.log("ok");
      const itemmap1 = listState
        ?.filter((item) => (item?.WpBook.name).includes(searchInput))
        .map((item, index) => {
          return (
            <BookCom
              key={index}
              id={item["WpBook"].id}
              name={item["WpBook"].name}
              author={item["WpBook"].author_id}
              price={item["WpBook"].price}
              pageNum={item["WpBook"].page_number}
              boughtNum={item["WpBook"].bought_number}
              remainNum={item["WpBook"].remain_number}
            ></BookCom>
          );
        });
      return itemmap1;
    } else {
      const itemmap1 = (currentTableData ?? listState?.slice(0, 6))?.map(
        (item, index) => (
          <BookCom
            key={index}
            id={item["WpBook"].id}
            name={item["WpBook"].name}
            author={item["WpBook"].author_id}
            price={item["WpBook"].price}
            pageNum={item["WpBook"].page_number}
            boughtNum={item["WpBook"].bought_number}
            remainNum={item["WpBook"].remain_number}
          ></BookCom>
        )
      );
      return itemmap1;
    }
  }

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title" style={{ fontSize: "20px" }}>
            Book list
          </h3>
        </div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
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
            {bookListShow()}
          </table>

          {(searchInput?.length === undefined ||
            searchInput?.length === null) && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={listState?.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            ></Pagination>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookList;
