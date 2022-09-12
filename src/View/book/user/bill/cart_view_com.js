import "../../../../css/shop_cart.css";
import { useState } from "react";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

function CartViewCom(props) {
  const [deleted, setDelete] = useState(false);

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
  }

  const setCancelDelButton = () =>{
    setDelete(false);
  }

  return (
    <div className="basket-product">
      <div className="item">
        <div className="product-image">
          <img src={link.image_link + props.book_id} alt="Not found" className="product-frame" />
        </div>
        <div className="product-details">
          <h1  style={{fontSize: "14px"}}>
            <strong  style={{fontSize: "14px"}}>
              <span className="item-quantity">{props.number}</span> x
            </strong>
            (id: {props.book_id})
          </h1>
          <p>
            <strong  style={{fontSize: "14px"}}>Author: {props.author}</strong>
          </p>
        </div>
      </div>
      <div className="name"  style={{fontSize: "14px"}}>{props.name}</div>
      <div className="price"  style={{fontSize: "14px"}}> {props.price}</div>
      <div className="quantity"  style={{fontSize: "14px"}}>
        <input
          disabled
          type="number"
          defaultValue={props.number}
          min={1}
          className="quantity-field"
        />
      </div>
      <div className="subtotal"  style={{fontSize: "14px"}}>{props.totalPrice}</div>

      {!deleted && (
        <div className="remove"  style={{fontSize: "14px"}}>
          <button type="submit" onClick={() => setDelButton()}>
            Remove
          </button>
        </div>
      )}
      {deleted && (
        <div className="remove"  style={{fontSize: "14px"}}>
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
