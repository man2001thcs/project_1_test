import { useState, useEffect } from "react";
import "bootstrap";
import $ from "jquery";
import { NavLink } from "reactstrap";
import link_con from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function BookCom(props) {
  const [result, setResult] = useState("");
  const [link, setLink] = useState("");
  const handleSumbit = (e) => {
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
  };

  useEffect(() => {
    setLink(link_con.client_link + "book/user/detail?id=" + props.id);
  }, [props.id]);

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
          <NavLink href={link}>
            <button
              type="button"
              class="btn btn-success"
              id="viewButton"
              name="viewButton"
            >
              View
            </button>
          </NavLink>
        </td>
      </tr>
    </tbody>
  );
}

export default BookCom;
