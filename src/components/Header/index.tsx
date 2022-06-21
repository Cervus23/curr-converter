import { Currency } from "../../types/currency";
// import styles from './style.module.scss'

const Header = (props: { rate: Currency[] }) => {
  return (
    <header>
      {props.rate.map((currency: Currency) => (
        <div key={currency.ccy}>
          {currency.ccy}: {currency.buy} / {currency.sale}
        </div>
      ))}
    </header>
  );
};

export default Header;
