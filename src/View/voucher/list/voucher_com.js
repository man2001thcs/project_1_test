import { useState } from "react";
import "bootstrap";
import { NavLink } from "reactstrap";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import $ from "jquery";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";


function VoucherCom(props) {
  const [appear, set_appear] = useState(false);
  const [isSubmitting, setSubmitting] = useState("");
  const [deleting, setDelete] = useState(false);
  const [result, setResult] = useState("");
  const edit_button = () => {
    set_appear(true);
  };
  const del_button = () => {
    setDelete(true);
  };
  const cal_edit_button = () => {
    set_appear(false);
    setDelete(false);
  };

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);  
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/voucher/delete.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      alert("Change complete!!");
      setSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <tbody>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.threshold}</td>
        <td>{props.number_thres}</td>
        <td>{props.discount}</td>
        <td>{props.discount_rate}</td>
        <td>
          {!deleting && (
            <NavLink href={link.client_link + "voucher/edit?voucher_id=" + props.id} >
              <button
                type="button"
                class="btn btn-success"
                id="editButton"
                name="editButton"
                onClick={() => edit_button()}
              >
                Edit
              </button>
            </NavLink>
          )}

          <form
            action={link.server_link + "controller/voucher/delete.php"}
            method="post"
            onSubmit={(e) => handleSubmitM(e)}
          >
            <input type="hidden" name="id" id="id" value={props.id} />
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
            {deleting && (
              <button
                type="submit"
                class="btn btn-success"
                id="saveButton"
                name="saveButton"
              >
                Ok
              </button>
            )}
          </form>
        </td>
        <td>
          {!deleting && (
            <button
              type="button"
              class="btn btn-danger"
              id="delButton"
              name="delButton"
              onClick={() => del_button()}
            >
              Delete
            </button>
          )}
          {deleting && (
            <button
              type="button"
              class="btn btn-danger"
              id="calButton"
              name="calButton"
              onClick={() => cal_edit_button()}
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
      <tr>{deleting && <td>Are you sure to delete this?</td>}</tr>
    </tbody>
  );
}

export default VoucherCom;
