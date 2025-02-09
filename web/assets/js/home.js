function startCounter(targetNumber,duration){
const counterElem = document.getElementById('counter')
let currentNumber = 1
const increment = targetNumber / (duration / 100)
const interval = setInterval(()=>{
    currentNumber += increment;
    if(currentNumber >= targetNumber){
        currentNumber = targetNumber;
        clearInterval(interval)
    }
    counterElem.textContent = `%${Math.floor(currentNumber)}`
},100) 
}
let TitlesSec3 = document.querySelectorAll('.section-3 > .title.fadeIN h3,.section-3 > .title.fadeIN h4')
console.log(TitlesSec3);
const RunAnimation = (elem)=>{
    let fadeElement = elem
    let positionElement = fadeElement.getBoundingClientRect().top+300;
    let windowHeight = window.innerHeight
    if(fadeElement.classList.contains('percent')){
        if(positionElement < windowHeight && !counterStart){
            counterStart = true
                startCounter(22,1000)
        } 
    }
    else{
        if(positionElement < windowHeight){
           elem.classList.add('appear')
        } 
    }
   
}
let counterStart = false
let counter =document.getElementById('counter')
let Boxes = document.querySelectorAll('.help-Boxes .fadeIN')
let Chart = document.querySelector(' #animations-example-1')
lenis.on('scroll',()=>{
    RunAnimation(counter)
    TitlesSec3.forEach(i=>{
        RunAnimation(i)
    })
    Boxes.forEach(b=>{
        RunAnimation(b)
    })
    RunAnimation(Chart)
})

let tabBtns = [...document.querySelectorAll('.tabs .Tab')]
let Signs = [...document.querySelectorAll('.Signs .sign')]
let Slides = [...document.querySelectorAll('.Tcontent')]
tabBtns[0].classList.add('active')
Signs[0].classList.add('activeSign')
Slides[0].classList.add('activeSlide')
let left = 0
tabBtns.forEach((btn,index)=>{
btn.addEventListener('click',(e)=>{
    console.log(index);
     tabBtns.map(btn=> btn.classList.remove('active'))
     const position = e.currentTarget.getAttribute('data-position')
     let sign =document.querySelector('.Signs .sign')
     const containerWidth = document.querySelector('.Signs').getBoundingClientRect().width 
     switch(position){
        case 'left':{    
            right = 0
            break
        }
        case 'center':{
            right = (containerWidth - sign.getBoundingClientRect().width) / 2
            break
        }
        case 'right':{
            right = (containerWidth - sign.getBoundingClientRect().width)
            break
        }
     
     }
     sign.style.right = `${right}px`
    e.currentTarget.classList.add('active')
    Slides[index].classList.add('activeSlide')
})
})
// logo slider one
let SwiperOne= new Swiper ('.swiper-one', {
    slidesPerView: 8,
    spaceBetween: 30,
    effect:'slide' ,
    speed:5000,
    loop:true,
    autoplay:{
        delay:0,
        disableOnInteraction:false
    },
    allowTouchMove:false,
    freeMode:true,
    feeModeMoment:false
  
})
let SwiperTwo= new Swiper ('.swiper-Two', {
    slidesPerView: 8,
    spaceBetween: 30,
    effect:'slide' ,
    speed:5000,
    loop:true,
    autoplay:{
        delay:0,
        disableOnInteraction:false,
        reverseDirection:true,
    },
    allowTouchMove:false,
    freeMode:true,
    feeModeMomentum:false
  
})