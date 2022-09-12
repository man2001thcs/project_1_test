import { useState, useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import Pagination from "../../../element/Pagination/Pagination";
import "../../../../css/shop_cart.css";
import CartViewCom from "./cart_view_com";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

let PageSize = 6;

function CartView(props) {
  const [listState2, setListState2] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [result, setResult] = useState("");
  const [itemsNum, setItemNum] = useState("");
  const [tempCart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");

  if (success) {
    localStorage.setItem("cart", []);
  }

  const [address, setAddress] = useState(props.address ?? "");
  console.log(address);

  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);

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

  const urlAuthor = link.server_link +
    "controller/author/log_session/" +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" + GenerateRandomCode.NumCode(4);

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

  const totalPrice = tempCart?.reduce(
    (total, currentValue) => (total = total + currentValue.total_price),
    0
  );

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element["WpAuthor"].id === author_id;
    });
  }

  useEffect(() => {
    setItemNum(JSON.parse(localStorage.getItem("cart") || "[]")?.length);
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [localStorage.getItem("cart")]);

  function empty_cart() {
    if (tempCart?.length === 0 || success)
      return (
        <div className="basket-product">
          <div className="item">
            <div className="product-details">
              <p>
                <strong>Trống, vui lòng thêm item để thanh toán.</strong>
              </p>
            </div>
          </div>
        </div>
      );
  }

  const itemmap1 = tempCart?.map((item, index) => {
    return (
      <div>
        <CartViewCom
          key={index}
          id={item.id}
          book_id={item.book_id}
          name={item.name}
          type={item.type}
          author={find_author(item.author_id)?.WpAuthor.name ?? "Not found!!"}
          price={item.price}
          number={item.number}
          totalPrice={item.total_price}
        ></CartViewCom>
      </div>
    );
  });
  return (
    <main>
      <div className="basket">
        <div className="basket-labels">
          <ul>
            <li className="item item-heading">
              <strong>Product</strong>
            </li>
            <li className="name">
              <strong>Name</strong>
            </li>
            <li className="price">
              <strong>Product single price</strong>
            </li>
            <li className="quantity">
              <strong>Number</strong>
            </li>
            <li className="subtotal">
              <strong>Total price (each product)</strong>
            </li>
          </ul>
        </div>

        {itemmap1}
        {empty_cart()}
      </div>
      <aside>
        <div className="summary">
          <div className="summary-total-items">
            <span className="total-items" /> Items: {itemsNum}
            <a href="../../main_page/main/list.php" style={{marginLeft: '15px'}}>Turn back</a>
          </div>
          <div className="summary-subtotal">
            <div className="subtotal-title">Total price:</div>
            <div className="subtotal-value final-value" id="basket-subtotal">
              {totalPrice}
            </div>
            <div className="summary-promo hide">
              <div className="promo-title">Promotion</div>
              <div className="promo-value final-value" id="basket-promo" />
            </div>
          </div>
          <form
            action={link.server_link + "controller/cart/create.php"}
            method="post"
          >
            <div className="basket-module">
              <label htmlFor="promo-address">Address: </label>
              <input
                id="promo-address"
                type="text"
                name="promo-address"
                className="promo-address-field"
                placeholder="Địa chỉ mặc định tài khoản"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <br />
            <div className="summary-delivery">
              <select
                name="delivery-collection"
                className="summary-delivery-selection"
              >
                <option value="Express">Express</option>
                <option value="Shoppee">Shoppe Delivery</option>
              </select>
            </div>
            <div className="summary-total">
              <div className="total-title">Total price</div>
              <div className="total-value final-value" id="basket-total">
                {totalPrice}
              </div>
            </div>
            <div className="summary-checkout">
            <input
                type="hidden"
                name="emailS"
                id="emailS"
                Value={localStorage.getItem('email')}
              />
              <input
                type="hidden"
                name="cart"
                id="cart"
                Value={JSON.stringify(tempCart)}
              />
              <input
                type="hidden"
                name="user_id"
                id="user_id"
                Value={props.id}
              />
              <input
                type="hidden"
                name="code"
                id="code"
                Value={localStorage.getItem("codeLogin")}
              />
              <input
                type="hidden"
                name="address"
                id="address"
                Value={address}
              />
              <input
                type="hidden"
                name="total_price_all"
                id="total_price_all"
                Value={totalPrice}
              />
              <button className="checkout-cta" type="submit" name="pay_button">
                Complete transaction
              </button>
            </div>
          </form>
        </div>
      </aside>
    </main>
  );
}

export default CartView;
