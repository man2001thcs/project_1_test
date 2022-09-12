import { useState } from "react";
import "bootstrap";
import $ from "jquery";
import { NavLink } from "reactstrap";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function BookCom(props) {
  const [appear, set_appear] = useState(false);

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

  /*const handleSumbit = (e) => {
    if (submitting === true) {
      submitting = false;
      e.preventDefault();
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
          setResult(data);
        },
      });
    }
  };

  */

  return (
    <tbody>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.author}</td>
        <td>{props.price}</td>
        <td>{props.pageNum}</td>
        <td>{props.boughtNum}</td>
        <td>{props.remainNum}</td>
        <td>
          {!deleting && (
            <NavLink href={link.client_link + "book/edit?book_id=" + props.id} >
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
            action={link.server_link + "controller/book/delete.php"}
            method="post"
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

export default BookCom;
