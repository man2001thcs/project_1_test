import "bootstrap";
import Author_component from "./author_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../element/Pagination/Pagination";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
let PageSize = 6;

function Author_list(props) {
  const [listState, setListState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const urlAccount = link.author_link + 
  "user_author.json?timeStamp=" + GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          urlAccount
        );
        setListState(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlAccount, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    if (currentPage === 1) {
      return listState?.slice(0, 6);
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listState?.slice(firstPageIndex ?? 0, lastPageIndex ?? 6);
  }, [currentPage]);

  console.log(listState?.length);

  console.log(currentTableData);
  const itemmap1 = (currentTableData ?? listState?.slice(0, 6))?.map((item, index) => (
    <Author_component
      key={index}
      id={item["WpAuthor"].id}
      name={item["WpAuthor"].name}
      address={item["WpAuthor"].address}
      phone={item["WpAuthor"].phone}
      specialization={item["WpAuthor"].specialization}
    />
  ));

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Author list</h3>
        </div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Author name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {itemmap1}
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={listState?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Author_list;
