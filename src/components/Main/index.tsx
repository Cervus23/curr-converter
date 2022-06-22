import { useRef, useState } from "react";
import { Currency } from "../../types/currency";
import style from "./style.module.scss";

const Main = (props: { rate: Currency[] }) => {
  const uah = { ccy: "UAH", base_ccy: "UAH", buy: "1", sale: "1" };

  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLInputElement>(null);

  const inputSelect = useRef<HTMLSelectElement>(null);
  const outputSelect = useRef<HTMLSelectElement>(null);

  const [inputCurr, setInputCurr] = useState<Currency>(uah);
  const [outputCurr, setOutputCurr] = useState<Currency>(uah);

  const convert = (value: number, direction: "direct" | "reverse") => {
    const convertFrom = direction === "direct" ? inputCurr : outputCurr;
    const convertTo = direction === "direct" ? outputCurr : inputCurr;

    let result = 0;

    // Conversion from UAH to other currency
    if (convertFrom.ccy === "UAH" && convertTo.ccy !== "UAH") {
      result = +parseFloat((value / parseFloat(convertTo.sale)).toFixed(2));
    }
    // Conversion from other currency to UAH
    if (convertFrom.ccy !== "UAH" && convertTo.ccy === "UAH") {
      result = +parseFloat((value * parseFloat(convertFrom.buy)).toFixed(2));
    }
    // Conversion between other currencies (There is double-conversion because the base currency is UAH)
    else {
      result = +parseFloat(
        (
          (value * parseFloat(convertFrom.buy)) /
          parseFloat(convertTo.sale)
        ).toFixed(2)
      );
    }

    if (direction === "direct") {
      output.current!.value = `${result}`;
    } else {
      input.current!.value = `${result}`;
    }
  };

  const selectionHandler = (value: string, selectType: "input" | "output") => {
    switch (true) {
      case selectType === "input" && value === outputSelect.current!.value:
        setOutputCurr(uah);

        outputSelect.current!.value = "UAH";
        break;

      case selectType === "output" && value === inputSelect.current!.value:
        setInputCurr(uah);

        inputSelect.current!.value = "UAH";
        break;

      case selectType === "input" &&
        value !== outputSelect.current!.value &&
        value === "UAH":
        setInputCurr(uah);
        break;

      case selectType === "output" &&
        value !== inputSelect.current!.value &&
        value === "UAH":
        setOutputCurr(uah);
        break;

      case selectType === "input" && value !== outputSelect.current!.value:
        setInputCurr(
          props.rate.filter((currency) => currency.ccy === value)[0]
        );
        break;

      case selectType === "output" && value !== inputSelect.current!.value:
        setOutputCurr(
          props.rate.filter((currency) => currency.ccy === value)[0]
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className={style.main}>
      <h1>Currency converter</h1>
      <div className={style.inputBox}>
        <p>from:</p>
        <input
          type="number"
          ref={input}
          onChange={(e) => convert(e.target.valueAsNumber, "direct")}
          defaultValue={0}
        />
        <select
          onChange={(e) => selectionHandler(e.target.value, "input")}
          ref={inputSelect}
        >
          <option value="UAH">UAH</option>
          {props.rate.map((currency) => (
            <option value={currency.ccy} key={currency.ccy}>
              {currency.ccy}
            </option>
          ))}
        </select>
      </div>
      <div className={style.inputBox}>
        <p>to:</p>
        <input
          type="number"
          ref={output}
          onChange={(e) => convert(e.target.valueAsNumber, "reverse")}
          defaultValue={0}
        />
        <select
          onChange={(e) => selectionHandler(e.target.value, "output")}
          ref={outputSelect}
        >
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
