
const carrousel = document.querySelector(".block2__carrousel")
const cards = document.querySelectorAll(".block2__card")
const arrowCarrouselLeft = document.querySelector("#leftArrow")
const arrowCarrouselRight = document.querySelector("#rightArrow")

let initial = 0;

arrowCarrouselRight.addEventListener("click", () => {
     // Recalcula el ancho de la tarjeta
    if(initial < cards.length){
        initial++;
        carrousel.style.transform = `translateX(-${initial *20}rem)`;
    }
});

arrowCarrouselLeft.addEventListener("click", ()=>{
    
    if(initial > 0){
        initial--;
        carrousel.style.transform = `translateX(-${initial * 20}rem)`;
    }
});
