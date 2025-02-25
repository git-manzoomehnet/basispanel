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
             <ul class="w-90p mx-auto border-b border-bgGray pt-4">
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                           
                            <span class=" font-IRANSansWeb400">

                               ${name}
                            </span>
                            </p>
                    </li>
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                            قیمت سالانه :
                            <span class=" font-IRANSansWeb400">

                                ${price.toLocaleString()} 
                            </span>
                            </p>
                    </li>
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                            تمدید سالانه :
                            <span class=" font-IRANSansWeb400">

                                 ${pricerenew.toLocaleString()}
                                
                            </span>
                            </p>
                    </li>
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                            پشتیبانی :
                            <span class=" font-IRANSansWeb400">

                            ${supportprice}
                            </span>
                            </p>
                    </li>
                  </ul>

                                
        `;

    

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



document.querySelectorAll(".panelaccordion .accordion-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            document.querySelectorAll(".panelaccordion .accordion-checkbox").forEach((cb) => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
        }
    });
});
