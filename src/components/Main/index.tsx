import { useRef, useState } from "react";
import { Currency } from "../../types/currency";
// import style from "./style.module.scss";

const Main = (props: { rate: Currency[] }) => {
  const input = useRef(null);
  const output = useRef(null);

  const [inputCurr, setInputCurr] = useState("");
  const [outputCurr, setOutputCurr] = useState("");

  return (
    <div>
      <div>
        <input placeholder="enter a value" type="number" ref={input}></input>
        <select onChange={(e) => setInputCurr(e.target.value)}>
          <option value="">Choose a currency type</option>
          <option value="UAH">UAH</option>
          {props.rate.map((currency) => (
            <option value={currency.ccy} key={currency.ccy}>
              {currency.ccy}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input placeholder="enter a value" type="number" ref={output}></input>
        <select onChange={(e) => setOutputCurr(e.target.value)}>
          <option value="">Choose a currency type</option>
          <option value="UAH">UAH</option>
          {props.rate.map((currency) => (
            <option value={currency.ccy} key={currency.ccy}>
              {currency.ccy}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Main;
