const accordions = document.querySelectorAll(".accordion");
let selectedPlan = []; 
let selectedProducts = [];


let invoiceTable = document.querySelector(".rSide tbody"); // جدول فاکتور
let emptyFactor = document.querySelector(".emptyFactor"); // پیام "فاکتور خالی است"
let totalPriceSpan = document.querySelector(".totalPrice"); // پیام "فاکتور خالی است"
let totalPriceSpanIn=0
totalPriceSpan.innerHTML=totalPriceSpanIn
function clearInvoice() {
    invoiceTable.innerHTML = '';  // حذف همه آیتم‌های فاکتور
    invoiceTable.appendChild(emptyFactor); // دوباره پیام فاکتور خالی را اضافه کن

}
function deleteRowFn(event) {
    let row = event.target.closest("tr"); 
    let productName = row.getAttribute("data-name");

    // حذف از selectedPlan در صورت تطابق
    if (selectedPlan.productName === productName) {
        selectedPlan = {};  // خالی کردن selectedPlan
    }

    // حذف از selectedProducts
    selectedProducts = selectedProducts.filter(item => item.productName !== productName);

    // حذف از جدول
    row.remove();

    // **بررسی اینکه آیا selectedPlan خالی شده؟**
    if (Object.keys(selectedPlan).length === 0) {
        // **اگر selectedPlan خالی شد، کل فاکتور رو پاک کن**
        selectedProducts = []; // پاک کردن تمام محصولات
        clearInvoice();
        emptyFactor.style.display = "table-row"; // نمایش پیام "فاکتور خالی است"
        return; // خروج از تابع
    }

    // **اگر selectedPlan خالی نبود ولی هنوز محصولی هست، فاکتور رو بازسازی کن**
    clearInvoice();
    selectedProducts.forEach(product => {
        addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
    });

    if (selectedPlan.productName) {
        addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
    }

    // بررسی مجدد برای نمایش پیام "فاکتور خالی است"
    if (invoiceTable.querySelectorAll(".invoice-item").length === 0) {
        emptyFactor.style.display = "table-row";
        totalPriceSpanIn = 0;
        totalPriceSpan.innerHTML = totalPriceSpanIn;
    } else {
        emptyFactor.style.display = "none";
    }

    // یافتن چک‌باکس مربوط به محصول و uncheck کردن آن
    let checkbox = document.querySelector(`input[type=checkbox][data-name="${CSS.escape(productName)}"]`);
    if (checkbox) {
        checkbox.checked = false;
    }
}


function addToInvoice(name, price, pricerenew, supportprice) {

    if (!invoiceTable.querySelector(`[data-name="${CSS.escape(name)}"]`)) {

        let row = document.createElement("tr");
        row.setAttribute("data-name", name);
        row.classList.add("invoice-item");
        row.innerHTML = `
           

                                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                                ${name}
                                </td>
                                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                                   ${price.toLocaleString()} 
                                </td>
                                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                                 ${pricerenew.toLocaleString()}
                                </td>
                                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                                    ${supportprice}
                                </td>
                                <td class="deleteRow cursor-pointer px-6" onclick="deleteRowFn(event)">
                                    <img src="/asset/images/deleteRow.svg" alt="deleteRow">

                                </td>
        `;

        // row.querySelector(".deleteRow").addEventListener("click", () => {
        //     row.remove();
        //     if (invoiceTable.querySelectorAll(".invoice-item").length === 0) {
        //         emptyFactor.style.display = "table-row";
        //     }
        // });

        invoiceTable.appendChild(row);
        emptyFactor.style.display = "none"; // پنهان کردن پیام فاکتور خالی
    }
}

const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + 100 + "px";
};

const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
    openAccordion(accordion)

})
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
let totalP = document.querySelector(".totalP")
let totalPriceC = document.querySelector(".totalPriceC")
let sumPrice = 0;


addToBasketBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        let column = this.closest("th");
        let table = column.closest("table");

        let colIndex = [...column.parentElement.children].indexOf(column); // شماره ستون کلیک‌شده
        let rows = table.querySelectorAll("tbody tr");

        let productName = "";
        let price = 0;
        let pricerenew = 0;
        let supportprice = 0;

        rows.forEach(row => {
            let cells = row.children;
            if (cells[colIndex]) {
                productName = `پنل پایه : ${column.querySelector(".panel-name").innerText}`;
                if (cells[colIndex].classList.contains("panel-price-yearly")) {
                    price = parseInt(cells[colIndex].querySelector("span").innerHTML.replace(/,/g, '').trim(), 10);
                }
                if (cells[colIndex].classList.contains("panel-price-renew")) {
                    pricerenew = parseInt(cells[colIndex].querySelector("span").innerHTML.replace(/,/g, '').trim(), 10);
                }
            }
        });
        totalPriceSpanIn=price
        totalPriceSpan.innerHTML=totalPriceSpanIn+totalPrice
        if (productName && price > 0) {
            // جایگزینی مقدار جدید در آرایه
            selectedPlan = { productName, price, pricerenew, supportprice };

            // پاک کردن فاکتور قبلی
            clearInvoice();

            // افزودن فقط مقدار جدید

            selectedProducts.forEach(product => {
                console.log(product);

                addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
            });
            if (selectedPlan.productName) {

                addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
            }

        }
    });
});
addToBasketBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        let column = this.closest("th");
        let table = column.closest("table");

        let colIndex = [...column.parentElement.children].indexOf(column); // شماره ستون کلیک‌شده
        let rows = table.querySelectorAll("tbody tr");

        let productName = "";
        let price = 0;
        let pricerenew = 0;
        let supportprice = 0;

        rows.forEach(row => {
            let cells = row.children;
            if (cells[colIndex]) {
                productName = `پنل پایه : ${column.querySelector(".panel-name").innerText}`;
                if (cells[colIndex].classList.contains("panel-price-yearly")) {
                    price = parseInt(cells[colIndex].querySelector("span").innerHTML.replace(/,/g, '').trim(), 10);
                }
                if (cells[colIndex].classList.contains("panel-price-renew")) {
                    pricerenew = parseInt(cells[colIndex].querySelector("span").innerHTML.replace(/,/g, '').trim(), 10);
                }
            }
        });

        if (productName && price > 0) {
            // جایگزینی مقدار جدید در آرایه
            selectedPlan = { productName, price, pricerenew, supportprice };
            // پاک کردن فاکتور قبلی
            clearInvoice();

            // افزودن فقط مقدار جدید
            // افزودن فقط مقدار جدید

            selectedProducts.forEach(product => {
                console.log(product);

                addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
            });

            if (selectedPlan.productName) {

                addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
            }
        }
    });
});



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
let totalPrice = 0;

proListCheckBox.forEach(element => {
    element.addEventListener("change", function () {

        let plansInput = document.querySelector(".plans .accordion__intro input[type=checkbox]");

        // بررسی انتخاب شدن حداقل یکی از proListCheckBox داخل همین accordion
        const parentAccordion = element.closest('.accordion');
        const isAnyChecked = parentAccordion.querySelectorAll(".proListCheckBox:checked").length > 0;
        const accordionIntroCheckbox = parentAccordion.querySelector(".accordion__intro input[type=checkbox]");
        accordionIntroCheckbox.checked = isAnyChecked;
        if (isAnyChecked) {

            totalP.style.display = "block";
        }
        else {
            totalP.style.display = "none";

        }
        // پیدا کردن چک‌باکس داخل accordion__intro
        if (!accordionIntroCheckbox) return;
        // پیدا کردن والد اصلی
        if (!plansInput.checked) {
            errorPriceList.classList.add("activeErrorPriceList2");

            setTimeout(() => {
                errorPriceList.classList.add("activeErrorPriceList");
                proListCheckBox.forEach(el => {
                    el.checked = false;
                    accordionIntroCheckbox.checked = false;
                });
                totalPrice = 0; // بازنشانی مجموع قیمت
                totalPriceC.innerHTML = "0";
            }, 400);

            setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList"), 5000);
            setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList2"), 5080);
        }
        if (!plansInput.checked) return;


        if (!parentAccordion) return;


        // گرفتن مقدار قیمت و تبدیل آن به عدد
        const priceText = element.parentElement.parentElement.querySelector(".priceP").innerText.replace(/,/g, '');
        const price = parseInt(priceText, 10);

        let productName = element.closest("tr").querySelectorAll("td")[1].querySelector("span")?.innerHTML.replace(/ /g, '');
        let pricePro = element.closest("tr").querySelector(".priceP")?.innerHTML;
        let pricerenew = element.closest("tr").querySelectorAll("td")[3].querySelector("span")?.innerHTML.replace(/ /g, '');
        let supportprice = element.closest("tr").querySelectorAll("td")[4].querySelector("span")?.innerHTML.replace(/ /g, '');
        clearInvoice();
        // محاسبه مجموع قیمت
        if (element.checked) {
            totalPrice += price;

            selectedProducts.push({ productName, price, pricerenew, supportprice });
            totalPriceSpan.innerHTML=totalPriceSpanIn+totalPrice

        } else {
            totalPrice -= price;
            selectedProducts = selectedProducts.filter(item => item.productName !== productName);
            let rowToRemove = invoiceTable.querySelector(`[data-name="${CSS.escape(productName)}"]`);
            if (rowToRemove) rowToRemove.remove();
            totalPriceSpan.innerHTML=totalPriceSpanIn+totalPrice

        }



        totalPriceC.innerHTML = totalPrice.toLocaleString()
        // افزودن فقط مقدار جدید

        selectedProducts.forEach(product => {
            console.log(product);

            addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
        });


        if (selectedPlan.productName) {

            addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
        }



    });
});

seeBasketBtn.forEach(element => {
    console.log(element);
});
let openPopCalPrice = document.querySelector(".openPopCalPrice")
let closepopPriceCalculate = document.querySelector(".closepopPriceCalculate")
let popPriceCalculate = document.querySelector(".popPriceCalculate")
openPopCalPrice.addEventListener("click", function (params) {
    popPriceCalculate.classList.add("activePopCalculator")

    setTimeout(() => {

        popPriceCalculate.classList.add("activePopCalculator2")
    }, 400);
})


closepopPriceCalculate.addEventListener("click", function (params) {

    popPriceCalculate.classList.remove("activePopCalculator2")
    setTimeout(() => {

        popPriceCalculate.classList.remove("activePopCalculator")
    }, 400);
})
