/*responsive menu*/

const btnOpen = document.querySelector(".box1__responsive__open");
const btnClose = document.querySelector(".box2__responsive__close");
const navBox = document.querySelector(".box2");

btnOpen.addEventListener("click", () => {
  btnOpen.style.display = "none";
  navBox.style.transform = "translatex(0rem)";
  document.body.style.overflow = "hidden";
});

btnClose.addEventListener("click", () => {
  navBox.style.transform = "translatex(15rem)";
  btnOpen.style.display = "block";
  document.body.style.overflow = "";
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 950) {
    navBox.style.transform = "translatex(15rem)";
    btnOpen.style.display = "block";
  } else {
    navBox.style.transform = "translatex(0rem)";
    btnOpen.style.display = "none";
  }
});

/* carrousel*/

const carrouselNational = document.querySelector(".block3 .block__carrousel");
const carrouselInternational = document.querySelector(
  ".block5 .block__carrousel"
);

/*carousel arrows and their automatic movement*/
function carrouselMove(
  arrowLeftSelector,
  arrowRightSelector,
  carrouselSelector,
  cardSelector
) {
  const arrowLeft = document.querySelector(arrowLeftSelector);
  const arrowRight = document.querySelector(arrowRightSelector);
  const carrousel = document.querySelector(carrouselSelector);
  let cards = document.querySelectorAll(cardSelector);
  let lastCard = cards[cards.length - 1];
  let timer;

  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(nextCarrousel, 8000);
  }

  function disableButtons() {
    arrowLeft.disabled = true;
    arrowRight.disabled = true;
  }

  function enableButtons() {
    arrowLeft.disabled = false;
    arrowRight.disabled = false;
  }

  carrousel.insertAdjacentElement("afterbegin", lastCard);

  function nextCarrousel() {
    disableButtons();
    let firstCard = document.querySelectorAll(cardSelector)[0];

    carrousel.style.marginLeft = "-34rem";
    carrousel.style.transition = "all 0.5s ease";
    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("beforeend", firstCard);
      carrousel.style.marginLeft = "-17rem";
      enableButtons();
      resetTimer();
    }, 800);
  }

  function prevCarrousel() {
    disableButtons();
    let cards = document.querySelectorAll(cardSelector);
    let lastCard = cards[cards.length - 1];

    carrousel.style.marginLeft = "0";
    carrousel.style.transition = "all 0.5s ease";
    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("afterbegin", lastCard);
      carrousel.style.marginLeft = "-17rem";
      enableButtons();
      resetTimer();
    }, 800);
  }
  resetTimer();
  arrowRight.addEventListener("click", nextCarrousel);
  arrowLeft.addEventListener("click", prevCarrousel);
}

/*national package movement integration*/
function carrouselMoveNational() {
  carrouselMove(
    ".block3 .block__arrow__left",
    ".block3 .block__arrow__right",
    ".block3 .block__carrousel",
    ".block3 #nationalCard"
  );
}
/*international package movement integration*/
function carroselMoveInternational() {
  carrouselMove(
    ".block5 .block__arrow__left",
    ".block5 .block__arrow__right",
    ".block5 .block__carrousel",
    ".block5 #internationalCard"
  );
}

/*api order*/
async function dataJson() {
  return fetch("/data.json")
    .then((response) => response.json())
    .catch(console.error);
}

/*creation of random cards placed on the DOM*/
function InjectDOMCards() {
  dataJson()
    .then((data) => {
      function arrayFilter(data, info) {
        let array = data.filter((item) => item.place === info);
        return array;
      } /*content separation*/
      function arrayRandom(randomIndex, info) {
        let random = randomIndex.map((item) => info[item]);
        return random;
      } /*creation of the random card and the desired object*/
      function getRandomNumberCards(max) {
        let arrayNumbers = [];
        while (arrayNumbers.length < max) {
          let randomNumber = Math.floor(Math.random() * max);
          if (arrayNumbers.indexOf(randomNumber) === -1) {
            arrayNumbers.push(
              randomNumber
            ); /*si el numero no esta en el array (-1) lo agrega)*/
          }
        }
        return arrayNumbers;
      } /*creation of random numbers without repeating*/

      function structureCards(data, div) {
        let structure = data.map((item) => {
          return `<li class="block__card" id="${div}">
                    <div class="block__card__img">
                      <img src="${item.image}" alt="${item.city}" />
                    </div>
                    <div class="block__card__text">
                      <h3>${item.city}</h3>
                      <h4>${item.month} ${item.year}</h4>
                      <h3>${item.price}</h3>
                      <p>${item.days} dias y ${item.nights} noches</p>
                    </div>
                    <div class="block__card__circles">
                      <div class="block__card__circle">
                      ${item.transportImage}
                      </div>
                      <div class="block__card__circle">
                      ${item.locationImage}

                    </div>
                  </li>`;
        });
        let finalStructure = structure.join("");
        return finalStructure;
      } /*
      structure creation*/

      /* integration of the corresponding cards*/
      let nationalData = arrayFilter(data, "nacional");
      let internationalData = arrayFilter(data, "internacional");

      let randomIndex = getRandomNumberCards(10);

      let randomNational = arrayRandom(randomIndex, nationalData);
      let randomInternational = arrayRandom(randomIndex, internationalData);

      const structureNational = structureCards(randomNational, "nationalCard");
      const structureInternational = structureCards(
        randomInternational,
        "internationalCard"
      );

      carrouselNational.innerHTML = structureNational;
      carrouselInternational.innerHTML = structureInternational;

      /*integration of card movement functions*/
      carrouselMoveNational();
      carroselMoveInternational();
      searchBar(nationalData, internationalData);
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los datos:", error);
    });
}

window.addEventListener("DOMContentLoaded", InjectDOMCards);

/*search bar*/


const place = document.getElementById("place");
const cityLocation = document.getElementById("location");
const time = document.getElementById("time");

function searchBar(nationalData, internationalData) {
    function newValue(item, callback) {
      item.addEventListener("change", (event) => {
        let itemValue = event.target.value;
        callback(itemValue)
      });
    }

    newValue(place, function(newValuePlace) {
      let output;
      if (newValuePlace === "national") {
        //search without repeating
        let nationalValue = [...new Set(nationalData.map((item) => item.city))];
        output = nationalValue;
      } else if (newValuePlace === "international") {
        let internationalValue = [...new Set(internationalData.map((item) => item.city))];
        output = internationalValue;
      }

      let insert = output.map(item => `<option value="${item}">${item}</option>`);
      cityLocation.innerHTML = insert.join('');
    });

    
}


/*BLOCK4 CARDS*/

const Li = document.querySelectorAll(".block4__li");
const card = document.querySelectorAll(".block4__box__card");
const cardIcon = document.querySelectorAll(".block4__li  i");
const cardP = document.querySelectorAll(".block4__li  p");

Li.forEach((cadaLi, i) => {
  cadaLi.addEventListener("click", () => {
    Li.forEach((cadaLi, subI) => {
      cadaLi.classList.remove("active");
      card[subI].classList.remove("active");
      cardIcon[subI].classList.remove("active");
      cardP[subI].classList.remove("active");
    });

    cadaLi.classList.add("active");
    card[i].classList.add("active");
    cardIcon[i].classList.add("active");
    cardP[i].classList.add("active");
  });
});

/* CRUISE MAP*/

const pointsLi = document.querySelectorAll(".block6__map__point li");
const mapCard = document.querySelectorAll(".block6__box__card");
const mapText = document.querySelectorAll(".block6__card__text");
const mapImg = document.querySelectorAll(".block6__box__card img");
const mapTitle = document.querySelectorAll(".block6__box__card h2");

pointsLi.forEach((point, i) => {
  point.addEventListener("mouseover", () => {
    if (window.innerWidth < 750) {
      mapTitle[i].style.top = "0";
    }
    mapCard[i].style.opacity = "1";
    mapText[i].style.bottom = "0";
    mapImg[i].style.transform = "scale(1.1)";
    mapTitle[i].style.top = "20%";
  });

  point.addEventListener("mouseout", () => {
    if (window.innerWidth < 750) {
      mapTitle[i].style.top = "-20%";
    }
    mapCard[i].style.opacity = "0";
    mapText[i].style.bottom = "-100%";
    mapImg[i].style.transform = "scale(1)";
    mapTitle[i].style.top = "-10%";
  });
});

/*function searchBar(nationalData, internationalData){
  
  let valuePlace;

  function itemValue(value){
    value.addEventListener("change", (event) => {
      valuePlace = event.target.value;
      console.log(valuePlace);
      itemLocation(valuePlace);
    });
  }

  function itemLocation(newPlace){
    let cities;
    if(newPlace === "national"){
      cities = nationalData.map(item => item.city);
    } else if(newPlace === "international"){
      cities = internationalData.map(item => item.city);
    }

    // Crear un string con las opciones del select
    let options = cities.map(city => `<option value="${city}">${city}</option>`).join('');

    // Agregar las opciones al select
    Location.innerHTML = options;
  }

  itemValue(Place);
}
*/
