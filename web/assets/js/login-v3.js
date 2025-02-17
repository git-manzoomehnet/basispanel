const host = {
    settings: {
        'connection.web.callcommand': '/',
        'connection.web.basiscore': 'https://basispanel.ir/apicms',
        'connection.web.accounting': 'https://basispanel.ir/apicms',
        'connection.web.trust_login': 'https://basispanel.ir/apicms',
        'connection.web.media': 'https://basispanel.ir/apicms',
        'default.dbsource.verb': 'post',
        'default.call.verb': 'get',
        "connection.web.callcommand": "/",
        'default.viewCommand.groupColumn': 'prpid',
        'default.dmnid': '35',
        'default.binding.regex': '\\{##([^#]*)##\\}'
    }
}


let CountryCodesApi = []
let form = document.querySelector('form.userLogin')
let containerInput = document.createElement('div')
let firsttBtn = document.querySelector('button.firstBtn')
let Errorcontainer = document.querySelector('.Alert-container')
let ErrorText = Errorcontainer.querySelector('p.error')
let PopUp = document.querySelector('.Popup-container')
let token;
let hashid;
let IS = false
let IsCreateCaptcha = false
let IsUpdateCaptcha = false
let IsCreateMobileInput = false
let IsCreatePassword = false
let IsResendEmail = false
let IsCallLogin = false
let showCaptcha = false
let captchaID
let firstClick = false
let isRefreshCaptcha = false
const AlertMessage = (className, errorText) => {
    console.log('AlertMessage');
    console.log('className', className);
    console.log('errorText', errorText);
    Errorcontainer.classList.add(className)
    Errorcontainer.classList.add('Show')
    ErrorText.innerHTML = errorText
    setTimeout(() => {
        Errorcontainer.classList.remove('Show')
        setTimeout(() => {
            Errorcontainer.classList.remove(className)
        }, 2200);
    }, 2000);

}
console.log(firsttBtn, 'firsttBtn');
const SelectBox = () => {
    // SELECTBOX
    let defOP = document.querySelectorAll('.default_option')
    defOP.forEach((d) => {
        d.addEventListener('click', (e) => {
            e.currentTarget.parentElement.classList.toggle("active")
            let lis = e.currentTarget.nextElementSibling.querySelectorAll('.select_ul li')
            lis.forEach(l => {
                l.addEventListener('click', (e1) => {
                    let currentele = e1.currentTarget.querySelector('p').innerHTML
                    console.log(e1.currentTarget);
                    e1.currentTarget.parentElement.previousElementSibling.querySelector('p').innerHTML = currentele;
                    e1.currentTarget.classList.add("active")
                    e1.currentTarget.parentElement.parentElement.classList.remove("active")
                    let countrycode = e1.currentTarget.querySelector('.option').getAttribute('data-code')
                    let countryTitle = e1.currentTarget.querySelector('.option').getAttribute('data-id')
                    console.log('countrycode', countrycode);
                    $bc.setSource('db.countrycode', countrycode)
                    let userinput = document.querySelector('input[name="country"]')
                    let userinputcode = document.querySelector('input[name="countryCode"]')
                    userinput.setAttribute('value', countryTitle)
                    userinputcode.setAttribute('value', countrycode)
                })
            })
        })
    })
}

const createButtonSubmit = () => {
    let button = document.createElement('button')
    button.type = "submit"
    return button
}
const createSpan = (ClassName = 'userSpan') => {
    let Span = document.createElement('span')
    Span.classList.add(ClassName)
    return Span
}
const createInputContainer = (className = 'Input-row') => {
    let inputContainer = document.createElement('div')
    inputContainer.classList.add(className)
    return inputContainer
}
const createInput = (type, placeHolder, name) => {
    let input = document.createElement('input')
    input.type = type
    input.setAttribute('placeholder', placeHolder)
    input.setAttribute('name', name)
    return input
}
const toggleEye = (target, IsShowPass) => {
    if (!IsShowPass) {
        console.log('نمایش رمز');
        console.log(IsShowPass, 'IsShowPass');
        target.classList.add('show')
        document.querySelector('input[name="code"]').setAttribute('type', 'text')
    }
    else {
        console.log(IsShowPass, 'IsShowPass');
        console.log('پنهان رمز');
        target.classList.remove('show')
        document.querySelector('input[name="code"]').setAttribute('type', 'password')
    }


}
const newUserFormMobile = (mobileUser) => {
    let container
    let containerPass1
    let containerPass2
    let inputPassword
    let mobileInput
    let inputPassword2
    let passIcon
    let passIcon2
    let mobileUserr
    let mobileUserrC
    let passIcon3
    container = createInputContainer('NewuserInput')
    mobileUserrC = createInputContainer('passContainer')
    containerPass1 = createInputContainer('passContainer')
    containerPass2 = createInputContainer('passContainer')
    mobileInput = createInput('text', mobileUser, 'UserName2')
    mobileInput.setAttribute('readonly', true)
    mobileUserr = createInput('text', 'شماره موبایل', 'mobile')
    container.appendChild(mobileInput)
    inputPassword = createInput('password', 'رمز عبور', 'password')
    inputPassword2 = createInput('password', 'تکرار رمز عبور', 'password2')
    containerPass1.appendChild(inputPassword)
    containerPass2.appendChild(inputPassword2)
    container.appendChild(containerPass1)
    container.appendChild(containerPass2)
    passIcon = createSpan('requireIcon')
    passIcon.innerText = 'اجباری'
    containerPass1.appendChild(passIcon)
    passIcon2 = createSpan('requireIcon')
    passIcon2.innerText = 'اجباری'
    containerPass2.appendChild(passIcon2)
    passIcon3 = createSpan('optionalIcon')
    passIcon3.innerText = 'اختیاری'
    mobileUserrC.appendChild(mobileUserr)
    mobileUserrC.appendChild(passIcon3)
    container.appendChild(mobileUserrC)
    return container
}
const newUserFormEmail = (userNameNew) => {
    let container
    let containerPass1
    let containerPass2
    let mobileInput
    let inputPassword
    let inputPassword2
    let passIcon
    let passIcon2
    let mobileUserr
    let mobileUserrC
    let passIcon3
    container = createInputContainer('NewuserInput')
    mobileUserrC = createInputContainer('mobileUser')
    containerPass1 = createInputContainer('passContainer')
    containerPass2 = createInputContainer('passContainer')
    mobileInput = createInput('text', userNameNew, 'email')
    mobileInput.setAttribute('readonly', true)
    mobileInput.setAttribute('value', document.querySelector(' input[name="UserName"]').value)
    mobileUserr = createInput('text', 'شماره موبایل', 'mobile')
    container.appendChild(mobileInput)
    inputPassword = createInput('password', 'رمز عبور', 'code')
    inputPassword2 = createInput('password', 'تکرار رمز عبور', 'recode')
    containerPass1.appendChild(inputPassword)
    containerPass2.appendChild(inputPassword2)
    container.appendChild(containerPass1)
    container.appendChild(containerPass2)
    passIcon = createSpan('requireIcon')
    passIcon.innerText = 'اجباری'
    containerPass1.appendChild(passIcon)
    passIcon2 = createSpan('requireIcon')
    passIcon2.innerText = 'اجباری'
    containerPass2.appendChild(passIcon2)
    passIcon3 = createSpan('optionalIcon')
    passIcon3.innerText = 'اختیاری'
    mobileUserrC.appendChild(mobileUserr)
    mobileUserrC.appendChild(passIcon3)
    container.appendChild(mobileUserrC)
    return container
}
const InvelidToken = (responseJson) => {
    AlertMessage('Error', ' توکن نامعتبر است')
    let container
    let spanP
    if (!IsUpdateCaptcha || !IsCallLogin) {
        container = createInputContainer('error-container')
        spanP = createSpan('error-p')
        container.appendChild(spanP)
        IsUpdateCaptcha = true
        IsCallLogin = true
    }
    let seconds = responseJson.remain_time;
    let countdown = setInterval(function () {
        seconds--;
        seconds = seconds.toLocaleString(undefined, {
            minimumIntegerDigits: 2
        })
        if (spanP) {
            spanP.textContent = `00 : ${seconds}  ثانیه دیگر تلاش کنید`;
        }
        if (seconds < 1) {
            clearInterval(countdown);
            spanP.textContent = "";
            container.remove()
        }
    }, 1000);

    form.insertBefore(container, form.querySelector('.BTN'))
}
const ShowRemaintime = (responseJson, createResend) => {
    let container = createInputContainer('error-container')
    let spanP = createSpan('error-p')
    container.appendChild(spanP)
    let seconds = 59;
    let countdown = setInterval(function () {
        seconds--;
        seconds = seconds.toLocaleString(undefined, {
            minimumIntegerDigits: 2
        })
        spanP.textContent = `00 : ${seconds} تا انقضا کد`;
        if (seconds < 1) {
            clearInterval(countdown);
            spanP.textContent = "";
            spanP.remove()
        }
    }, 1000);

    form.insertBefore(container, form.querySelector('.BTN'))
    if (createResend) {
        let containerRe = document.querySelector('.error-container')
        let spanResend = createSpan('ResendSMS')
        spanResend.classList.add('ResendSMS')
        spanResend.innerHTML = 'ارسال مجدد کد'
        containerRe.appendChild(spanResend)
        document.querySelector('.ResendSMS').onclick = function (e) {
            if (seconds <= 0) {
                $bc.setSource("resend.sms", true);
                console.log('ارسال مجدد کد');
                AlertMessage('Success', 'کد احراز هویت از طریق پیامک ارسال شد')
            }
            else {
                AlertMessage('Error', `از زمان اعتبار کد قبلی ${seconds} ثانیه باقی مانده`)
            }


        }
        createResend = false
    }
}
const normalizePhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('09')) {
        console.log("phoneNumber.startsWith('09')");

        return '+98' + phoneNumber.slice(1)
    }
    if (phoneNumber.startsWith('98')) {
        console.log("phoneNumber.startsWith('98')");
        return '+' + phoneNumber
    }
    else if (phoneNumber.startsWith('05')) {
        console.log("phoneNumber.startsWith('05')")
        return '+971' + phoneNumber.slice(1)
    }
    else if (phoneNumber.startsWith('971')) {
        console.log("phoneNumber.startsWith('971')")
        return '+' + phoneNumber
    }

    return phoneNumber
}
const getCountryByPhoneNumber = (phoneNumber) => {
    const countryCodes = {
        '+98': 'Iran',
        '+971': 'United Arabic',
        '+1': 'UnitedState | canada',
        '+44': 'UnitedKingdom',
        '+91': 'India',
        '+61': 'Australia',
        '+33': 'France',
        '+81': 'Japan',
    }
    for (const code in countryCodes) {
        console.log(code);
        console.log(phoneNumber, 'phoneNumber in getCountryByPhoneNumber ');
        if (phoneNumber.startsWith(code)) {
            return countryCodes[code]
        }
    }
    return 'کشور پیدا نشد'
}
const invelidPhoneNumber = (phoneNumber) => {
    const pattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    if (!phoneNumber) {
        return false;
    }
    else {
        if (pattern.test(phoneNumber)) {
            console.log('invelidPhoneNumber true', phoneNumber);

            return true;
        } else {
            console.log('invelidPhoneNumber false', phoneNumber);
            return false;
        }
    }
    return true

}

function forgetPasswordFn(e) {
    console.log(e);
    document.querySelector('.passwordBox').remove()
    form.setAttribute("name", "form.forgetpassword")
    firsttBtn.click()
};

const showCaptchaFn = (captchaId) => {
    console.log('showCaptcha');

    if (!IsCreateCaptcha) {
        let container = createInputContainer('captchabox')
        let inputCaptcha = createInput('text', '', 'captchaid')
        let captchImg = document.createElement('img')
        let span = createSpan('refreshCaptcha')
        span.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L8.99 7H15.99V0L13.64 2.35Z" fill="#004B85"/>
</svg>
`
        container.appendChild(captchImg)
        container.appendChild(inputCaptcha)
        container.appendChild(span)
        form.insertBefore(container, form.querySelector('.BTN'))
        IsCreateCaptcha = true
    }
    showCaptcha = true
    document.querySelector('.captchabox img').setAttribute('src', `https://trust-login.com/${captchaId}`)
    document.querySelector('.refreshCaptcha').onclick = function (e) {
        $bc.setSource("run.token", true);
        form.querySelector('.captchabox input[type="text"]').value = ''
        isRefreshCaptcha = true
    }
}

let input = document?.querySelector(".userLogin  input[name='UserName']")
input.addEventListener('input', (e) => {
    let value = e.currentTarget.value.trim()
    console.log(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^(?:09|98|\+98)\d{9}$/
    const UnitedArabicRegex = /^(?:05|971|\+971)(50|52|54|55|56|58)\d{6}$/
    if (emailRegex.test(value)) {
        console.log('کاربر ایمیل وارد میکنه');
        input.parentElement.classList.add('mobileInput')
        input.classList.add('nonePadding')
        let emailIcon = createSpan('mobile-icon')
        emailIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10V11.45C20 12.4333 19.6625 13.2708 18.9875 13.9625C18.3125 14.6542 17.4833 15 16.5 15C15.9167 15 15.3667 14.875 14.85 14.625C14.3333 14.375 13.9 14.0167 13.55 13.55C13.0667 14.0333 12.5208 14.3958 11.9125 14.6375C11.3042 14.8792 10.6667 15 10 15C8.61667 15 7.4375 14.5125 6.4625 13.5375C5.4875 12.5625 5 11.3833 5 10C5 8.61667 5.4875 7.4375 6.4625 6.4625C7.4375 5.4875 8.61667 5 10 5C11.3833 5 12.5625 5.4875 13.5375 6.4625C14.5125 7.4375 15 8.61667 15 10V11.45C15 11.8833 15.1417 12.25 15.425 12.55C15.7083 12.85 16.0667 13 16.5 13C16.9333 13 17.2917 12.85 17.575 12.55C17.8583 12.25 18 11.8833 18 11.45V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18H14C14.2833 18 14.5208 18.0958 14.7125 18.2875C14.9042 18.4792 15 18.7167 15 19C15 19.2833 14.9042 19.5208 14.7125 19.7125C14.5208 19.9042 14.2833 20 14 20H10ZM10 13C10.8333 13 11.5417 12.7083 12.125 12.125C12.7083 11.5417 13 10.8333 13 10C13 9.16667 12.7083 8.45833 12.125 7.875C11.5417 7.29167 10.8333 7 10 7C9.16667 7 8.45833 7.29167 7.875 7.875C7.29167 8.45833 7 9.16667 7 10C7 10.8333 7.29167 11.5417 7.875 12.125C8.45833 12.7083 9.16667 13 10 13Z" fill="#C8CCCF"/>
</svg>
` 
        input.classList.add('nonePadding')
        input.parentElement.appendChild(emailIcon)
    }
    else if (phoneRegex.test(value) || UnitedArabicRegex.test(value)) {
        console.log('کاربر شماره وارد میکنه');
        let isPhonenumberValidFormat
        input.parentElement.classList.add('mobileInput')
        $bc.setSource('run.countryCode', true)
        input.classList.remove('nonePadding')
    }
})

// ---------------------------onProcessedToken-----------------------------------------
async function onProcessedToken(args) {
    const response = args.response;
    if (response.status == 403) {
        // forbidden
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        if (errorid) {
            if (errorid == '3') {
                InvelidToken(responseJson)
            }

        }
    }
    if (response.status == 200) {
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        const token = responseJson.token;
        console.log('onProcessedToken =>', responseJson);
        $bc.setSource('db.recieveToken', responseJson.token)
        if (errorid) {
            if (errorid == '10') {
                // invalid inputs 
                AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
            }
            if (errorid == '1') {
                // invalid token 
                AlertMessage('Error', ' توکن نامعتبر است')
            }
            if (errorid == '3') {
                InvelidToken(responseJson)
            }
            if (errorid == '9') {
                $bc.setSource("token.token", token)
                let userName = document?.querySelector(".userLogin  input[name='UserName']")
                if (userName != undefined && userName != "") {
                    userName.setAttribute('value', userName.value)
                    console.log('userName', userName.value);
                }

                if (captcha == true) {
                    firsttBtn.type = 'button'
                    console.log('user IP is not in whitelist');
                    captchaID = captchaId
                    console.log('captchaId is', captchaID);
                    showCaptcha = true
                    if (isRefreshCaptcha) {
                        console.log('RefreshCaptcha');
                        // beacuase of captcha = true show captch
                        showCaptchaFn(captchaID)

                    }
                    firsttBtn.addEventListener('click', (e) => {
                        console.log('firsttBtn click');
                        let userName = document.querySelector(".userLogin  input[name='UserName']").value
                        // $bc.setSource('run.token',true)
                        if (userName != '') {
                            console.log('userName is fil ');
                            if (showCaptcha) {
                                console.log('showwww');
                                // beacuase of captcha = true show captch
                                showCaptchaFn(captchaID)

                            }
                            console.log('firsttBtn type submit');
                            if (!firstClick) {
                                e.preventDefault()
                                firsttBtn.type = 'submit'
                                firstClick = true
                            }
                            e.currentTarget.setAttribute('type', 'submit')

                        }
                        else {
                            console.log('userName is null ');
                            AlertMessage('Error', 'لطفا نام کاربری یا شماره موبایل را وارد نمایید')
                        }

                    })

                }
                if (captcha == false) {
                    console.log('user IP is in whitelist');
                    firsttBtn.type = 'button'
                    captchaID = captchaId
                    firsttBtn.addEventListener('click', (e) => {
                        console.log('firsttBtn click');
                        let userName = document.querySelector(".userLogin  input[name='UserName']").value
                        if (userName != '') {
                            console.log('userName is fil ');
                            e.currentTarget.setAttribute('type', 'submit')

                        }
                        else {
                            console.log('userName is null ');
                            AlertMessage('Error', 'لطفا نام کاربری یا شماره موبایل را وارد نمایید')
                        }

                    })
                }
            }
        }

    }
}


async function onProcessedAuthenticationFn(args) {
    const response = args.response;
    if (response.status == 400 || response.status == 403) {
        // forbidden
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        if (errorid) {
            if (errorid == '10') {
                // invalid inputs 
                AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
            }
            if (errorid == '15') {
                // expired token
                InvelidToken(responseJson)
            }
            if (errorid == '17') {
                // incorrect captcha
                AlertMessage('Error', 'کپچا اشتباه وارد شده')
            }
            if (errorid == '3') {
                InvelidToken(responseJson)
            }
            if (errorid == '54') {
                // incorrect useragent
                AlertMessage('Error', 'useragent مرورگر معتبر نیست')
            }
            if (errorid == '58') {
                // disabled user
                AlertMessage('Error', ' کاربر غیرفعال است')
            }
            if (errorid == '1') {
                // invalid token 
                InvelidToken(responseJson)
            }
            if (errorid == '3') {
                InvelidToken(responseJson)
            }

        }
    }
    if (response.status == 200) {
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        const hashid = responseJson.hashid;
        console.log('onProcessedAuthenticationFn =>', responseJson);
        $bc.setSource("authentication.hashid", hashid);
        if (errorid) {
            if (errorid == '10') {
                // invalid inputs 
                AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
            }
            if (errorid == '1') {
                // invalid token 
                InvelidToken(responseJson)
            }
            if (errorid == '3') {
                InvelidToken(responseJson)
            }
            if (errorid == '8') {
                // recovery email 
                AlertMessage('Success', 'این ایمیل برای نام کاربری دیگری ثبت گردیده ، ایمیل بازیابی نام کاربری برای شما ارسال گردید')
                form.insertBefore(container, form.querySelector('.BTN'))
                if (!IsResendEmail) {
                    let containerRe = document.querySelector('.ResendEmail-container')
                    let spanResend = createSpan('ResendEmail')
                    spanResend.classList.add('ResendEmail')
                    spanResend.innerHTML = 'ارسال مجدد ایمیل'
                    containerRe.appendChild(spanResend)
                    document.querySelector('.ResendEmail').onclick = function (e) {
                        $bc.setSource("resend.email", true);
                        console.log('ارسال مجدد ایمیل');
                    }
                    IsResendEmail = true
                }
            }
            if (errorid == '17') {
                // incorrect captcha
                AlertMessage('Error', 'کپچا اشتباه وارد شده')
            }
            if (errorid == '54') {
                // incorrect useragent
                AlertMessage('Error', ' نوکن نامعتبر است ')
            }
            if (errorid == '53') {
                // activation email
                AlertMessage('Success', 'ایمیل فعالسازی مجددا برای شما ارسال شد')
                IsResendEmail = false
                if (!IsResendEmail) {
                    let containerRe = document.querySelector('.ResendEmail-container')
                    let spanResend = createSpan('ResendEmail')
                    spanResend.classList.add('ResendEmail')
                    spanResend.innerHTML = 'ارسال مجدد ایمیل'
                    containerRe.appendChild(spanResend)
                    document.querySelector('.ResendEmail').onclick = function (e) {
                        $bc.setSource("resend.email", true);
                        console.log('ارسال مجدد ایمیل');
                    }
                    IsResendEmail = true
                }
            }
            if (errorid == '58') {
                // disabled user
                AlertMessage('Error', ' کاربر غیرفعال است')
            }
            if (errorid == '4') {
                // authentication by mobile – multi user
                const users = responseJson.users;
                const hashid = responseJson.hashid;
                form.setAttribute('name', "form.selectuser")
                $bc.setSource("authentication.hashid", hashid);
                // ------------------new changes ----------------
                console.log(users);
                document.querySelector('.captchabox').style.display = 'none'
                document.querySelector('.Input-Row').style.display = 'none'
                const mailsSelectBox = createInputContainer('mailsSelectBox')
                const emailListBox = createInputContainer('emailListBox')
                emailListBox.classList.add("input-title");
                emailListBox.innerText = "شماره موبایل وارد شده، به تعدادی اکانت مختلف متصل است، شما تمایل دارید با کدام اکانت وارد شوید ؟ ";
                form.insertBefore(emailListBox, form.querySelector('.BTN'))
                users.forEach((element, index, array) => {
                    const emailListLabel = document.createElement("label");
                    emailListLabel.classList.add("email-item");
                    const emailListRadio = createInput('radio', '', 'userid')
                    emailListRadio.setAttribute("value", `${users[index].userid}`);
                    if (index == 0) {
                        // emailListRadio.setAttribute("required", true);
                        emailListRadio.checked = true
                    }
                    const emailListSpan = document.createElement("span");
                    emailListSpan.classList.add("email-label");
                    emailListSpan.innerText = `${users[index].username}`;
                    emailListLabel.appendChild(emailListRadio);
                    emailListLabel.appendChild(emailListSpan);
                    mailsSelectBox.appendChild(emailListLabel)
                    form.insertBefore(mailsSelectBox, form.querySelector('.BTN'))
                });
            }
            if (errorid == '2') {
                form.setAttribute('name', 'form.login')
                let type = responseJson.type;
                let newUser = responseJson.newUser;

                if (type == "mobile") {
                    document.querySelector('.SelectBoxes').style.display = 'none'
                    document.querySelector('.mobile-icon').style.display = 'none'
                    if (newUser) {
                        // authentication by mobile - single user new user
                        console.log('کاربر با شماره موبایل وارد شده و کاربر جدید است');
                        document.querySelector('input[name="UserName"]').style.display = 'none'
                        if (document.querySelector('.captchabox')) {
                            document.querySelector('.captchabox').style.display = 'none'
                        }
                        let mobileUser = document.querySelector('input[name="UserName"]').getAttribute('placeholder')
                        let createResend
                        let containernewUserFor
                        if (!IsCreatePassword) {
                            let container = createInputContainer('passwordBox')
                            let mobileInputVal = document.querySelector("input[name='UserName']")
                            let inputPassword = createInput('text', `کد ارسال شده برای ${mobileInputVal.value} را وارد کنید`, 'code')
                            inputPassword.classList.add('nonePadding')
                            container.appendChild(inputPassword)
                            form.insertBefore(container, form.querySelector('.BTN'))
                            createResend = true
                            ShowRemaintime(responseJson, createResend)
                            IsCreatePassword = true
                            // containernewUserFor = newUserFormMobile(mobileInputVal.value)
                            // form.insertBefore(containernewUserFor, form.querySelector('.BTN'))
                        }



                    }
                    else {
                        // authentication by mobile - single user
                        console.log('کاربر با شماره موبایل وارد شده ');
                        if (document.querySelector('.captchabox')) {
                            document.querySelector('.captchabox').style.display = 'none'
                        }
                        document.querySelector('input[name="UserName"]').style.display = 'none'
                        let container
                        let mobileInputVal
                        let inputPassword
                        let createResend
                        if (!IsCreatePassword) {
                            let container = createInputContainer('passwordBox')
                            let mobileInputVal = document.querySelector("input[name='UserName']")
                            let inputPassword = createInput('text', `کد ارسال شده برای ${mobileInputVal.value} را وارد کنید`, 'code')
                            inputPassword.classList.add('nonePadding')
                            container.appendChild(inputPassword)
                            form.insertBefore(container, form.querySelector('.BTN'))
                            createResend = true
                            ShowRemaintime(responseJson, createResend)
                            IsCreatePassword = true
                        }


                    }

                }
                if (type == "username" || type == "email") {
                    if (newUser) {
                        // authentication by username - single user new user
                        console.log('کاربر با نام کاربری وارد شده و کاربر جدید است');
                        document.querySelector('.Input-Row:first-child').style.display = 'none'
                        if (document.querySelector('.captchabox')) {
                            document.querySelector('.captchabox').style.display = 'none'
                        }
                        let userNameNew = document.querySelector(' input[name="UserName"]').value
                        let container = newUserFormEmail(userNameNew)
                        let mobileInput = container.querySelector('input[name="email"]')
                        let mobileUserrC = container.querySelector('.mobileUser')
                        form.insertBefore(container, form.querySelector('.BTN'))
                        if (type == "username") {
                            mobileInput.setAttribute('name', 'email')
                            let emailContainer
                            let email
                            let emailIcon
                            emailIcon = createSpan('requireIcon')
                            emailIcon.innerText = 'اجباری'
                            emailContainer = createInputContainer('RequireEmail')
                            email = createInput('email', 'ایمیل (الزامی)', 'email')
                            emailContainer.appendChild(email)
                            emailContainer.appendChild(emailIcon)
                            container.insertBefore(emailContainer, mobileUserrC)

                        }

                    }
                    else {
                        // authentication by username - single user
                        console.log('کاربر با نام کاربری وارد شده ');
                        if (document.querySelector('.captchabox')) {
                            document.querySelector('.captchabox').style.display = 'none'
                        }
                        document.querySelector('.Input-Row:first-child').style.display = 'none'
                        let container
                        let userInputVal
                        let inputPassword
                        let createResend
                        let forgetPasswordContainer
                        let forgetPassword
                        if (!IsCreatePassword) {
                            let container = createInputContainer('passwordBox-email')
                            container.classList.add('passwordBox')
                            let spanPssIcon = createSpan('passwordEyeIcon')
                            spanPssIcon.innerHTML = `
                    <svg class="onShow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8CCCF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye" style="display: block;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                   <svg class="onHidden width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.175 8.3251C15.6583 8.80843 16.0125 9.35843 16.2375 9.9751C16.4625 10.5918 16.5417 11.2251 16.475 11.8751C16.475 12.1251 16.3833 12.3376 16.2 12.5126C16.0167 12.6876 15.8 12.7751 15.55 12.7751C15.3 12.7751 15.0875 12.6876 14.9125 12.5126C14.7375 12.3376 14.65 12.1251 14.65 11.8751C14.7333 11.4418 14.7083 11.0251 14.575 10.6251C14.4417 10.2251 14.2333 9.88343 13.95 9.6001C13.6667 9.31676 13.325 9.1001 12.925 8.9501C12.525 8.8001 12.1 8.76676 11.65 8.8501C11.4 8.8501 11.1875 8.75843 11.0125 8.5751C10.8375 8.39176 10.75 8.1751 10.75 7.9251C10.75 7.6751 10.8375 7.4626 11.0125 7.2876C11.1875 7.1126 11.4 7.0251 11.65 7.0251C12.2833 6.95843 12.9083 7.0376 13.525 7.2626C14.1417 7.4876 14.6917 7.84176 15.175 8.3251ZM12 6.0001C11.6833 6.0001 11.375 6.0126 11.075 6.0376C10.775 6.0626 10.475 6.10843 10.175 6.1751C9.89167 6.2251 9.6375 6.18343 9.4125 6.0501C9.1875 5.91676 9.03333 5.71676 8.95 5.4501C8.86667 5.18343 8.89583 4.9251 9.0375 4.6751C9.17917 4.4251 9.38333 4.2751 9.65 4.2251C10.0333 4.14176 10.4208 4.08343 10.8125 4.0501C11.2042 4.01676 11.6 4.0001 12 4.0001C14.2833 4.0001 16.3708 4.6001 18.2625 5.8001C20.1542 7.0001 21.6 8.61676 22.6 10.6501C22.6667 10.7834 22.7167 10.9209 22.75 11.0626C22.7833 11.2043 22.8 11.3501 22.8 11.5001C22.8 11.6501 22.7875 11.7959 22.7625 11.9376C22.7375 12.0793 22.6917 12.2168 22.625 12.3501C22.325 13.0168 21.9542 13.6418 21.5125 14.2251C21.0708 14.8084 20.5833 15.3418 20.05 15.8251C19.85 16.0084 19.6167 16.0834 19.35 16.0501C19.0833 16.0168 18.8667 15.8834 18.7 15.6501C18.5333 15.4168 18.4625 15.1626 18.4875 14.8876C18.5125 14.6126 18.625 14.3834 18.825 14.2001C19.225 13.8168 19.5917 13.4001 19.925 12.9501C20.2583 12.5001 20.55 12.0168 20.8 11.5001C19.9667 9.81676 18.7625 8.47926 17.1875 7.4876C15.6125 6.49593 13.8833 6.0001 12 6.0001ZM12 19.0001C9.76667 19.0001 7.725 18.3959 5.875 17.1876C4.025 15.9793 2.56667 14.3918 1.5 12.4251C1.41667 12.2918 1.35417 12.1459 1.3125 11.9876C1.27083 11.8293 1.25 11.6668 1.25 11.5001C1.25 11.3334 1.26667 11.1751 1.3 11.0251C1.33333 10.8751 1.39167 10.7251 1.475 10.5751C1.80833 9.90843 2.19583 9.27093 2.6375 8.6626C3.07917 8.05426 3.58333 7.5001 4.15 7.0001L2.075 4.9001C1.89167 4.7001 1.80417 4.4626 1.8125 4.1876C1.82083 3.9126 1.91667 3.68343 2.1 3.5001C2.28333 3.31676 2.51667 3.2251 2.8 3.2251C3.08333 3.2251 3.31667 3.31676 3.5 3.5001L20.5 20.5001C20.6833 20.6834 20.7792 20.9126 20.7875 21.1876C20.7958 21.4626 20.7 21.7001 20.5 21.9001C20.3167 22.0834 20.0833 22.1751 19.8 22.1751C19.5167 22.1751 19.2833 22.0834 19.1 21.9001L15.6 18.4501C15.0167 18.6334 14.425 18.7709 13.825 18.8626C13.225 18.9543 12.6167 19.0001 12 19.0001ZM5.55 8.4001C5.06667 8.83343 4.625 9.30843 4.225 9.8251C3.825 10.3418 3.48333 10.9001 3.2 11.5001C4.03333 13.1834 5.2375 14.5209 6.8125 15.5126C8.3875 16.5043 10.1167 17.0001 12 17.0001C12.3333 17.0001 12.6583 16.9793 12.975 16.9376C13.2917 16.8959 13.6167 16.8501 13.95 16.8001L13.05 15.8501C12.8667 15.9001 12.6917 15.9376 12.525 15.9626C12.3583 15.9876 12.1833 16.0001 12 16.0001C10.75 16.0001 9.6875 15.5626 8.8125 14.6876C7.9375 13.8126 7.5 12.7501 7.5 11.5001C7.5 11.3168 7.5125 11.1418 7.5375 10.9751C7.5625 10.8084 7.6 10.6334 7.65 10.4501L5.55 8.4001Z" fill="#C8CCCF"/>
</svg>

                    `
                            container.appendChild(spanPssIcon)
                            let userInputVal = document.querySelector("input[name='UserName']")
                            let inputPassword = createInput('password', 'رمز عبور (حساس به حروف بزرگ و کوچک)', 'code')
                            container.appendChild(inputPassword)
                            let IsShowPass = true
                            // toggleEye
                            spanPssIcon.onclick = function (e) {
                                IsShowPass = !IsShowPass
                                toggleEye(e.currentTarget, IsShowPass)
                            }

                            let forgetPasswordContainer = createInputContainer('forgetPasswordC')
                            let forgetPassword = createSpan('forgetPassword')
                            forgetPassword.innerHTML = 'فراموشی رمز عبور '
                            forgetPasswordContainer.appendChild(forgetPassword)
                            container.appendChild(forgetPasswordContainer)
                            form.insertBefore(container, form.querySelector('.BTN'))
                            forgetPassword.onclick = function (e) {
                                forgetPasswordFn(e)

                            }
                            IsCreatePassword = true
                        }
                    }

                }
            }
        }

    }
}

const CreateSelectBox = (countryCode, responseJson,OBJ) => {
    console.log('countryCode in CreateSelectBox', countryCode);
    console.log('countryOBJ in CreateSelectBox', OBJ);
    // create country Select box
    let selectBox = document.createElement('div')
    let select_wrap = document.createElement('div')
    let default_option = document.createElement('ul')
    let lifirst = document.createElement('li')
    let opfirst = document.createElement('div')
    let pfirst = document.createElement('p')
    selectBox.setAttribute('name', 'select')
    selectBox.classList.add('SelectBoxes')
    select_wrap.classList.add('select_wrap')
    default_option.classList.add('default_option')
    opfirst.classList.add('option')
    selectBox.appendChild(select_wrap)
    select_wrap.appendChild(default_option)
    default_option.appendChild(lifirst)
    lifirst.appendChild(opfirst)
    opfirst.appendChild(pfirst)
    let select_ul = document.createElement('ul')
    select_ul.classList.add('select_ul')
    let img = document.createElement('img')
    responseJson.filter(data=>{
        if(data.code == countryCode){
            console.log('data.code');
            img.setAttribute('src',`/${data.image}`)
        }
    })
    pfirst.appendChild(img)
    select_wrap.appendChild(select_ul)
    responseJson.map((data, i) => {
        let liop = document.createElement('li')
        liop.classList.add('option-li')
        let op = document.createElement('div')
        let p = document.createElement('p')
        op.classList.add('option')

        select_ul.appendChild(liop)
        liop.appendChild(op)
        op.appendChild(p)
        op.setAttribute('data-code', data.code)
        op.setAttribute('data-id', data.countryid)
        op.setAttribute('data-title', data.title)
        let img = document.createElement('img')
        img.setAttribute('src',`/${data.image}`)
        p.appendChild(img)
    })
    document.querySelector('.mobileInput').appendChild(selectBox)
    SelectBox()
}
async function onProcessedGetCountryCode(args) {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        console.log('onProcessedGetCountryCode =>', responseJson);
        let userMobile = document.querySelector('input[name="UserName"]').value
        checkUserCountry(userMobile, responseJson)
    }


}
const checkUserCountry = (userMobile, responseJson) => {
    let countryOBJ = []
    let countryTitles = []
    responseJson.map((data, i) => {
        CountryCodesApi.push(data.code)
        countryTitles.push(data.title)
        let obj = {
            'code': data.code,
            'title': data.title,
            'image': data.image,
        }
        countryOBJ = [...countryOBJ, obj]
    })
    const IranRegex = /^(\+98|0)?9\d{9}$/
    const UnitedArabicRegex = /^(?:0|971|\+971)(50|52|54|55|56|58)\d{7}$/
    let mobile = userMobile
    mobile = normalizePhoneNumber(userMobile)
    console.log(mobile, 'mobile');
    input.value = mobile
    let userCountry = countryOBJ.filter(item => {
        if (mobile.startsWith(item.code)) {
            return item
        }
    })
    console.log(countryOBJ, 'countryOBJ', 'userMobile', userMobile);
    CreateSelectBox(userCountry[0]?.code, responseJson,countryOBJ)
    console.log('شماره کاربر برای کشور');
    console.log(userCountry[0]?.title);
    console.log(userCountry[0]?.code);
    console.log(userCountry[0]?.image);
    let userinput = createInput('hidden', '', 'country')
    let userinputcode = createInput('hidden', '', 'countryCode')
    userinput.setAttribute('value', userCountry[0].title)
    userinputcode.setAttribute('value', userCountry[0].code)
    userinput.style.display = 'none'
    userinputcode.style.display = 'none'
    form.appendChild(userinput)
    form.appendChild(userinputcode)
    input.parentElement.classList.add('mobileInput')
    let mobileIcon = createSpan('mobile-icon')
    mobileIcon.innerHTML = `<svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.375 22C1.89375 22 1.48177 21.8042 1.13906 21.4125C0.796354 21.0208 0.625 20.55 0.625 20V2C0.625 1.45 0.796354 0.979167 1.13906 0.5875C1.48177 0.195833 1.89375 0 2.375 0H11.125C11.6062 0 12.0182 0.195833 12.3609 0.5875C12.7036 0.979167 12.875 1.45 12.875 2V20C12.875 20.55 12.7036 21.0208 12.3609 21.4125C12.0182 21.8042 11.6062 22 11.125 22H2.375ZM2.375 17V20H11.125V17H2.375ZM6.75 19.5C6.99792 19.5 7.20573 19.4042 7.37344 19.2125C7.54115 19.0208 7.625 18.7833 7.625 18.5C7.625 18.2167 7.54115 17.9792 7.37344 17.7875C7.20573 17.5958 6.99792 17.5 6.75 17.5C6.50208 17.5 6.29427 17.5958 6.12656 17.7875C5.95885 17.9792 5.875 18.2167 5.875 18.5C5.875 18.7833 5.95885 19.0208 6.12656 19.2125C6.29427 19.4042 6.50208 19.5 6.75 19.5ZM2.375 15H11.125V5H2.375V15ZM2.375 3H11.125V2H2.375V3Z" fill="#C8CCCF"/>
</svg>`
    input.parentElement.appendChild(mobileIcon)

}

async function onProcessedLoginFn(args) {

    const response = args.response;
    if (response.status == 400 || response.status == 403) {
        // forbidden
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        if (errorid) {
            if (errorid == '10') {
                AlertMessage('Error', ' لطفا ورودی های الزامی را وارد کنید')
            }
            if (errorid == '8') {
                // recovery email 
                AlertMessage('Success', 'این ایمیل برای نام کاربری دیگری ثبت گردیده ، ایمیل بازیابی نام کاربری برای شما ارسال گردید')
                form.insertBefore(container, form.querySelector('.BTN'))
                if (!IsResendEmail) {
                    let containerRe = document.querySelector('.ResendEmail-container')
                    let spanResend = createSpan('ResendEmail')
                    spanResend.classList.add('ResendEmail')
                    spanResend.innerHTML = 'ارسال مجدد ایمیل'
                    containerRe.appendChild(spanResend)
                    document.querySelector('.ResendEmail').onclick = function (e) {
                        $bc.setSource("resend.email", true);
                        onsole.log('ارسال مجدد ایمیل');
                    }
                    IsResendEmail = true
                }
            }
            if (errorid == '3') {
                InvelidToken(responseJson)
            }
            if (errorid == '10') {
                // invalid inputs 
                AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
            }
            if (errorid == '11') {
                //  success 
            }
            if (errorid == '12') {
                // activation email
                AlertMessage('Success', 'ایمیل فعالسازی مجددا برای شما ارسال شد')
                IsResendEmail = false
                if (!IsResendEmail) {
                    let containerRe = document.querySelector('.ResendEmail-container')
                    let spanResend = createSpan('ResendEmail')
                    spanResend.classList.add('ResendEmail')
                    spanResend.innerHTML = 'ارسال مجدد ایمیل'
                    containerRe.appendChild(spanResend)
                    document.querySelector('.ResendEmail').onclick = function (e) {
                        $bc.setSource("resend.email", true);
                        console.log('ارسال مجدد ایمیل');
                    }
                    IsResendEmail = true
                }
            }
            if (errorid == '13') {
                // invalid password 
                AlertMessage('Error', 'رمز عبور صحیح نمیباشد')
            }
            if (errorid == '14') {
                //password and the repetition are not match in register new user"
                AlertMessage('Error', ' رمز عبور با تکرار آن مطابقت ندارد')
            }
            if (errorid == '16') {
                //submit code is incorrect
                AlertMessage('Error', 'کد ارسالی اشتباه وارد شده')
            }
            if (errorid == '55') {
                //this user is already logged in
                AlertMessage('Success', 'شما در حال حاضر لاگین هستید')
                $bc.setSource("db.status", true)
                AlertMessage('Success', 'شما با موفقیت وارد شدید')
                const rkey = responseJson.rkey;
                $bc.setSource("user.rkey", rkey);
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000);
            }
            if (errorid == '1') {
                //token expired
                InvelidToken(responseJson)
            }
            if (errorid == '19') {
                //invalid email format
                AlertMessage('Error', 'ایمیل به درستی وارد نشده')
            }
            if (errorid == '26') {
                //this user exists
                AlertMessage('Error', 'کاربر وجود دارد')
            }
            if (errorid == '56') {
                //please login by this email
                AlertMessage('Error', 'لطفا با ایمیل وارد شوید')
            }
        }
    }
    if (response.status == 200) {
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        console.log('onProcessedLoginFn =>', responseJson);
        if (errorid == '8') {
            // recovery email 
            AlertMessage('Success', 'این ایمیل برای نام کاربری دیگری ثبت گردیده ، ایمیل بازیابی نام کاربری برای شما ارسال گردید')
            form.insertBefore(container, form.querySelector('.BTN'))
            if (!IsResendEmail) {
                let containerRe = document.querySelector('.ResendEmail-container')
                let spanResend = createSpan('ResendEmail')
                spanResend.classList.add('ResendEmail')
                spanResend.innerHTML = 'ارسال مجدد ایمیل'
                containerRe.appendChild(spanResend)
                document.querySelector('.ResendEmail').onclick = function (e) {
                    $bc.setSource("resend.email", true);
                    onsole.log('ارسال مجدد ایمیل');
                }
                IsResendEmail = true
            }
        }
        if (errorid == '3') {
            InvelidToken(responseJson)
        }
        if (errorid == '10') {
            // invalid inputs 
            AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
        }
        if (errorid == '11') {
            // successful
            $bc.setSource("db.status", true)
            AlertMessage('Success', 'شما با موفقیت وارد شدید')
            const rkey = responseJson.rkey;
            $bc.setSource("user.rkey", rkey);
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);

        }
        if (errorid == '12') {
            // activation email
            AlertMessage('Success', 'ایمیل فعالسازی مجددا برای شما ارسال شد')
            IsResendEmail = false
            if (!IsResendEmail) {
                let containerRe = document.querySelector('.ResendEmail-container')
                let spanResend = createSpan('ResendEmail')
                spanResend.classList.add('ResendEmail')
                spanResend.innerHTML = 'ارسال مجدد ایمیل'
                containerRe.appendChild(spanResend)
                document.querySelector('.ResendEmail').onclick = function (e) {
                    $bc.setSource("resend.email", true);
                    console.log('ارسال مجدد ایمیل');

                }
                IsResendEmail = true
            }
        }
        if (errorid == '13') {
            // invalid password 
            AlertMessage('Error', 'رمز عبور صحیح نمیباشد')
        }
        if (errorid == '14') {
            //password and the repetition are not match in register new user"
            AlertMessage('Error', ' رمز عبور با تکرار آن مطابقت ندارد')
        }
        if (errorid == '16') {
            //submit code is incorrect
            AlertMessage('Error', 'کد ارسالی اشتباه وارد شده')
        }
        if (errorid == '55') {
            //this user is already logged in
            AlertMessage('Success', 'شما در حال حاضر لاگین هستید')
            $bc.setSource("db.status", true)
            AlertMessage('Success', 'شما با موفقیت وارد شدید')
            const rkey = responseJson.rkey;
            $bc.setSource("user.rkey", rkey);
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);

        }
        if (errorid == '1') {
            //token expired
            InvelidToken(responseJson)
        }
        if (errorid == '19') {
            //invalid email format
            AlertMessage('Error', 'ایمیل به درستی وارد نشده')
        }
        if (errorid == '26') {
            //this user exists
            AlertMessage('Error', 'کاربر وجود دارد')
        }
        if (errorid == '56') {
            //please login by this email
            AlertMessage('Error', 'لطفا با ایمیل وارد شوید')
        }
    }
}

function selectUserForForgetPass(e) {
    let userid = e.currentTarget.getAttribute("data-user")
    form.querySelector("input[name='user']").value = userid
    console.log('userid', e.currentTarget.getAttribute("data-user"));
    form.querySelectorAll('input[type="radio"]').forEach(i => {
        i.checked = false
    })
    console.log(e.currentTarget);
    let radioInput = e.currentTarget
    radioInput ? radioInput.checked = true : false
};
async function onProcessedForgetPasswordFn(args) {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        const captcha = responseJson.Captcha;
        const captchaId = responseJson.Captcha_id;
        const errorid = responseJson.errorid;
        console.log('onProcessedForgetPasswordFn =>', responseJson);
        //   document.querySelector('.login-bold-title').innerHTML = 'فراموشی رمز عبور'
        if (errorid == '3') {
            InvelidToken(responseJson)
        }
        if (errorid == '10') {
            // invalid inputs 
            AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
        }
        if (errorid == '15') {
            // invalid username 
            AlertMessage('Error', 'کاربر نامعتبر است')
        }
        if (errorid == '35') {
            // username format is mobile
            AlertMessage('Error', 'استفاده از فراموشی رمز عبور فقط برای نام کاربری یا ایمیل امکان پذیر است')
        }
        if (errorid == '36') {
            // ok with multi connection way
            const users = responseJson.data;
            form.setAttribute("name", "form.selectchangepassmethod");
            userid = responseJson.userid;
            $bc.setSource("forgetpassword.userid", userid);
            const mailsSelectBox = createInputContainer('mailsSelectBox')
            const emailListBox = createInputContainer('emailListBox')
            emailListBox.classList.add("input-title");
            emailListBox.innerText = "نحوه تغییر رمز عبور";
            const inputHidden = createInput('hidden', '', 'user')
            form.insertBefore(inputHidden, form.querySelector('.BTN'))
            form.insertBefore(emailListBox, form.querySelector('.BTN'))
            users.forEach((element, index, array) => {
                const emailListLabel = document.createElement("label");
                emailListLabel.classList.add("email-item");
                const emailListRadio = createInput('radio', '', 'ismobile')
                emailListRadio.setAttribute("value", `${users[index].ismobile}`);
                if (index == 0) {
                    // emailListRadio.setAttribute("required", true);
                    emailListRadio.checked = true
                }
                emailListRadio.addEventListener('click', (e) => {
                    selectUserForForgetPass(e)
                })
                const emailListSpan = createSpan();
                emailListSpan.classList.add("email-label");
                if (element.ismobile) {

                    emailListRadio.setAttribute("data-user", `${users[index].mobile}`);
                    emailListSpan.innerText = `${users[index].mobile}`;
                } else {
                    emailListRadio.setAttribute("data-user", `${users[index].email}`);
                    emailListSpan.innerText = `${users[index].email}`;
                }
                emailListLabel.appendChild(emailListRadio);
                emailListLabel.appendChild(emailListSpan);
                mailsSelectBox.appendChild(emailListLabel)
                form.insertBefore(mailsSelectBox, form.querySelector('.BTN'))
            })
        }
        if (errorid == '42') {
            // The password change link sent to email
            AlertMessage('Success', 'لینک تغییر رمز عبور از طریق ایمیل ارسال شد')
            setTimeout(() => {
                PopUp.classList.remove('open')
            }, 1000);
        }
        if (errorid == '43') {
            // error in sending email
            AlertMessage('Error', 'خطا در ارسال ایمیل')
        }
    }
}
function onRenderedCookie(args) {
    console.log('Cookie', args.response);

};
async function onProcessedSelectUserFn(args) {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        const errorid = responseJson.errorid;

        if (errorid == '10') {
            // invalid inputs 
            AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
        }
        if (errorid == '15') {
            // invalid user 
            AlertMessage('Error', 'کاربر نامعتبر است')
        }
        if (errorid == '2') {
            // Success
            AlertMessage('Success', 'کد احراز هویت از طریق پیامک ارسال شد')
            form.setAttribute("name", "form.login");
            hashid = responseJson.hashid;
            $bc.setSource("authentication.hashid", hashid);
            document.querySelector('.captchabox').style.display = 'none'
            document.querySelector('.mobileInput').style.display = 'none'
            let container
            let mobileInputVal
            let inputPassword
            let createResend
            IsCreatePassword = false
            if (!IsCreatePassword) {
                let container = createInputContainer('passwordBox')
                let mobileInputVal = document.querySelector("input[name='UserName']")
                let inputPassword = createInput('text', `کد ارسال شده برای ${mobileInputVal.value} را وارد کنید`, 'code')
                container.appendChild(inputPassword)
                inputPassword.classList.add('nonePadding')
                form.insertBefore(container, form.querySelector('.BTN'))
                createResend = true
                ShowRemaintime(responseJson, createResend)
                IsCreatePassword = true
            }
        }
    }
}

async function onProcessedSelectChangePassMethodFn(args) {
    const response = args.response;
    if (response.status == 200) {
        const responseJson = await response.json();
        const errorid = responseJson.errorid;
        if (errorid) {
            if (errorid == '1') {
                // token expired  
                AlertMessage('Error', 'توکن نامعتبر است')
            }
            if (errorid == '10') {
                // invalid inputs 
                AlertMessage('Error', 'ورودی های ارسال شده نامعتبر است')
            }
            if (errorid == '40') {
                // invalid user
                AlertMessage('Error', 'ایمیل یا موبایل انتخاب شده متعلق به شما نیست')
            }
            if (errorid == '41') {
                // invalid user
                AlertMessage('Error', 'لینک تغییر رمز عبور از طریق پیامک ارسال شد')
                setTimeout(() => {
                    PopUp.classList.remove('open')
                }, 1000);
            }
            if (errorid == '42') {
                // The password change link sent to mobile
                AlertMessage('Error', 'لینک تغییر رمز عبور از طریق ایمیل ارسال شد')
                setTimeout(() => {
                    PopUp.classList.remove('open')
                }, 1000);
                
            }
            if (errorid == '43') {
                // error in sending email
                AlertMessage('Error', 'خطا در ارسال ایمیل')
            }
            if (errorid == '44') {
                // error in sending email
                AlertMessage('Error', 'خطا در ارسال پیامک')
            }
        }


    }
}

