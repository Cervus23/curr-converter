import { useRef, useState, useEffect } from "react";
import { Currency } from "../../types/currency";
// import style from "./style.module.scss";

const Main = (props: { rate: Currency[] }) => {
  const input = useRef(null);
  const output = useRef(null);

  const [inputValue, setInputValue] = useState<number>();
  const [outputValue, setOutputValue] = useState<number>();

  // const [inputSelect, setInputSelect] = useState("");
  // const [outputSelect, setOutputSelect] = useState("");

  const [inputCurr, setInputCurr] = useState<Currency>({
    ccy: "",
    base_ccy: "",
    buy: "",
    sale: "",
  });
  const [outputCurr, setOutputCurr] = useState<Currency>({
    ccy: "",
    base_ccy: "",
    buy: "",
    sale: "",
  });

  // useEffect(() => {
  //   console.log(inputCurr);
  //   console.log(outputCurr);
  // }, [inputCurr, outputCurr]);

  const OnInputChangeHanler = (e) => {
    if (inputCurr.ccy === "UAH" && outputCurr.ccy !== "UAH") {
      const result = +parseFloat(
        (e.target.valueAsNumber / parseFloat(outputCurr.sale)).toFixed(2)
      );
      output.current.value = result;
    }
    if (inputCurr.ccy !== "UAH" && outputCurr.ccy === "UAH") {
      const result = +parseFloat(
        (e.target.valueAsNumber * parseFloat(inputCurr.buy)).toFixed(2)
      );
      output.current.value = result;
    } else {
      const result = +parseFloat(
        (
          (e.target.valueAsNumber * parseFloat(inputCurr.buy)) /
          parseFloat(outputCurr.sale)
        ).toFixed(2)
      );
      output.current.value = result;
    }
  };

  const OnOutputChangeHanler = (e) => {
    if (outputCurr.ccy === "UAH" && inputCurr.ccy !== "UAH") {
      const result = +parseFloat(
        (e.target.valueAsNumber / parseFloat(inputCurr.sale)).toFixed(2)
      );
      input.current.value = result;
    }
    if (outputCurr.ccy !== "UAH" && inputCurr.ccy === "UAH") {
      const result = +parseFloat(
        (e.target.valueAsNumber * parseFloat(outputCurr.buy)).toFixed(2)
      );
      input.current.value = result;
    } else {
      const result = +parseFloat(
        (
          (e.target.valueAsNumber * parseFloat(outputCurr.buy)) /
          parseFloat(inputCurr.sale)
        ).toFixed(2)
      );
      input.current.value = result;
    }
  };

  const OnInputSelectHandler = (e) => {
    switch (e.target.value) {
      case "UAH":
        setInputCurr({ ccy: "UAH", base_ccy: "UAH", buy: "1", sale: "1" });
        break;
      case "":
        setInputCurr({ ccy: "", base_ccy: "", buy: "", sale: "" });
        break;
      default:
        setInputCurr(
          props.rate.filter((currency) => currency.ccy === e.target.value)[0]
        );
        break;
    }
  };

  const OnOutputSelectHandler = (e) => {
    switch (e.target.value) {
      case "UAH":
        setOutputCurr({ ccy: "UAH", base_ccy: "UAH", buy: "1", sale: "1" });
        break;
      case "":
        setOutputCurr({ ccy: "", base_ccy: "", buy: "", sale: "" });
        break;
      default:
        setOutputCurr(
          props.rate.filter((currency) => currency.ccy === e.target.value)[0]
        );
        break;
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="enter a value"
          type="number"
          ref={input}
          onChange={OnInputChangeHanler}
        />
        <select onChange={OnInputSelectHandler}>
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
        <input
          placeholder="enter a value"
          type="number"
          ref={output}
          onChange={OnOutputChangeHanler}
        />
        <select onChange={OnOutputSelectHandler}>
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
