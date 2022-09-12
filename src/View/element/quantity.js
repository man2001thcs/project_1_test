import { useEffect, useState } from "react";
import "../../css/quantity_button.css";

function Quantity(props) {
  const [value, setValue] = useState(1);

  function increment() {
    setValue(value + 1);
  }

  function decrement() {
    if (value > 0) {
      setValue(value - 1);
    }
  }

  return (
    <div>
      <div className="quantity-input">
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={() => increment()}
        >
          &mdash;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={value}
          readonly
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={() => decrement()}
        >
          &#xff0b;
        </button>
      </div>
    </div>
  );
}
export default Quantity;
