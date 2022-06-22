import { Currency } from "../../types/currency";
import style from "./style.module.scss";

const Header = (props: { rate: Currency[] }) => {
  return (
    <header className={style.header}>
      {props.rate.map((currency: Currency) => (
        <div key={currency.ccy} className={style.currencyInfo}>
          {currency.ccy}: {currency.buy} / {currency.sale}
        </div>
      ))}
    </header>
  );
};

export default Header;
