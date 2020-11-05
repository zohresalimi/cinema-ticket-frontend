export default (value) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  })
    .format(value)
    .replace(" ", " ");
