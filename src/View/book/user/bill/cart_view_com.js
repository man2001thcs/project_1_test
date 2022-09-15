import "../../../../css/shop_cart.css";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";
import { useState, useEffect } from "react";
import React from "react";
import "bootstrap";
import $ from "jquery";
import axios from "axios";

function CartViewCom(props) {
  const [deleted, setDelete] = useState(false);
  const [listState3, setListState3] = useState();
  const [rate, setRate] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const urlVoucher =
    link.voucher_link +
    "user_voucher.json?timeStamp=" +
    GenerateRandomCode.NumCode(4);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlVoucher);
        setListState3(response.data);
        //console.log(response.data);
      } catch (err) {
        setError(err.message);
        setListState3(null);
      } finally {
        setLoading(false);
      }
    };
    fetch(urlVoucher, {
      method: "HEAD",
    }).then((res) => {
      if (res.ok) {
        getData();
      } else {
      }
    });
  }, []);

  function find_voucher(voucher_id) {
    return listState3?.find((element) => {
      return element.WpVoucher.id === voucher_id;
    });
  }

  const deleteCart = () => {
    var temp = JSON.parse(localStorage.getItem("cart") || "[]");

    temp.find((element) => {
      return element.id === props.id;
    });

    temp = temp?.filter((item) => {
      return item.id !== props.id;
    });

    localStorage.setItem("cart", JSON.stringify(temp));
    //localStorage.removeItem("cart");

    console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
    setDelete(false);
    alert("Delele success!!");
    window.location.reload();
  };

  const setDelButton = () => {
    setDelete(true);
  };

  const setCancelDelButton = () => {
    setDelete(false);
  };

  return (
    <div className="basket-product">
      <div className="item">
        <div className="product-image">
          <img
            src={link.image_link + props.book_id + '.jpg'}
            alt="Not found"
            className="product-frame"
          />
        </div>
        <div className="product-details">
          <h1 style={{ fontSize: "14px" }}>
            <strong style={{ fontSize: "14px" }}>
              <span className="item-quantity">{props.number}</span> x
            </strong>
            (id: {props.book_id})
          </h1>
          <p>
            <strong style={{ fontSize: "14px" }}>Author: {props.author}</strong>
          </p>
        </div>
      </div>
      <div className="name" style={{ fontSize: "14px" }}>
        {props.name}{" "}
        {parseFloat(props.rate) !== 1 && (
          <span
            style={{
              fontStyle: "italic",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            (Giảm {Math.ceil((1 - parseFloat(props.rate)) * 100)}%)
          </span>
        )}
      </div>
      <div className="price" style={{ fontSize: "14px" }}>
        {" "}
        {props.price}
      </div>
      <div className="quantity" style={{ fontSize: "14px" }}>
        <input
          disabled
          type="number"
          defaultValue={props.number}
          min={1}
          className="quantity-field"
        />
      </div>
      <div className="subtotal" style={{ fontSize: "14px" }}>
        {parseInt(props.totalPrice) * parseFloat(props.rate)}
      </div>

      {!deleted && (
        <div className="remove" style={{ fontSize: "14px" }}>
          <button type="submit" onClick={() => setDelButton()}>
            Remove
          </button>
        </div>
      )}
      {deleted && (
        <div className="remove" style={{ fontSize: "14px" }}>
          <button type="submit" onClick={() => deleteCart()}>
            Ok
          </button>
          <button type="submit" onClick={() => setCancelDelButton()}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default CartViewCom;
