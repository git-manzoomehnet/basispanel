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

    var current = window.location.search;
    if (current.includes("pageno")) {
        document.querySelectorAll('.Paginations .Num').forEach(function (element) {
            let str = current.split("pageno=")[1];
            let result = str.substr(0, 1);
            if (element.id === result) {
                element.classList.add('active');
                document.querySelectorAll('.Paginations .Num').forEach(el => {
                    if (el !== element) el.classList.remove('active');
                });
            }
        });
    } else {
        let firstElement = document.getElementById('1');
        if (firstElement) {
            firstElement.classList.add('active');
        }
    }

