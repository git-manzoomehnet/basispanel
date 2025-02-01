
let langIcon = document.querySelector(".langC"),
    langSVG = document.querySelector(".langC svg"),
    langContent = document.querySelector(".langs-content");
document.addEventListener("click", (e) => {
    langIcon.contains(e.target) ? (
        langContent.classList.toggle("openLang"),
         langSVG.classList.toggle("rotate")) :
          (console.log("clicked outside of menu"),
           langContent.classList.remove("openLang"), 
           langSVG.classList.remove("rotate"));
});
let langIconFooter = document.querySelector("footer .langC"),
    langSVGFooter = document.querySelector("footer .langC svg"),
    langContentFooter = document.querySelector("footer .langs-content");
document.addEventListener("click", (e) => {
    langIconFooter.contains(e.target) ? (
        langContentFooter.classList.toggle("openLang"),
        langSVGFooter.classList.toggle("rotate")) :
          (console.log("clicked outside of menu"),
          langContentFooter.classList.remove("openLang"), 
          langSVGFooter.classList.remove("rotate"));
});

const lenis = new Lenis({ smoothWheel: !0, wheelMultiplier: 2 });
function raf(e) {
    lenis.raf(e),
     requestAnimationFrame(raf);
}
requestAnimationFrame(raf)
lenis.on('scroll',(e)=>{
    console.log(e);
    
if(e.scroll==0){
    document.querySelector('header').classList.remove('bgWhite')
}
else{
    document.querySelector('header').classList.add('bgWhite')
}
})

