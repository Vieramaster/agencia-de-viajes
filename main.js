/*responsive menu*/

const btnOpen = document.querySelector(".box1__responsive--open");
const btnClose = document.querySelector(".box2__responsive--close");
const navBox = document.querySelector(".box2");

btnOpen.addEventListener("click", () => {
  btnOpen.style.display = "none";
  navBox.style.transform = "translatex(0rem)";
});

btnClose.addEventListener("click", () => {
  navBox.style.transform = "translatex(15rem)";
  btnOpen.style.display = "block";
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

const carrouselNational = document.querySelector(
  "#nationalCarrousel"
);
const carrouselInternational = document.querySelector("#internationalCarrousel")
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
    timer = setTimeout(nextCarrousel, 5000);
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

    carrousel.style.marginLeft = "-32rem";
    carrousel.style.transition = "all 0.5s ease";
    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("beforeend", firstCard);
      carrousel.style.marginLeft = "-16rem";
      enableButtons();
      resetTimer();
    }, 500);
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
      carrousel.style.marginLeft = "-16rem";
      enableButtons();
      resetTimer();
    }, 500);
  }
  resetTimer();
  arrowRight.addEventListener("click", nextCarrousel);
  arrowLeft.addEventListener("click", prevCarrousel);
}

function carrouselMoveNational(){
  carrouselMove(
    "#nationalArrowLeft",
    "#nationalArrowRight",
    "#nationalCarrousel",
    "#nationalCard"
  );
}

function carrouselMoveInternational(){
  carrouselMove(
    "#internationalArrowLeft",
    "#internationalArrowRight",
    "#internationalCarrousel",
    "#internationalCard" 
  );
}

async function dataJson() {
  return fetch("/data.json")
    .then((response) => response.json())
    .catch(console.error);
}

function InjectDOMCards() {
  dataJson()
    .then((data) => {
      function arrayFilter(data, info) {
        let array = data.filter((item) => item.place === info);
        return array;
      }
      function arrayRandom(randomIndex, info) {
        let random = randomIndex.map((item) => info[item]);
        return random;
      }
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

      function structureCards(data, div) {
        let structure = data.map((item) => {
          return `<li class="carrouselBox__card" id="${div}">
                    <img src="${item.image}" alt="${item.city}">
                      <div class="carrouselBox__text">
                        <h3>${item.city}</h3>
                        <h4>${item.month} ${item.year}</h4>
                        <h3>${item.price}</h3>
                        <p>${item.nights} noches</p>
                      </div>
                  </li>
        `;
        });
        let finalStructure = structure.join("");
        return finalStructure;
      }

      let nationalData = arrayFilter(data, "nacional");
      let internationalData = arrayFilter(data, "internacional");

      let randomIndex = getRandomNumberCards(10);

      let randomNational = arrayRandom(randomIndex, nationalData);
      let randomInternational = arrayRandom(randomIndex, internationalData);

      const structureNational = structureCards(randomNational,"nationalCard");
      const structureInternational = structureCards(randomInternational, "internationalCard")

      carrouselNational.innerHTML = structureNational;
      carrouselInternational.innerHTML = structureInternational

      carrouselMoveNational()
      carrouselMoveInternational()
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los datos:", error);
    });
}

window.addEventListener("DOMContentLoaded", InjectDOMCards);
