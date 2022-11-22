document.body.innerHTML = `
<div class="header-container">
  <div class='text-center'>
    <h1 id="title" class="text-center mt-4">Makeup brands</h1>
  </div>
  <input
    type="search"
    class="search-field form-control mt-5"
    placeholder="Search your product"
  />
  </div>
  <div class="main-container"></div>
`;

// {
//   <i class="bi bi-link"></i>
// }
// Get the makeup details
const getMakeupDetails = async () => {
  try {
    let data = await fetch("./makeup.json");
    let makeupProducts = await data.json();
    for (let i = 100; i < 300; i++) {
      renderMakeupProducts(makeupProducts[i]);
    }
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

let searchField = document.querySelector(".search-field");
searchField.addEventListener("keyup", (e) => {
  e.preventDefault();
  let textSearched = searchField.value;
  let mainCont = document.querySelector(".main-container");

  textSearched = textSearched.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let pattern = new RegExp(`${textSearched}`, "gi");

  mainCont.innerHTML = mainCont.replace(
    pattern,
    (match) => `<mark>${match}</mark>`
  );
});
