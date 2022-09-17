import { useState, useEffect } from "react";
import axios from "axios";
import "../../../../css/shop_cart.css";
import CartViewCom from "./cart_view_com";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import link from "../../../../config/const";
import GenerateRandomCode from "react-random-code-generator";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

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

  const [voucherPrice, setVoucher] = useState([]);
  const search = useLocation().search;
  const [listState3, setListState3] = useState();

  const [voucherChoose, setVChoose] = useState(0);
  const [isSubmitting, setSubmitting] = useState();

  const [address, setAddress] = useState(props.address ?? "");
  //console.log(tempCart);

  //Fetch data session

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

  const totalPrice = tempCart?.reduce(
    (total, currentValue) =>
      (total =
        parseInt(total) +
        parseInt(currentValue.total_price) * parseFloat(currentValue.rate)),
    0
  );

  function find_author(author_id) {
    return listState2?.find((element) => {
      return element?.WpAuthor.id === author_id;
    });
  }

  function find_voucher(voucher_id) {
    return listState3?.find((element) => {
      return element?.WpVoucher.id === voucher_id;
    });
  }

  function empty_cart() {
    if (tempCart?.length === 0)
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

  //console.log(totalPrice);
  //console.log(voucherChoose);

  useEffect(() => {
    setItemNum(JSON.parse(localStorage.getItem("cart") || "[]")?.length);
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  useEffect(() => {
    var temp = [];
    tempCart?.map((item, index) => {
      if (item.discount !== null && item.discount !== undefined) {
        var b = item.discount?.split(";").filter((item) => item !== "");
        //console.log(b);
        temp = temp.concat(b.filter((item) => temp.indexOf(item) === -1));
      }

      setVoucher(temp);

      //console.log(temp.indexOf('3'));
      //console.log(voucherPrice);
    });
  }, [listState3]);

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: link.server_link + "controller/cart/create.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Order complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "buy_log/list";
    }, 2000);
  };

  useEffect(() => {
    if (parseInt(result) >= 1) {
      alert("Order complete!!");
      setResult("-1");
      localStorage.setItem("cart", []);
      window.location.href = link.client_link + "buy_log/list";
    }
  }, [result]);

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
          rate={item.rate}
          discount={item.discount}
        ></CartViewCom>
      </div>
    );
  });

  const itemmap2 = voucherPrice?.map((item, index) => {
    var voucher = listState3?.find((element) => {
      return element.WpVoucher.id === item;
    });
    if (
      parseInt(totalPrice) >= parseInt(voucher?.WpVoucher.threshold) &&
      parseInt(voucher?.WpVoucher.threshold) > 0
    ) {
      return (
        <MenuItem
          value={voucher?.WpVoucher.id}
          disabled={totalPrice > voucher?.WpVoucher.threshold ? false : true}
        >
          {voucher?.WpVoucher.name}: Get -{voucher?.WpVoucher.discount}đ on{" "}
          {voucher?.WpVoucher.threshold}đ order
        </MenuItem>
      );
    }
  });
  return (
    <main>
      <form method="post" onSubmit={(e) => handleSubmitM(e)}>
        <div className="basket">
          <div className="basket-module">
            {parseInt(result) === 0 && (
              <Alert severity="error" style={{ marginBottom: "20px" }}>
                Order failed
              </Alert>
            )}
            <InputLabel id="demo-simple-select-label">Voucher</InputLabel>
            <Select
              labelId="voucher_id"
              id="voucher_id"
              name="voucher_id"
              fullWidth
              value={voucherChoose}
              label="Voucher"
              defaultValue={0}
              onChange={(event) => {
                setVChoose(event.target.value);
              }}
              placeholder={"--Choose--"}
            >
              <MenuItem value={0}>--NONE--</MenuItem>
              {itemmap2}
            </Select>
          </div>
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
              <a
                href="../../main_page/main/list.php"
                style={{ marginLeft: "15px" }}
              >
                Turn back
              </a>
            </div>
            <div className="summary-subtotal">
              <div className="subtotal-title">Total price:</div>
              <div className="subtotal-value final-value" id="basket-subtotal">
                {totalPrice -
                  parseInt(
                    find_voucher(voucherChoose)?.WpVoucher.discount ?? 0
                  ) ?? 0}{" "}
                {voucherChoose > 0 && (
                  <span
                    style={{
                      fontStyle: "italic",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    (Discount{" "}
                    {parseInt(
                      find_voucher(voucherChoose)?.WpVoucher.discount
                    ) ?? 0}
                    đ)
                  </span>
                )}
              </div>
              <div className="summary-promo hide">
                <div className="promo-title">Promotion</div>
                <div className="promo-value final-value" id="basket-promo" />
              </div>
            </div>

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
                {totalPrice -
                  parseInt(
                    find_voucher(voucherChoose)?.WpVoucher.discount ?? 0
                  ) ?? 0}
              </div>
            </div>
            <div className="summary-checkout">
              <input
                type="hidden"
                name="emailS"
                id="emailS"
                Value={localStorage.getItem("email")}
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
              <button
                className="checkout-cta"
                type="submit"
                name="pay_button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Complete transaction"}
              </button>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}

export default CartView;
