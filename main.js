/*responsive menu*/

const btnOpen = document.querySelector(".box1__responsive__open");
const btnClose = document.querySelector(".box2__responsive__close");
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

const carrouselNational = document.querySelector(".block3__carrousel");
const carrouselInternational = document.querySelector("#internationalCarrousel");



function carrouselMove(arrowLeftSelector, arrowRightSelector, carrouselSelector, cardSelector) {
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
    timer = setTimeout(nextCarrousel, 58000);
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
    
    
    carrousel.style.marginLeft = "-50%";
    carrousel.style.transition = "all 0.5s ease";
    setTimeout(() => {
      carrousel.style.transition = "none";
      carrousel.insertAdjacentElement("beforeend", firstCard);
      carrousel.style.marginLeft = "-25%";
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
      carrousel.style.marginLeft = "-25%";
      enableButtons();
      resetTimer();
    }, 800);
  }
  resetTimer();
  arrowRight.addEventListener("click", nextCarrousel);
  arrowLeft.addEventListener("click", prevCarrousel);
}

function carrouselMoveNational() {
  carrouselMove(
    ".block3__arrow__left",
    ".block3__arrow__right",
    ".block3__carrousel",
    "#nationalCard"
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
          return `<li class="block3__card" id="${div}">
                    <div class="block3__card__img">
                      <img src="${item.image}" alt="${item.city}" />
                    </div>
                    <div class="block3__card__text">
                      <h3>${item.city}</h3>
                      <h4>${item.month} ${item.year}</h4>
                      <h3>${item.price}</h3>
                      <p>${item.days} dias y ${item.nights} noches</p>
                    </div>
                    <div class="block3__card__circles">
                      <div class="block3__card__circle">
                      ${item.transportImage}
                      </div>
                      <div class="block3__card__circle">
                      ${item.locationImage}
                      </div>
                      <div class="block3__card__circle">
                      ${item.pensionImage}
                      </div>
                    </div>
                  </li>`;
        });
        let finalStructure = structure.join("");
        return finalStructure;
      }

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
      

      carrouselMoveNational();
      
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los datos:", error);
    });
}

window.addEventListener("DOMContentLoaded", InjectDOMCards);
