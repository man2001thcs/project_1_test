import "bootstrap";
import "../../../../css/product_card.css";
import link from "../../../../config/const";

function BookComU(props) {
  return (
    <div className="outer">
      <div className="content">
        <div
          className="img_card"
          style={{ minWidth: "150px", minHeight: "170px" }}
        >
          <a href={link.client_link + "book/user/detail?id=" + props.id}>
            <img
              src={link?.image_link + props.id + "/1.jpg"}
              alt="Not found"
              width="150px"
              height="170px"
            />
          </a>
        </div>
        <span
          className="bg animated fadeInDown"
          style={{ marginBottom: "10px" }}
        >
          {props.type}
        </span>
        <h4 style={{ marginBottom: "10px" }}>{props.author_id}</h4>
        <h4>
          <strong>
            Name:{" "}
            {props?.name.length < 14
              ? props?.name
              : props?.name.substring(0, 13) + " ..."}
          </strong>
        </h4>
        <div className="button">
          <a href="#">{props.price} đồng</a>
          <a
            className="cart-btn"
            href={link.client_link + "book/user/detail?id=" + props.id}
          >
            Chi tiết{" "}
            <i class="fa fa-cart-plus" style={{ fontSize: " 15px" }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookComU;
