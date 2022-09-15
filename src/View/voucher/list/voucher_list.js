import "bootstrap";
import Voucher_component from "./voucher_com";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../element/Pagination/Pagination";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
let PageSize = 6;

function Voucher_list(props) {
  const [listState, setListState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const urlVoucher = link.voucher_link + 
  "user_voucher.json?timeStamp=" + GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          urlVoucher
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
    fetch(urlVoucher, {
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
    <Voucher_component
      key={index}
      id={item["WpVoucher"].id}
      name={item["WpVoucher"].name}
      threshold={item["WpVoucher"].threshold}
      number_thres={item["WpVoucher"].number_thres}
      discount={item["WpVoucher"].discount}
      discount_rate={item["WpVoucher"].discount_rate}
    />
  ));

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title" style={{fontSize: "20px", fontWeight: "bold"}}>Voucher list</h3>
        </div>
        <div class="panel-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Voucher name</th>
                <th>Threshold</th>
                <th>Number threshold</th>
                <th>Discount</th>
                <th>Discount rate</th>
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

export default Voucher_list;
