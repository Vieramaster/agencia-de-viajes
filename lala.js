const arrowCarrouselLeft = document.querySelector("#leftArrow")
const arrowCarrouselRight = document.querySelector("#rightArrow")
const carrousel = document.querySelector(".block1__carrousel")
const cards = document.querySelectorAll(".block1__card")

let initial = 0;
let widthCarrousel = 100 / cards.length;

arrowCarrouselRight.addEventListener("click", () => {
    if(initial < cards.length - 4){
        initial++;
        carrousel.style.transform = `translateX(-${initial * widthCarrousel}%)`;
    }
});

arrowCarrouselLeft.addEventListener("click", ()=>{
    if(initial > 0){
        initial--;
        carrousel.style.transform = `translateX(-${initial * widthCarrousel}%)`;
    }
});
