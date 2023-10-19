const arrowCarrouselLeft = document.querySelector("#leftArrow")
const arrowCarrouselRight = document.querySelector("#rightArrow")
const carrousel = document.querySelector(".block1__carrousel")
const cards = document.querySelectorAll(".block1__card")

let initial = 0;

arrowCarrouselRight.addEventListener("click", () => {
     // Recalcula el ancho de la tarjeta
    if(initial < cards.length -2){
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
