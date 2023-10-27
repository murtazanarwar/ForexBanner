import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./Card/Card";
import "./Cards.css";

function Cards() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL =
      "http://api.currencylayer.com/live?access_key=d8eeb01f8cbb0ff3dc0412ae743e395a&format=1"; //&currencies=USD,INR,GBP,EUR,JPY,AUD,CAD

    axios
      .get(API_URL)
      .then((response) => {
        setExchangeRates(response.data.quotes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ color: "white" }}>Exchange Rates</h1>
        </div>
        <div>
          <h4 style={{ color: "white" }}>from USD</h4>
        </div>
      </div>
      <div className="cards">
        {loading ? (
          <p style={{ color: "white" }}>loading...</p>
        ) : (
          Object.entries(exchangeRates).map(([currencyPair, rate]) => (
            <Card
              targetValue={rate}
              key={currencyPair}
              currencyPair={currencyPair}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Cards;
