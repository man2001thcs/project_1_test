import { useState, useEffect } from "react";
import axios from "axios";
import link from "../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { Chart } from "react-google-charts";

function Chart_test(props) {
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

  function bookListSelling(typeN) {
    var temp = {
      name: "Bar",
      chartType: "BarChart",
      data: [["Book", "Bought number"]],
      options: {
        title: "Sell number",
        hAxis: { title: "Selling number"},
        vAxis: { title: "Book", viewWindow: { min: 0, max: 10 } },
      },
      width: "100%",
      height: "600px",
    };

    listState
      ?.filter((item, index) => item.WpBook.type === typeN)
      .sort((a, b) =>
        parseInt(b?.WpBook.bought_number) > parseInt(a?.WpBook.bought_number)
          ? 1
          : -1
      )
      .filter((item, index) => index < 10)
      .map((item, index) => {
        var insert = [item?.WpBook.name, parseInt(item?.WpBook.bought_number)];
        temp?.data.push(insert);
      });

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
    <div className="container">
      {bookListSelling("novel")}
      {bookListSelling("short_story")}
      {bookListSelling("comic")}
    </div>
  );
}

export default Chart_test;
