import { useState } from "react";
import "bootstrap";
import $ from "jquery";
import "../../../../css/product_card.css";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function BookComU(props) {

  const [submitting, setSubmit] = useState(false);
  const [deleting, setDelete] = useState(false);
  const [result, setResult] = useState("");

  console.log(link);

  return (
    <div className="outer">
      <div className="content">
        <div className="img_card">
          <a href={link.client_link + "book/user/detail?id=" + props.id}>
            <img src={link?.image_link + props.id + ".jpg"} alt="Not found" width="150px" height="170px" />
          </a>
        </div>
        <span className="bg animated fadeInDown">{props.type}</span>
        <h4><strong>Tên tác phẩm: {props.name}</strong></h4>
        <h4><strong>Tác giả: {props.author_id}</strong></h4>
        <div className="button">
          <a href="#">{props.price} đồng</a>
          <a
            className="cart-btn"
            href={link.client_link + "book/user/detail?id=" + props.id}
          >
            Chi tiết <i class="fa fa-cart-plus" style={{fontSize:" 15px"}}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookComU;
