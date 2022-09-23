import "bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "reactstrap";
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
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const [command, setCommand] = useState();

  const [isSubmitting, setSubmitting] = useState();
  const [result, setResult] = useState("");


  //console.log(props.state);

  //fetch data
  const urlBuyLog =
    link.buylog_link +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  console.log(props.state);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlBuyLog);
        setListState1(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState1(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlBuyLog, {
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
    "user_book.json&timeStamp=" +
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
      return <td>Complete</td>;
    } else if (state === "3") {
      return <td>Deleted</td>;
    }
  }

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
            {book?.WpBook.name} (ID: {item?.WpBuyLog.id}) x{" "}
            {item?.WpBuyLog.number}
          </td>
          <td>{item?.WpBuyLog.price}</td>
          <td></td>
        </tr>
      );
    });

  const [openCommand, setOpenCommand] = useState(false);

  //command function
  const handleClickOpenCommand1 = () => {
    //acepted
    setCommand(1);
    setOpenCommand(true);
  };

  const handleClickOpenCommand2 = () => {
    //complete
    setCommand(2);
    setOpenCommand(true);
  };

  const handleClickOpenCommand3 = () => {
    //cancel
    setCommand(3);
    setOpenCommand(true);
  };

  const handleClickOpenCommand4 = () => {
    //send message
    setCommand(4);
    setOpenCommand(true);
  };

  const handleCloseCommand = () => {
    setCommand(0);
    setOpenCommand(false);
  };
  //

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
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "buy_log/list";
    }
  }, [result]);

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
        <td>{props.description}</td>
        <td>
          {props.state === "0" && (
            <button
              type="button"
              class="btn btn-success"
              id="viewButton"
              name="viewButton"
              onClick={() => handleClickOpenCommand1()}
              style={{ margin: "10px" }}
            >
              Accept
            </button>
          )}
          {props.state === "1" && (
            <button
              type="button"
              class="btn btn-success"
              id="viewButton"
              name="viewButton"
              onClick={() => handleClickOpenCommand2()}
              style={{ margin: "10px" }}
            >
              Complete
            </button>
          )}
          {(props.state === "0" || props.state === "1") && (
            <button
              type="button"
              class="btn btn-danger"
              id="viewButton"
              name="viewButton"
              style={{ margin: "10px" }}
              onClick={() => handleClickOpenCommand3()}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            class="btn btn-info"
            id="viewButton"
            name="viewButton"
            style={{ margin: "10px", color: 'white' }}
            onClick={() => handleClickOpenCommand4()}
          >
            Message
          </button>
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
          open={openCommand}
          onClose={handleCloseCommand}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form
            action={link.server_link + "controller/receive/edit.php"}
            method="post"
            onSubmit={(e) => handleSubmitM(e)}
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {parseInt(command) === 1 && "Accept order"}
              {parseInt(command) === 2 && "Complete order"}
              {parseInt(command) === 3 && "Cancel order"}
              {parseInt(command) === 4 && "Set message"}
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
                name="command"
                id="command"
                Value={command}
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

              <Button type="submit" style={{ fontSize: "14px" }}>
                {isSubmitting
                  ? "Please wait..."
                  : (parseInt(command) === 1 && "Accept order") ||
                    (parseInt(command) === 2 && "Complete order") ||
                    (parseInt(command) === 3 && "Cancel order") ||
                    (parseInt(command) === 4 && "Set message")}
              </Button>
              <Button
                onClick={() => handleCloseCommand()}
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
