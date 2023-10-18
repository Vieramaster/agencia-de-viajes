const arrowCarrouselLeft = document.querySelector("#leftArrow")
const arrowCarrouselRight = document.querySelector("#rightArrow")
const carrousel = document.querySelector(".block1__carrousel")
const cards = document.querySelectorAll(".block1__card")

let initial = 0;

arrowCarrouselRight.addEventListener("click", () => {
    let cardWidth = cards[0].offsetWidth; // Recalcula el ancho de la tarjeta
    if(initial < cards.length - 4){
        initial++;
        carrousel.style.transform = `translateX(-${initial * cardWidth}px)`;
    }
});

arrowCarrouselLeft.addEventListener("click", ()=>{
    let cardWidth = cards[0].offsetWidth; // Recalcula el ancho de la tarjeta
    if(initial > 0){
        initial--;
        carrousel.style.transform = `translateX(-${initial * cardWidth}px)`;
    }
});
