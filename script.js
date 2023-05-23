const apartmentsContainer = document.querySelector(".apartments__container");

const minprice = document.querySelector("#minprice");
const maxprice = document.querySelector("#maxprice");
const minSpan = document.querySelector("minSpan");

minprice.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function renderApartments() {
  apartments.forEach((apartment) => {
    const apartmentCard = generateApartment(apartment);
    apartmentsContainer.appendChild(apartmentCard);
  });
}

function generateApartment(apartments) {
  const card = document.createElement("div");
  card.innerHTML = `  <div class="card">
  <span>ID: <span class="id">${apartments.id}</span></span>
  <span>Price: <span class="price">${apartments.price}</span></span>
  <span>Area: <span class="area">${apartments.area}</span></span>
  <span>Rooms: <span class="rooms">${apartments.rooms}</span> </span>
</div>`;
  return card;
}
renderApartments();
