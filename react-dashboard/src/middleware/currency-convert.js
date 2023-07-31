const currencyConvert = (num) => {
  const options = {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  };
  return num.toLocaleString("id-ID", options);
};

export default currencyConvert
