
/*MENU RESPONSIVE*/
const  menuResponsive = document.querySelector(".box2")
const btnOpen = document.querySelector("#btnOpen")
const btnClose = document.querySelector("#btnClose")






window.addEventListener("resize", ()=>{

    if(window.innerWidth < 950){

        btnOpen.style.display = "block"
        btnClose.style.display = "none"
        menuResponsive.style.transform = "translateY(-150%)";

        btnOpen.addEventListener("click", ()=>{
            btnOpen.style.display = "none"
            btnClose.style.display = "block"
            menuResponsive.style.transform = "translateY(0%)";
            
        })
        
        btnClose.addEventListener("click", ()=>{
            btnOpen.style.display = "block"
            btnClose.style.display = "none"
            menuResponsive.style.transform = "translateY(-150%)";
            
        })
        
    }else{
        btnOpen.style.display = "none"
        btnClose.style.display = "none"
        menuResponsive.style.transform = "translateY(0%)";
    }
})








/* CARROUSEL */
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

