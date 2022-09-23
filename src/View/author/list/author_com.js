import { useState, useEffect } from "react";
import "bootstrap";
import { NavLink } from "reactstrap";
import link from "../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import $ from "jquery";

function AuthorCom(props) {
  const [appear, set_appear] = useState(false);

  const [deleting, setDelete] = useState(false);
  const [result, setResult] = useState("");
  const [isSubmitting, setSubmitting] = useState();
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

  //submit function
  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/author/delete.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Change complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "author/list";
    }, 2000);
  };

  //check return status
  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Change complete!!");
      setResult("-1");
      window.location.href = link.client_link + "author/list";
    }
  }, [result]);

  return (
    <tbody>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.address}</td>
        <td>{props.phone}</td>
        <td>{props.specialization}</td>
        <td>
          {!deleting && (
            <NavLink
              href={link.client_link + "author/edit?author_id=" + props.id}
            >
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
            action={link.server_link + "controller/author/delete.php"}
            method="post"
            onSubmit={(event) => {
              handleSubmitM(event);
            }}
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

export default AuthorCom;
