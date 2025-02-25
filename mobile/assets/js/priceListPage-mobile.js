const accordions = document.querySelectorAll(".accordion");
let selectedPlan = [];
let selectedProducts = [];
let sumPrice = 0;


let invoiceTable = document.querySelector(".factorSection .rSide"); // جدول فاکتور
let emptyFactor = document.querySelector(".emptyFactor"); // پیام "فاکتور خالی است"
let totalPriceSpan = document.querySelector(".totalPrice"); // پیام "فاکتور خالی است"
totalPriceSpan.innerHTML=sumPrice

let totalPriceSpanIn = 0
totalPriceSpan.innerHTML = totalPriceSpanIn
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
        emptyFactor.style.display = "block"; // نمایش پیام "فاکتور خالی است"
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
        emptyFactor.style.display = "block";
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

    let factorList = document.querySelector(".factorSection .rSide");
    let totalPriceElement = document.querySelector(".totalPrice");

    // بررسی اینکه آیتم قبلاً اضافه شده یا نه

    if (!factorList?.querySelector(`[data-name="${CSS.escape(name)}"]`)) {
        let item = document.createElement("ul");
        item.classList.add("w-90p");
        item.classList.add("mx-auto");
        item.classList.add("border-b");
        item.classList.add("border-bgGray");
        item.classList.add("pt-4");
        item.setAttribute("data-name", name);
        item.innerHTML = `
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

                              ${
                               price==0?"رایگان":price.toLocaleString()+" ریال"} 
                            </span>
                            </p>
                    </li>
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                            تمدید سالانه :
                            <span class=" font-IRANSansWeb400">

                             ${pricerenew==0?"رایگان": pricerenew.toLocaleString()+" ریال"} 
                            </span>
                            </p>
                    </li>
                    <li class="mb-5">
                        <p class="font-IRANSansWeb600 text-sm">

                            پشتیبانی :
                            <span class=" font-IRANSansWeb400">

                              ${supportprice==0?"رایگان":supportprice.toLocaleString()+" ریال"} 
                            </span>
                            </p>
                    </li>


        `;

        factorList.appendChild(item);

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
let totalP = document.querySelector(".totalP")
let totalPriceC = document.querySelector(".totalPriceC")


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
        totalPriceSpanIn = price
        totalPriceSpan.innerHTML = totalPriceSpanIn + totalPrice
        if (productName && price > 0) {
            // جایگزینی مقدار جدید در آرایه
            selectedPlan = { productName, price, pricerenew, supportprice };

            // پاک کردن فاکتور قبلی
            clearInvoice();

            // افزودن فقط مقدار جدید

            selectedProducts.forEach(product => {

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




document.querySelectorAll(".panelaccordion .accordion__intro input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        let parentAccordion = this.closest(".accordion");

        if (!parentAccordion) return;

        let panelNameElement = parentAccordion.querySelector(".panel-name");
        let priceElement = parentAccordion.querySelector(".panel-price-renew");
        let pricerenewElement = parentAccordion.querySelector(".panel-price-yearly");
        let supportpriceElement = parentAccordion.querySelector(".panel-price-support");

        let panelName = panelNameElement ? panelNameElement.innerText.trim() : "";
        let price = priceElement ? parseInt(priceElement.innerText.replace(/,/g, '').trim(), 10) : 0;
        let pricerenew = pricerenewElement ? parseInt(pricerenewElement.innerText.replace(/,/g, '').trim(), 10) : 0;
        let supportprice = supportpriceElement ? parseInt(supportpriceElement.innerText.replace(/,/g, '').trim(), 10) : 0;

        // **پاک کردن فاکتور قبلی**
        clearInvoice();

        if (this.checked) {
            selectedPlan = { productName: panelName, price, pricerenew, supportprice };
        } 

        // **افزودن فقط مقدارهای جدید از آرایه‌ها**
        selectedProducts.forEach(product => {
            addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
        });

        if (selectedPlan.productName) {
            addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
        }




        if (!this.checked) {
            // انتخاب تمام چک‌باکس‌های محصولات و uncheck کردن آنها
            document.querySelectorAll(".productaccordion .accordion__intro input[type=checkbox]").forEach(productCheckbox => {
                productCheckbox.checked = false;
            });

            // پاک کردن selectedProducts و فاکتور
            selectedProducts = [];
            clearInvoice();

            // بازسازی فاکتور و نمایش پیام "فاکتور خالی است"
            emptyFactor.style.display = "block"; // نمایش پیام "فاکتور خالی است"
            totalPriceSpanIn = 0;
            totalPriceSpan.innerHTML = totalPriceSpanIn;
        }


        if (this.checked) {
            // اضافه کردن قیمت محصول به جمع کل
            sumPrice += price;
        } else {
            // اگر چک‌باکس غیرفعال شد، قیمت محصول از جمع کل کم می‌شود
            sumPrice -= price;
        }
        totalPriceSpan.innerHTML=sumPrice
    });
});

// **مدیریت چک‌باکس‌های محصولات**
document.querySelectorAll(".productaccordion .accordion__intro input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        let parentAccordion = this.closest(".accordion");
        let productNameElement = parentAccordion.querySelector(".product-name");
        let priceElement = parentAccordion.querySelector(".product-price");
        let pricerenewElement = parentAccordion.querySelector(".product-price-renew");
        let supportpriceElement = parentAccordion.querySelector(".product-price-support");
        let errorPriceList = document.querySelector(".errorPriceList");
        let productName = productNameElement ? productNameElement.innerText.trim() : "";
        let price = priceElement ? parseInt(priceElement.innerText.replace(/,/g, '').trim(), 10) : 0;
        let pricerenew = pricerenewElement ? parseInt(pricerenewElement.innerText.replace(/,/g, '').trim(), 10) : 0;
        let supportprice = supportpriceElement ? parseInt(supportpriceElement.innerText.replace(/,/g, '').trim(), 10) : 0;
        let panelCheckbox = parentAccordion.querySelector(".accordion__intro input[type=checkbox]");
        let panelCheckFlage=false
        let plansInput = document.querySelectorAll(".panelaccordion .accordion__intro input[type=checkbox]");
        plansInput.forEach(element => {
            if (element.checked) {
                panelCheckFlage=true
            }
        }); 
console.log(panelCheckFlage);
if (!panelCheckFlage) {
        errorPriceList.classList.add("activeErrorPriceList2");
    
        setTimeout(() => {
            errorPriceList.classList.add("activeErrorPriceList");
    
            // غیرفعال کردن چک‌باکس محصول
            checkbox.checked = false;
        }, 400);
    
        setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList"), 5000);
        setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList2"), 5080);
        return; // ادامه تابع را متوقف کن
    
}

      
        
        if (this.checked) {
            selectedProducts.push({ productName, price, pricerenew, supportprice });
        } 

          // اگر چک‌باکس uncheck شده، محصول باید از selectedProducts حذف شود
          if (!this.checked) {
            selectedProducts = selectedProducts.filter(product => product.productName !== productName);
        } else {
            selectedProducts.push({ productName, price, pricerenew, supportprice });
        }
        
        // **پاک کردن فاکتور قبلی و اضافه کردن مقدارهای جدید**
        
        clearInvoice();

        selectedProducts.forEach(product => {
            addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
        });

        if (selectedPlan.productName) {
            addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
        }


        if (this.checked) {
            // اضافه کردن قیمت محصول به جمع کل
            sumPrice += price;
        } else {
            // اگر چک‌باکس غیرفعال شد، قیمت محصول از جمع کل کم می‌شود
            sumPrice -= price;
        }
        totalPriceSpan.innerHTML=sumPrice
    });
});



