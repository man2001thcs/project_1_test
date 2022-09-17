import { useState } from "react";
import "bootstrap";
import { NavLink } from "reactstrap";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useEffect } from "react";
import axios from "axios";
import $ from "jquery";

function BookCom(props) {
  const [appear, set_appear] = useState(false);
  const [listState2, setListState2] = useState();
  const [deleting, setDelete] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isSubmitting, setSubmitting] = useState("");
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

  const urlAuthor =
    link.server_link +
    "controller/author/log_session/user_author.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlAuthor);
        setListState2(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState2(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlAuthor, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element.WpAuthor.id === author_id;
    });
  }

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);  
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/book/delete.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Delete complete!!");
      setSubmitting(false);
      //window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Delete complete!!");
      setResult("-1");
      window.location.reload();
    }
  }, [result]);

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
            <NavLink href={link.client_link + "book/edit?book_id=" + props.id + "&author="  + find_author(props.author)?.WpAuthor.name} >
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

export default BookCom;
