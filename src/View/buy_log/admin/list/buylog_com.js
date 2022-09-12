import "bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "reactstrap";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function BuyLogCom(props) {
  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  
  const urlReceive = link.buylog_link +
    localStorage.getItem("codeLogin") +
    ".json&timeStamp=" + GenerateRandomCode.NumCode(4);

  console.log(props.state);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlReceive);
        setListState1(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState1(null);
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

  const urlBook = link.book_link +
    "user_book.json&timeStamp=" + GenerateRandomCode.NumCode(4);

  console.log(props.state);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlBook);
        setListState2(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState2(null);
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

  function complete_receive(state) {
    if (state === "0") {
      return <td>On progress</td>;
    } else return <td>Complete</td>;
  }

  console.log(listState1);

  const cart = listState1
    ?.filter((item) => item?.WpBuyLog.receive_id === props.id)
    .map((item, index) => {
      var book = listState2?.find((element) => {
        return element?.WpBook.id === item?.WpBuyLog.book_id;
      });
      return (
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {" "}
            {book?.WpBook.name} (ID: {item?.WpBuyLog.id}) x{" "}
            {item?.WpBuyLog.number}
          </td>
          <td>{item?.WpBuyLog.price}</td>
          <td></td>
        </tr>
      );
    });

  return (
    <tbody>
      <tr>
        <td>{props.id}</td>
        <td>{props.user_id}</td>
        <td>{props.created}</td>
        <td>{props.transport}</td>
        <td>{props.address}</td>
        <td></td>
        <td></td>
        <td>{props.total_price}</td>
        {complete_receive(props.state)}
        <td>
          {props.state === "0" && (
            <form
              action={link.server_link + "controller/receive/edit.php"}
              method="post"
            >
              <input
                type="hidden"
                name="id"
                id="id"
                Value={props.id}
              />
              <input
                type="hidden"
                name="emailS"
                id="emailS"
                Value={localStorage.getItem("email")}
              />
              <input
                type="hidden"
                name="codeS"
                id="codeS"
                Value={localStorage.getItem("codeLogin")}
              />
              <button
                type="submit"
                class="btn btn-success"
                id="viewButton"
                name="viewButton"
              >
                Complete
              </button>
            </form>
          )}
        </td>
      </tr>
      {cart}
    </tbody>
  );
}

export default BuyLogCom;
