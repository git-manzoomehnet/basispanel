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