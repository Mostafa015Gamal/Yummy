/// <reference types="./@types/jquery"/>
let closeModel = document.getElementById("closeModel");
let openModel = document.getElementById("openModel");
let inputSearchByName = document.getElementById("inputSearchByName");
let inputSearchByFirstLetter = document.getElementById(
  "inputSearchByFirstLetter"
);
let anchorSearch = document.getElementById("anchorSearch");

//!============= open model ============
function open() {
  $("#menuSlideBar").animate({ left: "0px" }, 500);

  $("#anchorSearch").animate(
    {
      top: 0,
    },
    500
  );
  $("#anchorCategories").animate(
    {
      top: 0,
    },
    600
  );
  $("#anchorArea").animate(
    {
      top: 0,
    },
    700
  );
  $("#anchorIngredients").animate(
    {
      top: 0,
    },
    800
  );
  $("#anchorContactUs").animate(
    {
      top: 0,
    },
    900
  );

  $("#openModel").addClass("d-none");
  $("#closeModel").removeClass("d-none");
}
//!========== close model ============

function close() {
  let widthSlideBar = $("#slideBar").outerWidth();
  $("#menuSlideBar").animate({ left: -widthSlideBar }, 500);

  $("#slideBar ul li").animate(
    {
      top: 300,
    },
    500
  );

  $("#closeModel").addClass("d-none");
  $("#openModel").removeClass("d-none");
}

//?======== open & close Icon =========
openModel.addEventListener("click", function () {
  open();
});
closeModel.addEventListener("click", function () {
  close();
});

//!============= first meals ===========

async function getApiShowFirst() {
  close();
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let result = await data.json();
  console.log(result);
  displayShowFirst(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}
getApiShowFirst();

function displayShowFirst(data) {
  box = "";

  for (let i = 0; i < data.length; i++) {
    box += `
    
    <div class="col-md-3" onclick="getApiDetails(${data[i].idMeal})">
    <div
              class="cardImg rounded-2 position-relative p-0 overflow-hidden"
            >
              <img
                src="${data[i].strMealThumb}"
                class="w-100 rounded-2"
                alt=""
              />
              <div
                class="layer rounded-2 position-absolute d-flex justify-content-center align-items-center"
              >
                <h3 class="text-capitalize text-black">${data[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }
  document.getElementById("divRow").innerHTML = box;
}

//?========== meals details ==========

async function getApiDetails(mealId) {
  close();
  console.log(mealId);
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  $("#divHome").addClass("d-none");
  $("#divArea").addClass("d-none");
  $("#divCategories").addClass("d-none");
  $("#divSearch").addClass("d-none");
  $("#divIngredients").addClass("d-none");
  $("#divDetails").removeClass("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let result = await data.json();
  displayDetails(result.meals[0]);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayDetails(data) {
  let Measure = "";

  for (let i = 0; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      Measure += `<li class="bg-info-subtle p-2 mb-3 rounded-2 mx-1"> ${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = data.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  box = "";
  box += `
    <div class="col-md-4">
            <img
              src="${data.strMealThumb}"
              class="w-100 rounded-2"
              alt=""
            />
            <p class="fs-3 fw-bold">${data.strMeal}  </p>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
              ${data.strInstructions}
            </p>
            <ul class="list-unstyled fs-3 fw-bold text-capitalize">
              <li>Area : ${data.strArea}</li>
              <li>Category : ${data.strCategory}</li>
              <li>Recipes :</li>
            </ul>
            <ul class="list-unstyled text-dark recipes d-flex flex-wrap">
              ${Measure}
            </ul>
            <p class="fs-3 fw-bold text-capitalize">tags :</p>
            <ul class="list-unstyled recipes d-flex">
              ${tagsStr}
            </ul>
            <div class="text-capitalize">
              <button class="btn btn-primary">
                <a href="${data.strSource}" target="_blank" class="text-white text-decoration-none">Source</a>
              </button>
              <button class="btn btn-danger">
                <a href="${data.strYoutube}" target="_blank" class="text-white text-decoration-none">Youtube</a>
              </button>
            </div>
          </div>
    `;
  document.getElementById("rowDetails").innerHTML = box;
}

//!============ search by name and letter ========

async function searchByNameApi(name) {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let result = await data.json();
  if (result.meals) displayShowFirst(result.meals);
  else displayShowFirst([]);
  console.log(result);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

async function searchByFirstLitterApi(letter) {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);

  if (letter == "") letter = "k";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let result = await data.json();
  displayShowFirst(result.meals);
  console.log(result);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

inputSearchByName.addEventListener("input", function (e) {
  close();
  searchByNameApi(e.target.value);
  $("#divRow").removeClass("d-none");
});

inputSearchByFirstLetter.addEventListener("input", function (e) {
  close();
  searchByFirstLitterApi(e.target.value);
  $("#divRow").removeClass("d-none");
});

anchorSearch.addEventListener("click", function () {
  close();
  $("#divDetails").addClass("d-none");
  $("#divArea").addClass("d-none");
  $("#divCategories").addClass("d-none");
  $("#divIngredients").addClass("d-none");
  $("#divContactUs").addClass("d-none");
  $("#divHome").removeClass("d-none");
  $("#divSearch").removeClass("d-none");
});

//?=========== category & meals details =========

async function getCategoryApi() {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let result = await data.json();
  console.log(result.categories);
  displayCategories(result.categories);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayCategories(data) {
  box = "";
  for (let i = 0; i < data.length; i++) {
    box += `
    <div class="col-md-3" onclick="getMealsByCategories('${data[i].strCategory}')">
              
            <div
              class="cardImg rounded-2 position-relative p-0 overflow-hidden"
            >
              <img src="${data[i].strCategoryThumb}" class="w-100 rounded-2" alt="" />
              <div class="layer rounded-2 position-absolute text-center py-2">
                <h3 class="text-capitalize text-black">${data[i].strCategory}</h3>
                <p class="p-2">
                  ${data[i].strCategoryDescription}
                </p>
              </div>
            </div>
          </div>
    `;
  }
  document.getElementById("rowCategories").innerHTML = box;
}

anchorCategories.addEventListener("click", function () {
  close();
  $("#divDetails").addClass("d-none");
  $("#divSearch").addClass("d-none");
  $("#divHome").addClass("d-none");
  $("#divArea").addClass("d-none");
  $("#divIngredients").addClass("d-none");
  $("#divContactUs").addClass("d-none");
  $("#divCategories").removeClass("d-none");

  getCategoryApi();
});

async function getMealsByCategories(nameCategory) {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameCategory}`
  );
  let result = await data.json();
  console.log(result.meals);
  displayMealsCategories(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayMealsCategories(data) {
  box = "";
  if (data.length > 20) data.length = 20;
  for (let i = 0; i < data.length; i++) {
    box += `
    
    <div class="col-md-3" onclick="getApiDetails(${data[i].idMeal})">
    <div
              class="cardImg rounded-2 position-relative p-0 overflow-hidden"
            >
              <img
                src="${data[i].strMealThumb}"
                class="w-100 rounded-2"
                alt=""
              />
              <div
                class="layer rounded-2 position-absolute d-flex justify-content-center align-items-center"
              >
                <h3 class="text-capitalize text-black">${data[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }
  document.getElementById("rowCategories").innerHTML = box;
}

//!========= area & meals in this area & meals details =========

async function getAreaApi() {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let result = await data.json();
  console.log(result.meals);
  displayArea(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayArea(data) {
  box = ``;
  for (let i = 0; i < data.length; i++) {
    box += `
    <div class="col-md-3 col-sm-6 color-div-area d-flex justify-content-center align-items-center flex-column text-white" onclick="getMealAreaApi('${data[i].strArea}')">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${data[i].strArea}</h3>
    </div>
    `;
  }
  document.getElementById("rowArea").innerHTML = box;
}

anchorArea.addEventListener("click", function () {
  close();
  $("#divDetails").addClass("d-none");
  $("#divSearch").addClass("d-none");
  $("#divCategories").addClass("d-none");
  $("#divHome").addClass("d-none");
  $("#divIngredients").addClass("d-none");
  $("#divContactUs").addClass("d-none");
  $("#divArea").removeClass("d-none");

  getAreaApi();
});

async function getMealAreaApi(area) {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let result = await data.json();
  console.log(result.meals);
  displayMealArea(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayMealArea(data) {
  box = "";
  if (data.length > 20) data.length = 20;
  for (let i = 0; i < data.length; i++) {
    box += `
    
    <div class="col-md-3" onclick="getApiDetails(${data[i].idMeal})">
    <div
              class="cardImg rounded-2 position-relative p-0 overflow-hidden"
            >
              <img
                src="${data[i].strMealThumb}"
                class="w-100 rounded-2"
                alt=""
              />
              <div
                class="layer rounded-2 position-absolute d-flex justify-content-center align-items-center"
              >
                <h3 class="text-capitalize text-black">${data[i].strMeal}</h3>
              </div>
            </div>
          </div>
    `;
  }
  document.getElementById("rowArea").innerHTML = box;
}

//?========= ingredients & meals in this ingredients & meals details =========

async function getIngredientsApi() {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let result = await data.json();
  console.log(result.meals);
  displayIngredients(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayIngredients(data) {
  box = "";
  for (let i = 0; i < 20; i++) {
    box += `
    <div class="col-md-3 text-center text-white" onclick="getMealsIngredients('${
      data[i].strIngredient
    }');">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>
            ${data[i].strDescription.split(" ").slice(0, 20).join(" ")}
            </p>
          </div>`;
  }
  document.getElementById("rowIngredients").innerHTML = box;
}
anchorIngredients.addEventListener("click", function () {
  close();
  $("#divDetails").addClass("d-none");
  $("#divSearch").addClass("d-none");
  $("#divCategories").addClass("d-none");
  $("#divHome").addClass("d-none");
  $("#divArea").addClass("d-none");
  $("#divContactUs").addClass("d-none");
  $("#divIngredients").removeClass("d-none");
  getIngredientsApi();
});

async function getMealsIngredients(Ingredient) {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`
  );
  let result = await data.json();
  console.log(result.meals);
  displayMealsIngredients(result.meals);
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function displayMealsIngredients(data) {
  box = "";

  for (let i = 0; i < data.length; i++) {
    box += `
      
      <div class="col-md-3" onclick="getApiDetails(${data[i].idMeal})">
      <div
                class="cardImg rounded-2 position-relative p-0 overflow-hidden"
              >
                <img
                  src="${data[i].strMealThumb}"
                  class="w-100 rounded-2"
                  alt=""
                />
                <div
                  class="layer rounded-2 position-absolute d-flex justify-content-center align-items-center"
                >
                  <h3 class="text-capitalize text-black">${data[i].strMeal}</h3>
                </div>
              </div>
            </div>
      `;
  }
  document.getElementById("rowIngredients").innerHTML = box;
}

//!============== validation in contact us page ==============

anchorContactUs.addEventListener("click", function () {
  close();
  $("#divDetails").addClass("d-none");
  $("#divSearch").addClass("d-none");
  $("#divCategories").addClass("d-none");
  $("#divHome").addClass("d-none");
  $("#divArea").addClass("d-none");
  $("#divIngredients").addClass("d-none");
  $("#divContactUs").removeClass("d-none");
  displayInputs();
});
function displayInputs() {
  $("#spinner").removeClass("d-none");
  $("#spinner").fadeIn(500);
  box = "";
  box += `
  <div class="col-md-6">
            <input
              type="text"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Name"
              id="nameInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="nameAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">
                Special characters and numbers not allowed
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="email"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Email"
              id="emailInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="emailAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">
                Email not valid *exemple@yyy.zzz
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="tel"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Number"
              id="numberInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="numberAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">
                Enter valid Phone Number
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="number"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Number"
              id="ageInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="ageAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">Enter valid age</p>
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="password"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Number"
              id="passwordInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="passwordAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">
                Enter valid password *Minimum eight characters, at least one
                letter and one number:*
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <input
              type="password"
              class="w-100 rounded-3 p-2 text-black"
              placeholder="Enter Your Number"
              id="rePasswordInput"
              onkeyup="inputsValidation()"
            />
            <div
              class="d-flex justify-content-center align-items-center bg-danger-subtle rounded-3 py-3 mt-2 d-none"
              id="rePasswordAlert"
            >
              <p class="m-0 px-4 text-danger-emphasis">
                Enter valid repassword
              </p>
            </div>
          </div>
          <button
            class="btn text-capitalize m-auto mt-4 text-danger"
            id="buttonDisabled"
            disabled
          >
            submit
          </button>
  `;
  document.getElementById("rowInputs").innerHTML = box;

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("numberInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("rePasswordInput").addEventListener("focus", () => {
    rePasswordInputTouched = true;
  });
  $("#spinner").fadeOut(500);
  $("#spinner").addClass("d-none");
}

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.add("d-none");
    } else {
      document.getElementById("nameAlert").classList.remove("d-none");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.add("d-none");
    } else {
      document.getElementById("emailAlert").classList.remove("d-none");
    }
  }
  if (phoneInputTouched) {
    if (numberValidation()) {
      document.getElementById("numberAlert").classList.add("d-none");
    } else {
      document.getElementById("numberAlert").classList.remove("d-none");
    }
  }
  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.add("d-none");
    } else {
      document.getElementById("ageAlert").classList.remove("d-none");
    }
  }
  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.add("d-none");
    } else {
      document.getElementById("passwordAlert").classList.remove("d-none");
    }
  }
  if (rePasswordInputTouched) {
    if (rePasswordValidation()) {
      document.getElementById("rePasswordAlert").classList.add("d-none");
    } else {
      document.getElementById("rePasswordAlert").classList.remove("d-none");
    }
  }
  if (
    nameValidation() &&
    emailValidation() &&
    numberValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    document.getElementById("buttonDisabled").removeAttribute("disabled");
    console.log(true);
  } else {
    document.getElementById("buttonDisabled").setAttribute("disabled", true);
    console.log(false);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function numberValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("numberInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function rePasswordValidation() {
  return (
    document.getElementById("rePasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
