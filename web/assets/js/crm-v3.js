// slider
let SwiperBanner= new Swiper ('.swiper-module', {
    slidesPerView: 1,
    spaceBetween: 30,
    effect:'slide' ,
   speed:700,
   pagination: {
    el: '.Modules-container .swiper-pagination',
          clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '<span class="line"></span>' + '</span>';
      },
  },
})

// questions tab
let questions = [...document.querySelectorAll('.Questions-boxes .Question')]
questions.forEach((question)=>{
    question.addEventListener('click',(e)=>{
        let isActive =  e.currentTarget.classList.contains('active')
        questions.map(q=>q.classList.remove('active'))
        if(!isActive){
            e.currentTarget.classList.add('active')
        }
      
    })
})

// // logo slider one
// let SwiperOne= new Swiper ('.swiper-one', {
//     slidesPerView: 8,
//     spaceBetween: 30,
//     effect:'slide' ,
//     speed:5000,
//     loop:true,
//     autoplay:{
//         delay:0,
//         disableOnInteraction:false
//     },
//     allowTouchMove:false,
//     freeMode:true,
//     feeModeMoment:false
  
// })
// let SwiperTwo= new Swiper ('.swiper-Two', {
//     slidesPerView: 8,
//     spaceBetween: 30,
//     effect:'slide' ,
//     speed:5000,
//     loop:true,
//     autoplay:{
//         delay:0,
//         disableOnInteraction:false,
//         reverseDirection:true,
//     },
//     allowTouchMove:false,
//     freeMode:true,
//     feeModeMomentum:false
  
// })