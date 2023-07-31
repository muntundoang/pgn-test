const dateConvert = (date) => {
  const options = {
    timeZone: "Asia/Jakarta",
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    dateStyle: "long",
    // timeStyle: "long",
    hour12: false,
  };
  const string = date.toLocaleString("id-ID", options);
  return string;
};

export default dateConvert;
