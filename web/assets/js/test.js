const lenis = new Lenis();
function raf(e) {
    lenis.raf(e), requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
let timer,
    input = document.querySelector("#inputSearch"),
    closeS = document.querySelector("button.c02260"),
    circleF = document.querySelector(".c02257"),
    timeoutVal = 1e3;
const status = document.getElementById("status"),
    typer = input;
function handlefocus() {
    closeS.classList.add("c02261");
}
function handleKeyPress(e) {
    window.clearTimeout(timer), closeS.classList.remove("c02261"), circleF.classList.add("c02261");
}
function handleKeyUp(e) {
    window.clearTimeout(timer),
        (timer = window.setTimeout(() => {
            closeS.classList.add("c02261"), circleF.classList.remove("c02261");
        }, timeoutVal));
}
typer.addEventListener("keypress", handleKeyPress),
    typer.addEventListener("keyup", handleKeyUp),
    typer.addEventListener("focus", handlefocus),
    closeS.addEventListener("click", () => {
        (input.value = ""), input.setAttribute("placeholder", "عبارت مورد نظر را جستجو کنید"), closeS.classList.remove("c02261");
    });
let searchIconn = document.querySelector(".Search-C .inputBOX .searchIcon"),
    inputt = document.querySelector(".inputBOX input#inputSearch");
searchIconn.addEventListener("click", () => {
    if ((console.log("clicked"), "" != inputt.value)) {
        console.log("val", inputt.value);
        var e = `/load.inc?q=${inputt.value}`;
        $(".loaded").load(e);
    }
}),
    inputt.addEventListener("keypress", function (e) {
        if ("Enter" === e.key && "" != inputt.value) {
            e.preventDefault(), console.log("val", inputt.value);
            var t = `/load.inc?q=${inputt.value}`;
            $(".loaded").load(t);
        }
    });
