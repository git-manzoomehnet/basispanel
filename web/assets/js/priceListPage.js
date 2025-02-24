const accordions = document.querySelectorAll(".accordion");

const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
};
openAccordion(accordions[0])

accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    intro.onclick = () => {
        if (content.style.maxHeight) {
            closeAccordion(accordion);
        } else {
            accordions.forEach((accordion) => closeAccordion(accordion));
            openAccordion(accordion);
        }
    };
});



let addToBasketBtn = document.querySelectorAll(".addToBasketBtn")
let seeBasketBtn = document.querySelectorAll(".seeBasketBtn")
let proListCheckBox = document.querySelectorAll(".proListCheckBox[type=checkbox]")
let errorPriceList = document.querySelector(".errorPriceList")
addToBasketBtn.forEach(element => {
    element.addEventListener("click", function (params) {
        addToBasketBtn.forEach(el => {
            el.classList.remove("hidden")
            el.classList.add("flex")
            el.nextElementSibling.classList.add("hidden")
            el.nextElementSibling.classList.remove("flex")

        })
        element.classList.add("hidden")
        element.classList.remove("flex")
        element.nextElementSibling.classList.remove("hidden")
        element.nextElementSibling.classList.add("flex")

        const parentAccordion = element.closest('.accordion').querySelector(".accordion__intro input[type=checkbox]");
        parentAccordion.checked = true
    })
});
proListCheckBox.forEach(element => {
    element.addEventListener("change", function () {
        let plansInput = document.querySelector(".plans .accordion__intro input[type=checkbox]")

        // پیدا کردن والد اصلی
        const parentAccordion = element.closest('.accordion');
        if (!parentAccordion) return; // اگر والد یافت نشد، از تابع خارج شود

        // پیدا کردن چک‌باکس داخل accordion__intro
        const accordionIntroCheckbox = parentAccordion.querySelector(".accordion__intro input[type=checkbox]");
        if (!accordionIntroCheckbox) return; // اگر یافت نشد، خارج شود

        // بررسی اینکه آیا حداقل یکی از proListCheckBox داخل همین accordion انتخاب شده است
        const isAnyChecked = parentAccordion.querySelectorAll(".proListCheckBox:checked").length > 0;

        // تغییر وضعیت چک‌باکس accordion__intro بر اساس انتخاب‌ها
        accordionIntroCheckbox.checked = isAnyChecked;



        if (!plansInput.checked) {
            errorPriceList.classList.add("activeErrorPriceList2")
            setTimeout(() => {

                errorPriceList.classList.add("activeErrorPriceList")

                proListCheckBox.forEach(el => {
                    el.checked = false
                    accordionIntroCheckbox.checked = false
                })
            }, 400);

            setTimeout(() => {
                errorPriceList.classList.remove("activeErrorPriceList")

            }, 5000);
            setTimeout(() => {

                errorPriceList.classList.remove("activeErrorPriceList2")
            }, 5080);
        }


    });
});

seeBasketBtn.forEach(element => {
    console.log(element);
});
let openPopCalPrice = document.querySelector(".openPopCalPrice")
let closepopPriceCalculate = document.querySelector(".closepopPriceCalculate")
let popPriceCalculate = document.querySelector(".popPriceCalculate")
openPopCalPrice.addEventListener("click" , function (params) {
popPriceCalculate.classList.add("activePopCalculator")

setTimeout(() => {
    
    popPriceCalculate.classList.add("activePopCalculator2")
}, 400);
})


closepopPriceCalculate.addEventListener("click" , function (params) {

popPriceCalculate.classList.remove("activePopCalculator2")
setTimeout(() => {
    
    popPriceCalculate.classList.remove("activePopCalculator")
}, 400);
})
