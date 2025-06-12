    const accordions = document.querySelectorAll(".accordion");
    let selectedPlan = [];
    let selectedProducts = [];
    let endpointProducts = []; // آرایه‌ای برای ذخیره محصولات انتخاب‌شده

    let addToBasketBtn = document.querySelectorAll(".addToBasketBtn")
    let seeBasketBtn = document.querySelectorAll(".seeBasketBtn")

    let accordionCheckbox = document.querySelectorAll(".accordion-checkbox[type=checkbox]")
    let errorPriceList = document.querySelector(".errorPriceList")
    let totalP = document.querySelector(".totalP")
    let totalP1 = document.querySelector(".totalP1")
    let totalPriceC = document.querySelector(".totalPriceC")
    let sumPrice = 0;


    let invoiceTable = document.querySelector(".rSide tbody"); // جدول فاکتور
    let emptyFactor = document.querySelector(".emptyFactor"); // پیام "فاکتور خالی است"
    let totalPriceSpan = document.querySelector(".totalPrice"); // پیام "فاکتور خالی است"
    let totalPriceSpanIn = 0
    totalPriceSpan.innerHTML = totalPriceSpanIn
    function clearInvoice() {
        invoiceTable.innerHTML = '';  // حذف همه آیتم‌های فاکتور
        invoiceTable.appendChild(emptyFactor); // دوباره پیام فاکتور خالی را اضافه کن

    }
    function deleteRowFn(event) {
        let row = event.target.closest("tr");
        let productName = row.getAttribute("data-name");
        let productIndex = selectedProducts.findIndex(p => p.productName === productName);

        if (productIndex !== -1) {
            let productPrice = selectedProducts[productIndex].price;

            // کم کردن قیمت از totalPrice
            if (!isNaN(productPrice) && productPrice !== null) {
                totalPrice -= productPrice;
            }

            // حذف محصول از آرایه
            selectedProducts.splice(productIndex, 1);
        }

        // مقدار totalPrice را بعد از حذف، در HTML به‌روز کنیم
        totalPriceSpan.innerHTML = totalPrice.toLocaleString();


        // حذف از selectedPlan در صورت تطابق
        if (selectedPlan.productName === productName) {

            selectedPlan = {};  // خالی کردن selectedPlan
            selectedProducts = [];  // خالی کردن selectedPlan
            endpointProducts = [];  // خالی کردن selectedPlan
            totalPriceSpanIn = 0;
            totalPriceSpan.innerHTML = totalPriceSpanIn;
        }

        // حذف از selectedProducts
        selectedProducts = selectedProducts.filter(item => item.productName !== productName);
        if (invoiceTable.querySelectorAll(".invoice-item").length === 0) {
            selectedProducts = [];
            endpointProducts = [];
            selectedPlan = {}; // پاک کردن انتخاب شده‌ها
            clearInvoice();
            emptyFactor.style.display = "table-row";
            totalPriceSpanIn = 0;
            totalPriceSpan.innerHTML = totalPriceSpanIn;












        } else {
            emptyFactor.style.display = "none";
        }

        endpointProducts = endpointProducts.filter(item => item.title !== productName);


        totalPriceSpan.innerHTML = totalPrice.toLocaleString();
        if (selectedPlan.productName !== productName) {
            proListCheckBox.forEach(element => {
                let productNameCheck = element.closest("tr").querySelectorAll("td")[1].querySelector("span")?.innerText.trim();
                if (productNameCheck == productName) {
                    element.checked = false

                }

            });
        }

        // حذف از جدول
        row.remove();



        // **اگر selectedPlan خالی نبود ولی هنوز محصولی هست، فاکتور رو بازسازی کن**
        clearInvoice();
        selectedProducts.forEach(product => {
            addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
        });

        if (selectedPlan.productName) {
            addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
        }
        endpointProducts.forEach(product => {
            addToInvoice(product.title, product.yearlyPrice, product.renewPrice, product.supportPrice);
        });
        // بررسی مجدد برای نمایش پیام "فاکتور خالی است"



        // یافتن چک‌باکس مربوط به محصول و uncheck کردن آن
        let checkbox = document.querySelector(`input[type=checkbox][data-name="${CSS.escape(productName)}"]`);
        if (checkbox) {
            checkbox.checked = false;
        }


        if (selectedProducts.length === 0 && Object.keys(selectedPlan).length === 0) {
            totalPriceSpanIn = 0;
            totalPriceSpan.innerHTML = totalPriceSpanIn;



            totalP1.classList.remove("block");
            totalP.classList.remove("block");
            totalP1.classList.add("hidden");
            totalP.classList.add("hidden");


            document.querySelector(".totalP1 span").innerHTML = 0
            document.querySelector(".totalP span").innerHTML = 0



            if (accordionCheckbox.length > 0) {
                accordionCheckbox.forEach(element => {
                    element.checked = false;
                });
            }
            if (addToBasketBtn.length > 0) {
                addToBasketBtn.forEach(el => {
                    el.classList.remove("hidden");
                    el.classList.add("flex");
                    if (el.nextElementSibling) {
                        el.nextElementSibling.classList.add("hidden");
                        el.nextElementSibling.classList.remove("flex");
                    }
                });
            }
        }

        // **بررسی اینکه آیا selectedPlan خالی شده؟**
        if (Object.keys(selectedPlan).length === 0) {
            // **اگر selectedPlan خالی شد، کل فاکتور رو پاک کن**
            selectedProducts = []; // پاک کردن تمام محصولات

            selectedPlan = {}; // پاک کردن انتخاب شده‌ها
            clearInvoice();
            emptyFactor.style.display = "table-row"; // نمایش پیام "فاکتور خالی است"
            return; // خروج از تابع
        }

    }

    function addToInvoice(name, price, pricerenew, supportprice) {
        if (!invoiceTable.querySelector(`[data-name="${CSS.escape(name)}"]`)) {
            let row = document.createElement("tr");
            row.setAttribute("data-name", name);
            row.classList.add("invoice-item");


            // بررسی مقدار price
            let priceText = (price === "رایگان" || price === 0 || price === "0") ? "رایگان" :
                (!isNaN(price) && price !== null && price !== undefined) ? price.toLocaleString() : "Call us";

            // **اصلاح شده: بررسی مقدار رایگان در pricerenew**
            let pricerenewText;
            if (pricerenew === undefined || pricerenew === null || pricerenew === "") {
                pricerenewText = "Call us"; // مقدار پیش‌فرض برای مقدار نامعتبر
            } else if (pricerenew === "رایگان" || pricerenew === 0 || pricerenew === "0") {
                pricerenewText = "رایگان";
            } else if (typeof pricerenew === "string" && pricerenew.includes("%")) {
                pricerenewText = pricerenew; // اگر مقدار شامل % بود، دست‌نخورده نمایش بده
            } else if (!isNaN(parseFloat(pricerenew))) {
                pricerenewText = parseFloat(pricerenew).toLocaleString();
            } else {
                pricerenewText = pricerenew; // مقدار دست‌نخورده برگردان
            }

            // بررسی مقدار supportprice
            let supportpriceText;
            if (supportprice === "رایگان" || supportprice === 0 || supportprice === "0") {
                supportpriceText = "رایگان";
            } else if (typeof supportprice === "string" && supportprice.includes("%")) {
                supportpriceText = supportprice; // اگر مقدار شامل % بود، دست‌نخورده نمایش بده
            } else if (supportprice !== undefined && supportprice !== null && supportprice !== "" && !isNaN(parseFloat(supportprice))) {
                supportpriceText = parseFloat(supportprice).toLocaleString();
            } else {
                supportpriceText = "Call us";
            }

            row.innerHTML = `
                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                    ${name}
                </td>
                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                    ${priceText}
                </td>
                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                    ${pricerenewText}
                </td>
                <td class="font-Inter400 pt-9 pb-7 text-sm text-center">
                    ${supportpriceText}
                </td>
                <td class="deleteRow cursor-pointer px-6" onclick="deleteRowFn(event)">
                    <img src="/asset/images/deleteRow.svg" alt="deleteRow">
                </td>
            `;

            invoiceTable.appendChild(row);

            console.log("selectedPlan.price", selectedPlan.price);
            console.log("selectedProducts.price", selectedProducts.price);
            console.log("endpointProducts.price", endpointProducts.price);


            let selectedPrice = 0

            selectedProducts.forEach(product => {
                selectedPrice += product.price
            });
            let proPrice = 0
            endpointProducts.forEach(product => {
                proPrice += product.yearlyPrice
            });

            let newwtotal = selectedPlan.price + proPrice + selectedPrice

            console.log("selectedPlan.price", selectedPlan.price);
            console.log("selectedPrice", selectedPrice);
            console.log("proPrice", proPrice);
            console.log("newwtotal", newwtotal);

            document.querySelector(".totalPrice").innerHTML = newwtotal.toLocaleString()


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



    addToBasketBtn.forEach(btn => {
        btn.addEventListener("click", function () {
            console.log(btn);

            let column = this.closest("th");
            let table = column.closest("table");

            let colIndex = [...column.parentElement.children].indexOf(column); // شماره ستون کلیک‌شده
            let rows = table.querySelectorAll("tbody tr");

            let productName = "";
            let price = 0;
            let pricerenew = 0;
            let supportprice = 0;


            if (productName && price > 0) {
                // جایگزینی مقدار جدید در آرایه
                selectedPlan = { productName, price, pricerenew, supportprice };
                // پاک کردن فاکتور قبلی
                clearInvoice();
                enableNextSteps();
                // افزودن فقط مقدار جدید
                // افزودن فقط مقدار جدید

                selectedProducts.forEach(product => {

                    addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
                });

                if (selectedPlan.productName) {

                    addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
                }
                endpointProducts.forEach(product => {
                    addToInvoice(product.title, product.yearlyPrice, product.renewPrice, product.supportPrice);
                });
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
            const changeEvent = new Event('change');
            parentAccordion.dispatchEvent(changeEvent);
        })
    });
    let totalPrice = 0;






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


    document.querySelectorAll(".seeBasketBtn").forEach(element => {

        element.addEventListener("click", function () {
            const targetSection = document.querySelector(".productFactorContainer");
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 150; // فاصله 100 پیکسلی از بالا
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
            }
        });
    });


    let endpointAddtoFactor = document.querySelectorAll(".endpoint-addtoFactor");

    endpointAddtoFactor.forEach(element => {
        
        element.addEventListener("click", function () {


            if (!selectedPlan || Object.keys(selectedPlan).length === 0) {
                errorPriceList.classList.add("activeErrorPriceList2");

                setTimeout(() => {
                    errorPriceList.classList.add("activeErrorPriceList");

                }, 400);

                setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList"), 5000);
                setTimeout(() => errorPriceList.classList.remove("activeErrorPriceList2"), 5080);

                return; // خروج از تابع تا قیمت اضافه نشود
            }


            // پیدا کردن والد مربوط به این دکمه
            let serverBox = element.closest(".serverBox");

            // گرفتن اطلاعات مورد نظر
            let title = serverBox.querySelector(".endpoint-title-web")?.innerText.trim() || "نامشخص";
            let yearlyPrice = serverBox.querySelector(".endpoint-yearly-price")?.innerText.trim().replace(/,/g, '') || "0";
            let endpointTitle = serverBox.querySelector(".endpoint-title")?.innerText.trim() || "نامشخص";
            let renewPrice = serverBox.querySelector(".endpoint-newr-price")?.innerText.trim().replace(/,/g, '') || "0";
            let supportPrice = serverBox.querySelector(".endpoint-support-price")?.innerText.trim().replace(/,/g, '') || "0";
            let quantity = serverBox.querySelector(".endpoint-number")?.value || "1";

            // تبدیل قیمت‌ها به عدد یا مقدار مناسب
            yearlyPrice = yearlyPrice === "رایگان" ? "رایگان" : (parseFloat(yearlyPrice) || "0");
            renewPrice = renewPrice === "رایگان" ? "رایگان" : (parseFloat(renewPrice) || "0");
            supportPrice = supportPrice === "رایگان" ? "رایگان" : (parseFloat(supportPrice) || "0");
            quantity = parseInt(quantity, 10) || 1;

            let totalPrice = quantity * (isNaN(yearlyPrice) ? 0 : yearlyPrice);

            // بررسی اینکه محصول قبلاً اضافه شده یا نه
            let existingProduct = endpointProducts.find(p => p.title === title);
            if (existingProduct) {
                existingProduct.quantity += quantity;
                existingProduct.totalPrice = existingProduct.quantity * (isNaN(existingProduct.yearlyPrice) ? 0 : existingProduct.yearlyPrice);
            } else {
                endpointProducts.push({
                    title: title + endpointTitle,
                    yearlyPrice: totalPrice,
                    renewPrice: renewPrice,
                    supportPrice: supportPrice,
                });
            }


            clearInvoice();
            selectedProducts.forEach(product => {
                addToInvoice(product.productName, product.price, product.pricerenew, product.supportprice);
            });

            if (selectedPlan.productName) {
                addToInvoice(selectedPlan.productName, selectedPlan.price, selectedPlan.pricerenew, selectedPlan.supportprice);
            }
            // افزودن محصول به فاکتور
            endpointProducts.forEach(product => {
                addToInvoice(product.title, product.yearlyPrice, product.renewPrice, product.supportPrice);
            });


            
    //   args.closest(".accordion__content").parentElement.querySelector(".accordion-checkbox").checked = true
    //                 // if (animationStepper.steps[1].disabled) {
    //                 const changeEvent = new Event('change');
    //                 args.closest(".accordion__content").parentElement.querySelector(".accordion-checkbox").dispatchEvent(changeEvent);




        });
    });

