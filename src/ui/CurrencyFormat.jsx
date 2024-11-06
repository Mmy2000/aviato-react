import React from "react";
import { NumericFormat } from "react-number-format";

export default function CurrencyFormat({ className, value }) {
  return (
    <NumericFormat
      className={`tracking-wider font-normal dark:bg-transparent inline-flex max-w-[160px] outline-none ${className || ""}`}
      prefix="$"
      value={value}
      decimalScale={3}
      thousandSeparator=","
      decimalSeparator="."
    />
  );
}
