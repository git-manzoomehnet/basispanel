// service slider
let SwiperService= new Swiper ('.purpose-boxes', {
  slidesPerView: 2.9,
  spaceBetween: 70,
  slidesPerGroup: 3,
  effect:'slide' ,
  loop:true,
 speed:700,
 pagination: {
  el: '.purpose-boxes .swiper-pagination',
        clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '<span class="line"></span>' + '</span>';
    },
},
})

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
let contents = document.querySelectorAll('.Home-BasisPanel-mobile .Methods .Tcontent')

document.addEventListener('DOMContentLoaded',()=>{
  let checkScroll = ()=>{
    TitlesSec3.forEach(i=>{
      RunAnimation(i)
  })
  Boxes.forEach(b=>{
      RunAnimation(b)
  })
  contents.forEach(b=>{
      RunAnimation(b)
  })
  }
  checkScroll()
  lenis.on('scroll',()=>{
    checkScroll()
  })
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
// logo slider 
let swiper = new Swiper(".swiper-1", {
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 30000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  loop: true,
});
let swiper2 = new Swiper(".swiper-2", {
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 30000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true
  },
  loop: true,
});
console.log(Swiper.prototype,'Swiper.prototyp');
const texts = ['مدیرفروش هستم ،','با افتخار پاسخگوی شما ','بفرمایید'];
const inputt = document.querySelector('#myInput');
const animationWorker = function (input, texts) {
  this.inputt = input;
  this.defaultPlaceholder = this.inputt.getAttribute('placeholder');
  this.texts = texts;
  this.curTextNum = 0;
  this.curPlaceholder = '';
  this.blinkCounter = 0;
  this.animationFrameId = 0;
  this.animationActive = false;
  this.inputt.setAttribute('placeholder',this.curPlaceholder);

  this.switch = (timeout) => {
    this.inputt.classList.add('imitatefocus');
    setTimeout(
      () => { 
        this.inputt.classList.remove('imitatefocus');
          this.inputt.setAttribute('placeholder',this.curPlaceholder);

        setTimeout(
          () => { 
            this.inputt.setAttribute('placeholder',this.curPlaceholder);
            if(this.animationActive) 
              this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
          timeout);
      }, 
      timeout);
  }

  this.animate = () => {
    if(!this.animationActive) return;
    let curPlaceholderFullText = this.texts[this.curTextNum];
    let timeout = 200;

    if (this.curPlaceholder == curPlaceholderFullText+'_' && this.blinkCounter==3) {
      this.blinkCounter = 0;
      this.curTextNum = (this.curTextNum >= this.texts.length-1)? 0 : this.curTextNum+1;
      this.curPlaceholder = '_';
   
      this.switch(1000);

      return;
    }
    else if (this.curPlaceholder == curPlaceholderFullText+'_' && this.blinkCounter<3) {
      this.curPlaceholder = curPlaceholderFullText;
      this.blinkCounter++;

    }
    else if (this.curPlaceholder == curPlaceholderFullText && this.blinkCounter<3) {
      this.curPlaceholder = this.curPlaceholder+'_';
    }
    else {
      this.curPlaceholder = curPlaceholderFullText
        .split('')
        .slice(0,this.curPlaceholder.length+1)
        .join('') + '_';
      timeout = 150;
    }


    this.inputt.setAttribute('placeholder',this.curPlaceholder);
    setTimeout(
      () => { if(this.animationActive) this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
      timeout);
  }

  this.stop = () => {
    this.animationActive = false;
    window.cancelAnimationFrame(this.animationFrameId);
  }

  this.start = () => {
    this.animationActive = true;
    this.animationFrameId = window.requestAnimationFrame(this.animate);
    return this;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let aw = new animationWorker(inputt, texts).start();
  inputt.addEventListener("focus", (e) => aw.stop());
  inputt.addEventListener("blur", (e) => {
    aw = new animationWorker(inputt, texts);
    if(e.target.value == '') setTimeout( aw.start, 2000);
  });
});
let btnInput = document.querySelector('.Overlay-input')
btnInput.addEventListener('click',()=>{
        let input = document.querySelector('#myInput')
        console.log('val',input.value);
        if(input.value == ''){
            return
        }
        else{
               console.log('val',input.value);
               setTimeout(()=>{
              window.location.href = `/chat.bc?q=${input.value}`
        },1000)}
})
inputt.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed

        event.preventDefault();
        console.log('clicked');
        console.log('val',inputt );
        console.log('val',inputt.value);
        window.location.href = `/chat?q=${inputt.value}`
        setTimeout(() => {
        
        }, 1000);
      
  
  
    }
  });