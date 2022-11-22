document.body.innerHTML = `
<div class="header-container">
  <div class='text-center'>
    <h1 id="title" class="text-center mt-4">Makeup brands</h1>
  </div>
    <input type="search" class="form-control rounded search-field" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <div class="main-container"></div>
`;

let makeupStore = [];

// Get the makeup details
const getMakeupDetails = async () => {
  try {
    let data = await fetch("./makeup.json");
    let makeupProducts = await data.json();
    for (let i = 100; i < 300; i++) {
      makeupStore.push(makeupProducts[i]);
      renderMakeupProducts(makeupProducts[i]);
    }
    console.log(makeupStore);
  } catch (err) {
    console.log(err);
  }
};
getMakeupDetails();

const renderMakeupProducts = (makeup) => {
  let mainContainer = document.querySelector(".main-container");
  mainContainer.innerHTML += `
  <div class="container">
      <h3 class="brand">${makeup.brand}</h3>
      <div class="image">
        <img
          src="${makeup.image_link}"
          onerror="this.src='./img/noimage.jpg'"
          alt="${makeup.name}"
          class="image-icon"
        />
      </div>
      <div class="nameLink">
      <q class="name">${makeup.name}</q>
      <a href="${
        makeup.product_link
      }" class="plink" target='_blank'>Buy now <i class="bi bi-box-arrow-up-right"></i></a>
        </div>
        <p class="price">${makeup.price_sign}${makeup.price}</p>
        <div class="descbox">
        <p class='about'>Description:</p>
        <p class="description">${
          makeup.description ? makeup.description : "No description found!"
        }</p>
      </div>
    </div>
  `;
};

let search = document.querySelector(".search-field");
search.addEventListener("keyup", (e) => {
  e.preventDefault();
  let searchField = document.querySelector(".search-field").value;
  let filteredData = [];

  if (searchField !== "") {
    filteredData = makeupStore.filter(
      (makeup) =>
        makeup.brand.toLowerCase().includes(searchField.toLowerCase()) ||
        makeup.name.includes(searchField.toLowerCase())
    );

    //
    if (filteredData.length !== 0) {
      document.querySelector(".main-container").innerHTML = "";
    }
    for (let data of filteredData) {
      renderSearchData(data, searchField);
    }
  } else {
    alert("No such makeup brand found!");
  }
});

const renderSearchData = (makeup, textEntered) => {
  let mainContainer = document.querySelector(".main-container");
  // mainContainer.innerHTML = "";
  mainContainer.innerHTML += `
  <div class="container">
    <h3 class="brand">${
      makeup.brand !== textEntered
        ? makeup.brand
        : `<mark>${makeup.brand}</mark>`
    }</h3>
    <div class="image">
      <img
        src="${makeup.image_link}"
        onerror="this.src='./img/noimage.jpg'"
        alt="${makeup.name}"
        class="image-icon"
      />
    </div>
    <div class="nameLink">
    <q class="name">${
      makeup.name !== textEntered ? makeup.name : `<mark>${makeup.name}</mark>`
    }</q>
    <a href="${
      makeup.product_link
    }" class="plink" target='_blank'>Buy now <i class="bi bi-box-arrow-up-right"></i></a>
      </div>
      <p class="price">${makeup.price_sign}${makeup.price}</p>
      <div class="descbox">
      <p class='about'>Description:</p>
      <p class="description">${
        makeup.description ? makeup.description : "No description found!"
      }</p>
    </div>
  </div>
  `;
};

// searchedText = searchedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// let pattern = new RegExp(`${searchedText}`, "gi");

// mainCont.innerHTML = mainCont.textContent.replace(
//   pattern,
//   (match) => `<mark>${match}</mark>`
// );
