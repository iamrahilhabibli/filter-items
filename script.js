const minprice = document.querySelector("#minprice");
const maxprice = document.querySelector("#maxprice");
const minSpan = document.querySelector("minSpan");

minprice.addEventListener("change", (e) => {
  console.log(e.target.value);
});
