import { useState, useEffect } from "react";
import "bootstrap";
import { NavLink } from "reactstrap";
import link_con from "../../../../config/const";

function BookCom(props) {
  const [result, setResult] = useState("");
  const [link, setLink] = useState("");
  const [id_book, setid_book] = useState(props.id);

  useEffect(() => {
    setLink(link_con.client_link + "book/user/detail?id=" + props.id);
  }, [props.id]);

  console.log(props.id);

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "120px", height: "150px" }}>
            <img
              src={link_con.image_link + props.id + "/1.jpg"}
              alt="Not found"
              className="product-frame"
              style={{ height: "100%" }}
            />
          </div>
        </td>
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
              style={{ fontSize: "14px" }}
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
