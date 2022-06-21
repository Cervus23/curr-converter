import { useEffect, useState } from "react";
import { Currency } from "./types/currency";
import Header from "./components/Header/index.tsx";
import Main from "./components/Main/index.tsx";

const App = () => {
  const [exchangeRate, setExchangeRate] = useState<Currency[]>([]);

  useEffect(() => {
    fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExchangeRate(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(exchangeRate);
  }, [exchangeRate]);

  return (
    <div className="App">
      <Header
        rate={exchangeRate.filter(
          (currency) => currency.ccy === "USD" || currency.ccy === "EUR"
        )}
      />
      <Main
        rate={exchangeRate.filter(
          (currency) => currency.ccy !== "BTC" && currency.ccy !== "RUR"
        )}
      />
    </div>
  );
};

export default App;
