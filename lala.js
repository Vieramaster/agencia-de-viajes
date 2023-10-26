/*MENU RESPONSIVE*/
const menuResponsive = document.querySelector(".box2");
const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");

window.addEventListener("resize", () => {
  if (window.innerWidth < 950) {
    btnOpen.style.display = "block";
    btnClose.style.display = "none";
    menuResponsive.style.transform = "translateY(-150%)";

    btnOpen.addEventListener("click", () => {
      btnOpen.style.display = "none";
      btnClose.style.display = "block";
      menuResponsive.style.transform = "translateY(0%)";
    });

    btnClose.addEventListener("click", () => {
      btnOpen.style.display = "block";
      btnClose.style.display = "none";
      menuResponsive.style.transform = "translateY(-150%)";
    });
  } else {
    btnOpen.style.display = "none";
    btnClose.style.display = "none";
    menuResponsive.style.transform = "translateY(0%)";
  }
});

/* CARDS*/

const nationalCarrousel = document.querySelector("#national");

async function dataJson() {
  return fetch("/data.json")
    .then((response) => response.json())
    .catch(console.error);
}

window.addEventListener("DOMContentLoaded", InjectDOM);

function InjectDOM() {
  dataJson()
    .then((data) => {
      let nationalData = data.filter((item) => item.place === "nacional");
      let internationalData = data.filter(
        (item) => item.place === "internacional"
      );

      let randomIndices = getRandomNumberCards(10);
      let selectedNationData = randomIndices.map((i) => nationalData[i]);

      nationalCarrousel.innerHTML = dataCardsEstructure(selectedNationData);
      CarrouselCards();

      searchBar(nationalData, internationalData)
    })
    .catch((error) => console.error("Error:", error));
}

/* CARROUSEL */
function getRandomNumberCards(max) {
  let arrayNumbers = [];
  while (arrayNumbers.length < max) {
    let randomNumber = Math.floor(Math.random() * max);
    if (arrayNumbers.indexOf(randomNumber) === -1) {
      arrayNumbers.push(randomNumber);
    }
  }
  return arrayNumbers;
}

function dataCardsEstructure(info) {
  let DisplayCard = info.map((item) => {
    return `<div class="block2__card">
                    <div class="block2__card--img">
                        <img src="${item.image}" alt="${item.city}">
                    </div>
                    <div class="block2__card--text">
                        <h2>${item.city}</h2>
                        <p>${item.month} ${item.year}</p>
                        <h3> ${item.price}</h3>
                        <p>tarifa por persona</p>
                        <p>+tazas e impuestos</p>
                    </div>
                </div>`;
  });
  DisplayCard = DisplayCard.join("");
  return DisplayCard;
}

function CarrouselCards() {
  const carrousel = document.querySelector(".block2__carrousel");
  const arrowCarrouselLeft = document.querySelector("#leftArrow");
  const arrowCarrouselRight = document.querySelector("#rightArrow");
  let timer;

  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(nextCarrousel, 5000);
  }

  function disableButtons() {
    arrowCarrouselLeft.disabled = true;
    arrowCarrouselRight.disabled = true;
  }

  function enableButtons() {
    arrowCarrouselLeft.disabled = false;
    arrowCarrouselRight.disabled = false;
  }

  function nextCarrousel() {
    disableButtons();
    let cardFirst = document.querySelectorAll(".block2__card")[0];
    carrousel.style.marginLeft = "-20rem";
    carrousel.style.transition = "0.3s all ease";

    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("beforeend", cardFirst);
      carrousel.style.marginLeft = "0";
      enableButtons();
      resetTimer();
    }, 300);
  }

  function prevCarrousel() {
    disableButtons();
    let cards = document.querySelectorAll(".block2__card");
    let cardLast = cards[cards.length - 1];
    carrousel.style.marginLeft = "20rem";
    carrousel.style.transition = "0.3s all ease";

    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("afterbegin", cardLast);
      carrousel.style.marginLeft = "0";
      enableButtons();
      resetTimer();
    }, 300);
  }
  arrowCarrouselRight.addEventListener("click", nextCarrousel);

  arrowCarrouselLeft.addEventListener("click", prevCarrousel);

  resetTimer();
}

/* BARRA DE BUSQUEDA*/

const boxBar = document.querySelector("#form-search");
const locationList = document.querySelector("#select-location");
const placeList = document.querySelector("#select-place");
const yearList = document.querySelector("#select-year");
const monthList = document.querySelector("#select-month");


const allSelectSearch = document.querySelectorAll("#form-search select")

function searchBar(nationalData, internationalData) {
  
  allSelectSearch.forEach((singleSelect) =>{
    singleSelect.addEventListener("change", (event)=>{
      let selectedValue = event.target.value;

      if (selectedValue === "national") {
        locationList.innerHTML = EstructureOptionSearch(nationalData, "city");
        
       

      } else locationList.innerHTML = EstructureOptionSearch(internationalData, "city");
    })

  })
}



function EstructureOptionSearch(array, infoArray) {
  let displayOption = array.map((item) => {
    return ` <option value="${item[infoArray]}">${item[infoArray]}</option>`;
  });

  displayOption = displayOption.join("");
  return displayOption;
}

/*function searchBar(nationalData, internationalData) {
  
  let placeOptions  = placeList.querySelectorAll("option")

  

  let fore = EstructureOptionSearchObjets(placeOptions)
    
  console.log(fore)

  if(fore == "nacional"){
    console.log("gato")
  }
}



function EstructureOptionSearch(array, infoArray) {
  let displayOption = array.map((item) => {
    return ` <option value="${item[infoArray]}">${item[infoArray]}</option>`;
  });

  displayOption = displayOption.join("");
  return displayOption;
}

function EstructureOptionSearchObjets(searchOptions){
  
  searchOptions.forEach((singleOption)=>{
    singleOption.addEventListener("change",(event)=>{
    let eventValue = event.target.value;
    console.log(eventValue)
    });
  });
  
}
