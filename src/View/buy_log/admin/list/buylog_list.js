import BuyLogCom from "./buylog_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import Alert from "@mui/material/Alert";
import $ from "jquery";
let PageSize = 6;

function BuyLogList(props) {
  const [listState, setListState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [listStateFilter, setListStateFilter] = useState();

  const [receiveState, setReceiveState] = useState(0);

  //fetch data
  const urlReceive =
    link.receive_link +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlReceive);
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
  //

  function wait_onclick() {
    setReceiveState(0);
    $("#wait_button").addClass("active");
    $("#accept_button").removeClass("active");
    $("#complete_button").removeClass("active");
    $("#cancel_button").removeClass("active");
  }

  function accept_onclick() {
    setReceiveState(1);
    $("#wait_button").removeClass("active");
    $("#accept_button").addClass("active");
    $("#complete_button").removeClass("active");
    $("#cancel_button").removeClass("active");
  }

  function complete_onclick() {
    setReceiveState(2);
    $("#wait_button").removeClass("active");
    $("#accept_button").removeClass("active");
    $("#complete_button").addClass("active");
    $("#cancel_button").removeClass("active");
  }

  function cancel_onclick() {
    setReceiveState(3);
    $("#wait_button").removeClass("active");
    $("#accept_button").removeClass("active");
    $("#complete_button").removeClass("active");
    $("#cancel_button").addClass("active");
  }

  useEffect(() => {
    setListStateFilter(listState?.filter(
      (item) => parseInt(item?.WpReceive.state) === parseInt(receiveState)
    ));
  }, [listState, receiveState]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {

    if (currentPage === 1) {
      return listStateFilter?.slice(0, 6);
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listStateFilter?.slice(firstPageIndex ?? 0, lastPageIndex ?? 6);
  }, [currentPage, receiveState, listStateFilter]);

  //console.log(listState?.length);
  //console.log(currentTableData);
  
  const itemmap1 = (currentTableData ?? listStateFilter?.slice(0, 6))?.map(
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
        description={item?.WpReceive.description}
      ></BuyLogCom>
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
            Buy log list
          </h3>
        </div>
        <div class="panel-body">
          <div
            className="card__footer"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <button
                  id="wait_button"
                  name="wait_button"
                  class="nav-link active"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  onClick={() => wait_onclick()}
                >
                  Wait
                </button>
              </li>
              <li class="nav-item">
                <button
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  id="accept_button"
                  name="accept_button"
                  class="nav-link"
                  onClick={() => accept_onclick()}
                >
                  On going
                </button>
              </li>
              <li class="nav-item">
                <button
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  id="complete_button"
                  name="complete_button"
                  class="nav-link"
                  onClick={() => complete_onclick()}
                >
                  Complete
                </button>
              </li>
              <li class="nav-item">
                <button
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  id="cancel_button"
                  name="cancel_button"
                  class="nav-link"
                  onClick={() => cancel_onclick()}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </div>

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
                <th>Message</th>
                <th></th>
              </tr>
            </thead>
            {itemmap1}
            {(listStateFilter?.length === 0) && (
              <tbody>
                <tr>
                  <td>
                  <Alert severity="error" style={{ marginBottom: "20px" }}>
                    No item found
                  </Alert>
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={listStateFilter?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default BuyLogList;
