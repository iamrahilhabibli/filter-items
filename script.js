const apartmentsContainer = document.querySelector(".apartments__container");

const minprice = document.querySelector("#minprice");
const maxprice = document.querySelector("#maxprice");
const minSpan = document.querySelector(".minSpan");
const maxSpan = document.querySelector(".maxSpan");

minprice.addEventListener("change", (e) => {
  const minPriceValue = parseInt(e.target.value);
  const maxPriceValue = parseInt(maxprice.value);

  if (minPriceValue > maxPriceValue) {
    minprice.value = maxPriceValue - 1;
    minSpan.innerText = maxPriceValue - 1;
    console.log(maxPriceValue);
  } else {
    minSpan.innerText = minPriceValue;
  }
});

maxprice.addEventListener("change", (e) => {
  const maxPriceValue = parseInt(e.target.value);
  const minPriceValue = parseInt(minprice.value);

  if (maxPriceValue < minPriceValue) {
    maxprice.value = minPriceValue + 1;
    maxSpan.innerText = minPriceValue + 1;
  } else {
    maxSpan.innerText = maxPriceValue;
  }
});
function renderAllApartments() {
  apartments.forEach((apartment) => {
    const apartmentCard = generateApartment(apartment);
    apartmentsContainer.appendChild(apartmentCard);
  });
}

function renderApartments() {
  apartmentsContainer.innerHTML = "";

  const selectedRooms = [
    ...document.querySelectorAll(
      '.filter__items input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => parseInt(checkbox.id));
  console.log(selectedRooms);
  if (selectedRooms.length == 0) {
    renderAllApartments();
  }

  const filteredApartments = apartments.filter((apartment) =>
    selectedRooms.includes(apartment.rooms)
  );

  filteredApartments.forEach((apartment) => {
    const apartmentCard = generateApartment(apartment);
    apartmentsContainer.appendChild(apartmentCard);
  });
}

const roomCheckboxes = document.querySelectorAll(
  '.filter__items input[type="checkbox"]'
);
roomCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", renderApartments);
});

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
renderAllApartments();
