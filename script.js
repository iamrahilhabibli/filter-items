const apartmentsContainer = document.querySelector(".apartments__container");

const minprice = document.querySelector("#minprice");
const maxprice = document.querySelector("#maxprice");
const minSpan = document.querySelector(".minSpan");
const maxSpan = document.querySelector(".maxSpan");

const minarea = document.querySelector("#minarea");
const maxarea = document.querySelector("#maxarea");
const minAreaSpan = document.querySelector(".minAreaSpan");
const maxAreaSpan = document.querySelector(".maxAreaSpan");

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const resetBtn = document.querySelector(".reset");

const initialMinPrice = parseInt(minprice.defaultValue);
const initialMaxPrice = parseInt(maxprice.defaultValue);
const initialMinArea = parseInt(minarea.defaultValue);
const initialMaxArea = parseInt(maxarea.defaultValue);

console.log(initialMaxPrice);
console.log(initialMinPrice);
minprice.addEventListener("input", (e) => {
  const minPriceValue = parseInt(e.target.value);
  const maxPriceValue = parseInt(maxprice.value);

  if (minPriceValue > maxPriceValue) {
    minprice.value = maxPriceValue;
    minSpan.textContent = maxPriceValue;
  } else {
    minSpan.textContent = minPriceValue;
  }
  priceRenderApartments();
});

maxprice.addEventListener("input", (e) => {
  const maxPriceValue = parseInt(e.target.value);
  const minPriceValue = parseInt(minprice.value);

  if (maxPriceValue < minPriceValue) {
    maxprice.value = minPriceValue;
    maxSpan.textContent = minPriceValue;
  } else {
    maxSpan.textContent = maxPriceValue;
  }

  priceRenderApartments();
});

minarea.addEventListener("change", (e) => {
  const minAreaValue = parseInt(e.target.value);
  const maxAreaValue = parseInt(maxarea.value);
  if (minAreaValue > maxAreaValue) {
    minarea.value = maxAreaValue - 1;
    minAreaSpan.innerText = maxAreaValue - 1;
  } else {
    minAreaSpan.innerText = minAreaValue;
  }
  areaRenderApartments();
});

maxarea.addEventListener("change", (e) => {
  const maxAreaValue = parseInt(e.target.value);
  const minAreaValue = parseInt(minarea.value);

  if (minAreaValue > maxAreaValue) {
    maxarea.value = minAreaValue + 1;
    maxAreaSpan.innerText = minAreaValue + 1;
  } else {
    maxAreaSpan.innerText = maxAreaValue;
  }
  areaRenderApartments();
});

resetBtn.addEventListener("click", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  minprice.value = initialMinPrice;
  minSpan.innerText = initialMinPrice;
  maxprice.value = initialMaxPrice;
  maxSpan.innerText = initialMaxPrice;

  minarea.value = initialMinArea;
  minAreaSpan.innerText = initialMinArea;
  maxarea.value = initialMaxArea;
  maxAreaSpan.innerText = initialMaxArea;
  renderAllApartments();
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

function priceRenderApartments() {
  apartmentsContainer.innerHTML = "";

  const minPrice = parseInt(minprice.value);
  const maxPrice = parseInt(maxprice.value);
  if (minPrice <= maxPrice) {
    const priceFilteredApartments = apartments.filter((apartment) => {
      return apartment.price >= minPrice && apartment.price <= maxPrice;
    });

    priceFilteredApartments.forEach((apartment) => {
      const apartmentCard = generateApartment(apartment);
      apartmentsContainer.appendChild(apartmentCard);
    });
  }
}
function areaRenderApartments() {
  apartmentsContainer.innerHTML = "";

  const minArea = parseInt(minarea.value);
  const maxArea = parseInt(maxarea.value);

  if (minArea <= maxArea) {
    const areaFilteredApartments = apartments.filter((apartment) => {
      return apartment.area >= minArea && apartment.area <= maxArea;
    });
    areaFilteredApartments.forEach((apartment) => {
      const apartmentCard = generateApartment(apartment);
      apartmentsContainer.appendChild(apartmentCard);
    });
  }
}

function renderCustomSearch() {
  apartmentsContainer.innerHTML = "";

  const selectedRooms = [
    ...document.querySelectorAll(
      '.filter__items input[type="checkbox"]:checked'
    ),
  ].map((checkbox) => parseInt(checkbox.id));

  const minPrice = parseInt(minprice.value);
  const maxPrice = parseInt(maxprice.value);
  const minArea = parseInt(minarea.value);
  const maxArea = parseInt(maxarea.value);

  const filteredApartments = apartments.filter(
    (apartment) =>
      selectedRooms.includes(apartment.rooms) &&
      apartment.price >= minPrice &&
      apartment.price <= maxPrice &&
      apartment.area >= minArea &&
      apartment.area <= maxArea
  );

  filteredApartments.forEach((apartment) => {
    const apartmentCard = generateApartment(apartment);
    apartmentsContainer.appendChild(apartmentCard);
  });
}
renderAllApartments();

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
