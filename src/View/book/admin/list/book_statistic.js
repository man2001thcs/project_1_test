import { useState, useEffect } from "react";
import axios from "axios";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { Chart } from "react-google-charts";

function Chart_book(props) {
  const [listState, setListState] = useState();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

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

  function bookListSelling(typeN, listState) {
    var temp = {
      name: "Bar",
      chartType: "BarChart",
      data: [["Book", "Bought number"]],
      options: {
        title: "Top 10 best-seller book",
        hAxis: { title: "Selling number", viewWindow: { min: 0 } },
        vAxis: { title: "Book", viewWindow: { min: 0, max: 10 } },
      },
      width: "100%",
      height: "600px",
    };

    var listSort = listState
      ?.filter((item, index) => item.WpBook.type === typeN)
      .sort((a, b) =>
        parseInt(b?.WpBook.bought_number) > parseInt(a?.WpBook.bought_number)
          ? 1
          : -1
      );

    listSort
      ?.filter((item, index) => index < 10)
      .map((item, index) => {
        var insert = [item?.WpBook.name, parseInt(item?.WpBook.bought_number)];
        temp?.data.push(insert);
      });

    var totalPrice = listSort?.reduce(
      (total, currentValue) =>
        (total =
          parseInt(total) + parseInt(currentValue?.WpBook.bought_number)),
      0
    );

    return (
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">
            <strong style={{ fontSize: "20px" }}>
              {(typeN === "novel" && "Novel") ||
                (typeN === "short_story" && "Short story") ||
                (typeN === "comic" && "Comic")}
            </strong>
          </h2>
        </div>
        <div class="panel-body">
          <div class="row">
            <div
              class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
              style={{
                border: "2px solid gray",
                borderRadius: "10px",
                padding: "5px 10px 5px",
                margin: "10px 20px 5px",
                backgroundColor: '#C1EED1'
              }}
            >
              <h2 style={{ fontWeight: "bold", color: 'gray' }}>
                Best sell item
              </h2>
              {listSort?.length > 0 && (
                <div style={{ fontStyle: "italic" }}>
                  {listSort[0]?.WpBook.name ?? ""}:{" "}
                  {listSort[0]?.WpBook.bought_number ?? ""}
                </div>
              )}
            </div>
            <div
              class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
              style={{
                border: "2px solid gray",
                borderRadius: "10px",
                padding: "5px 10px 5px",
                margin: "10px 20px 5px",
                backgroundColor: '#FFDCFD'
                
              }}
            >
              <h2 style={{ fontWeight: "bold", color: 'gray' }}>
                Total sell
              </h2>
              <div style={{ fontStyle: "italic" }}>{totalPrice}</div>
            </div>
          </div>
        </div>
        <div class="panel-body">
          <Chart
            chartType={temp.chartType}
            data={temp.data}
            options={temp.options}
            width={temp.width}
            height={temp.height}
          />
        </div>
      </div>
    );
  }

  //show book list with condition

  return (
    <div
      className="container"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "30px 30px 30px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        <i class="fa fa-bar-chart"></i> Statistic
      </h2>
      {bookListSelling("novel", listState)}
      {bookListSelling("short_story", listState)}
      {bookListSelling("comic", listState)}
    </div>
  );
}

export default Chart_book;
