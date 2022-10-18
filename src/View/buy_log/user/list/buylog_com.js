import "bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import $ from "jquery";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

function BuyLogCom(props) {
  const [listState1, setListState1] = useState();
  const [listState2, setListState2] = useState();

  const [result, setResult] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isSubmitting, setSubmitting] = useState();

  //fetch data
  const urlReceive =
    link.buylog_link +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  //console.log(props.state);
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

  const urlBook =
    link.book_link +
    "user_book.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  //console.log(props.state);
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
  //

  function complete_receive(state) {
    if (state === "0") {
      return <td>Wait</td>;
    } else if (state === "1") {
      return <td>On progress</td>;
    } else if (state === "2") {
      return <td>Canceled</td>;
    } else if (state === "3") {
      return <td>Canceled</td>;
    }
  }

  //console.log(new Date().valueOf() - new Date(props.created).valueOf());
  //console.log(new Date(props.created));
  //console.log(new Date());
  //console.log(props.created);

  function delete_function(state) {
    if (
      state === "0" &&
      new Date().valueOf() - new Date(props.created).valueOf() < 86400000
    ) {
      return true;
    } else return false;
  }

  console.log(delete_function(props.state));

  //console.log(listState1);

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
            <a
              href={link.client_link + "book/user/detail?id=" + book?.WpBook.id}
              style={{textDecoration: "none"}}
            >
              {book?.WpBook.name}
            </a>{" "}
            (ID: {item?.WpBuyLog.id}) x {item?.WpBuyLog.number}
          </td>
          <td>{item?.WpBuyLog.price}</td>
          <td></td>
        </tr>
      );
    });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/receive/edit.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Cancel complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "buy_log/list";
    }, 2000);
  };

  useEffect(() => {
    if (parseInt(result) >= 1) {
      alert("Cancel complete!!");
      setResult("-1");
      window.location.href = link.client_link + "buy_log/list";
    }
  }, [result]);

  return (
    <tbody>
      <tr>
        <td>{props.created}</td>
        <td>{props.transport}</td>
        <td>{props.address}</td>
        <td></td>
        <td></td>
        <td>{props.total_price}</td>
        {complete_receive(props.state)}
        <td>{props.description}</td>
        <td>
          {delete_function(props.state) && (
            <button
              type="button"
              style={{ backgroundColor: "red", borderColor: "red" }}
              class="btn btn-success"
              id="viewButton"
              name="viewButton"
              onClick={() => handleClickOpen()}
            >
              Cancel the order
            </button>
          )}
        </td>
      </tr>
      {cart}
      {parseInt(result) === 0 && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          Change failed
        </Alert>
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form method="post" onSubmit={(e) => handleSubmitM(e)}>
            <DialogTitle
              id="alert-dialog-title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {"Warning!"}
            </DialogTitle>
            <DialogContent>
              <InputLabel style={{ fontSize: 12 }}>Description</InputLabel>
              <TextField
                name="description"
                className="form-control"
                variant="standard"
                fullWidth
                inputProps={{ style: { fontSize: 16, padding: 10 } }}
              />
            </DialogContent>
            <DialogActions>
              <input type="hidden" name="id" id="id" Value={props.id} />
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
              <Button type="submit" style={{ fontSize: "14px" }}>
                {isSubmitting ? "Please wait..." : "Cancel the order"}
              </Button>
              <Button
                onClick={handleClose}
                autoFocus
                style={{ fontSize: "14px" }}
              >
                Close
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </tbody>
  );
}

export default BuyLogCom;
