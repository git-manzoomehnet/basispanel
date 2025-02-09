notes = document.querySelectorAll('.Note')
const RunAnimation = (elem)=>{
    let fadeElement = elem
    let positionElement = fadeElement.getBoundingClientRect().top+300;
    let windowHeight = window.innerHeight
        if(positionElement < windowHeight){
           elem.classList.add('appear')
        }  
}
lenis.on('scroll',()=>{
    notes.forEach(b=>{
        RunAnimation(b)
    })
})