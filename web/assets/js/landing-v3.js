
document.addEventListener('DOMContentLoaded',()=>{
    let fadeups = document.querySelectorAll('.fadeUP')   
    const RunAnimation = (elem)=>{
        let fadeElement = elem
        let positionElement = fadeElement.getBoundingClientRect().top;
        let windowHeight = window.innerHeight
            if(positionElement < windowHeight){
               elem.classList.add('appear')
            }   
    }
    let checkScroll = ()=>{
        fadeups.forEach(fade=>{
            RunAnimation(fade)
        })
    }
    checkScroll()
    lenis.on('scroll',()=>{
      checkScroll()
    })
  })
  document.querySelector('header').classList.add('lightHeader')