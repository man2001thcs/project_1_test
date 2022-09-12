import BuyLogCom from "./buylog_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
let PageSize = 6;

function BuyLogList(props) {
  const [listState, setListState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const urlReceive = link.receive_link +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" + GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          urlReceive
        );
        setListState(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlReceive, {
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
  const itemmap1 = (currentTableData ?? listState?.slice(0, 6))?.map(
    (item, index) => (
      <BuyLogCom
        key={index}
        id={item?.WpReceive.id}
        user_id={item?.WpReceive.user_id}
        created={item?.WpReceive.created}
        total_price={item?.WpReceive.total_price}
        address={item?.WpReceive.address}
        transport={item?.WpReceive.transport}
        state={item?.WpReceive.state}
      ></BuyLogCom>
    )
  );

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title" style={{fontSize: "20px", fontWeight: "bold"}}>Buy log list</h3>
        </div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>User id</th>
                <th>Created</th>
                <th>Transport</th>
                <th>Address</th>
                <th>Item</th>               
                <th>Price</th>               
                <th>Total price</th>
                <th>State</th>
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
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default BuyLogList;
