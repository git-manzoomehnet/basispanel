notes = document.querySelectorAll('.Note')
const RunAnimation = (elem)=>{
    let fadeElement = elem
    let positionElement = fadeElement.getBoundingClientRect().top-50;
    let windowHeight = window.innerHeight
        if(positionElement < windowHeight){
           elem.classList.add('appear')
        }  
}
document.addEventListener('DOMContentLoaded',()=>{
    let checkScroll = ()=>{
        notes.forEach(b=>{
            RunAnimation(b)
        })
    }
    checkScroll()
    lenis.on('scroll',()=>{
      checkScroll()
    })
  })