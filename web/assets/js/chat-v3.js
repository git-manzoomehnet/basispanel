   
let userMessage = document.querySelectorAll('.YOU')
userMessage.forEach(y=>{
    let message = y.querySelector('.message').innerHTML
    y.querySelector('.CopyText').addEventListener('click',()=>{
        console.log(message,'message');
        copyToClipboard(message)
        
    })
})
function copyToClipboard(message) {
    const text = message;
    navigator.clipboard.writeText(text)
        .then(() =>  console.log('copy text'))
        .catch(err => console.error("error in copy:", err));
}





let langIcon = document.querySelector(".langC"),
    langSVG = document.querySelector(".langC svg"),
    langContent = document.querySelector(".langs-content");
    langIcon.addEventListener('click',(e)=>{
        e.stopPropagation()
        langContent.classList.toggle("openLang")
        langSVG.classList.toggle("rotate")
        if(document.querySelector('.UserProfile-box .User ')){
            let dropBox = document.querySelector('.UserProfile-box .UserDropdown')
            let userProfile = document.querySelector('.UserProfile-box .Icon ')
            dropBox.classList.remove('openProf')
            userProfile.classList.remove('openProf')
        }

    })

    if(document.querySelector('.UserProfile-box .User ')){
        let userProfile = document.querySelector('.UserProfile-box .Icon ')
        let dropBox = document.querySelector('.UserProfile-box .UserDropdown')
        let logoutBtnn = document.querySelector(".logoOut ")
        document.querySelector('.UserProfile-box .User').addEventListener('click',(e)=>{
            e.stopPropagation()
            dropBox.classList.toggle('openProf')
            userProfile.classList.toggle('openProf')
            langContent.classList.remove("openLang")
            langSVG.classList.remove("rotate")
        })
        logoutBtnn.addEventListener("click", (e) => {
            e.stopPropagation()
            $bc.setSource("query.flag", true)
            $bc.setSource("db.logout", true)
            langContent.classList.remove("openLang")
            langSVG.classList.remove("rotate")
        })
    }
 
    function scrollToBottom() {
        const container = document.querySelector(".chatSection.sec2"); // یا هر المانی که داری
        const lastChild = container.lastElementChild;
        if (lastChild) {
            lastChild.scrollIntoView({ behavior: "smooth" });
        }
    }
    let drops = document.querySelectorAll('.DropDowns .Drop');

    drops.forEach(drop => {
        let dropdownMenu = drop.querySelector('.dropdown-menu');
        let titleDropdown = drop.querySelector('.title-dropdown');
        let icon = drop.querySelector('.icon');
        let hasItems = dropdownMenu && dropdownMenu.querySelector('ul li');
    
        if (hasItems) {
            titleDropdown.addEventListener('click', (e) => {

                // تغییر وضعیت دراپ‌داون انتخاب‌شده
                drop.classList.toggle('open');
    
                if (drop.classList.contains('open')) {
                    dropdownMenu.style.height = dropdownMenu.scrollHeight + 'px';
                    dropdownMenu.style.opacity = '1';
                } else {
                    dropdownMenu.style.height = '0px';
                    dropdownMenu.style.opacity = '0';
                }
            });
        } else {
            if (icon) icon.style.display = "none"; // مخفی کردن آیکون اگر لیستی وجود نداشته باشد
        }
    });
    
document.addEventListener("click", (e) => {
    langContent.classList.remove("openLang")
    langSVG.classList.remove("rotate")
    if(document.querySelector('.UserProfile-box .User ')){
        let dropBox = document.querySelector('.UserProfile-box .UserDropdown')
        let userProfile = document.querySelector('.UserProfile-box .Icon ')
        dropBox.classList.remove('openProf')
        userProfile.classList.remove('openProf')
    }
    if(drops){
        
    }
});
if(document.querySelector('.Popup-container')){
    let PopUp = document.querySelector('.Popup-container')
    let popBTN = document.querySelector('.login-button')
    let popCloseBTN = document.querySelector('.Popup-container .ClosePop')
    let popc = document.querySelector('.Popup-container')
    PopUp.addEventListener('click',(e)=>{
        if (e.target == popc) {  // اگر کلیک روی خود popc نباشه (یعنی روی فرزند مثل فرم یا دکمه باشد)
            e.stopPropagation();  // پراپگیشن رو متوقف می‌کنیم\
            PopUp.classList.toggle('open')
            // popc.innerHTML=LoginTemplate
        }
    
      
    })
    let LoginTemplate =`   <div class="Login-popup overflow-hidden  group-[&.open]/pop:translate-y-[0] group-[&.open]/pop:opacity-[1]
     delay-100 translate-y-100 duration-500 opacity-0
    rounded-5 bg-White w-max px-[1em] pt-[2em] pb-1 flex flex-col relative justify-center items-center">
             <span class="ClosePop absolute top-[1em] left-[1em] hover:cursor-pointer">
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                         d="M6.9998 8.40005L2.0998 13.3C1.91647 13.4834 1.68314 13.575 1.3998 13.575C1.11647 13.575 0.883138 13.4834 0.699805 13.3C0.516471 13.1167 0.424805 12.8834 0.424805 12.6C0.424805 12.3167 0.516471 12.0834 0.699805 11.9L5.5998 7.00005L0.699805 2.10005C0.516471 1.91672 0.424805 1.68338 0.424805 1.40005C0.424805 1.11672 0.516471 0.883382 0.699805 0.700049C0.883138 0.516715 1.11647 0.425049 1.3998 0.425049C1.68314 0.425049 1.91647 0.516715 2.0998 0.700049L6.9998 5.60005L11.8998 0.700049C12.0831 0.516715 12.3165 0.425049 12.5998 0.425049C12.8831 0.425049 13.1165 0.516715 13.2998 0.700049C13.4831 0.883382 13.5748 1.11672 13.5748 1.40005C13.5748 1.68338 13.4831 1.91672 13.2998 2.10005L8.3998 7.00005L13.2998 11.9C13.4831 12.0834 13.5748 12.3167 13.5748 12.6C13.5748 12.8834 13.4831 13.1167 13.2998 13.3C13.1165 13.4834 12.8831 13.575 12.5998 13.575C12.3165 13.575 12.0831 13.4834 11.8998 13.3L6.9998 8.40005Z"
                         fill="#68737C" />
                 </svg>
             </span>
             <div class="Logo w-auto mb-8 flex justify-center items-center mx-auto">
                 <a href="" class="w-auto flex justify-center items-center">
                     <img src="images/logo-v3.png" alt="">
                 </a>
             </div>
    
    
            
     
    
             <p style="display: none;">{##db.userLogin.runtoken|()##}</p>
     
             <form class="userLogin overflow-hidden min-w-[320px] w-full flex flex-col gap-[1em] pb-[2.8em]"
                 name="db.userLogin" bc-triggers="submit">
                 <div class="Input-Row w-full flex" dir="rtl">
                     <input type="text" name="UserName" placeholder="ایمیل، شماره موبایل یا نام کاربری را وارد کنید"
                         class="w-full border-[1px] border-lightBlue rounded-5 bg-White outline-none placeholder:font-IRANSansWeb400
            placeholder:font-normal placeholder:text-xs h-[50px] placeholder:leading-14.06 font-ABeeZee400
             placeholder:text-placeholder pr-[1em]">
                 </div>
    
                 <div class="BTN w-full flex justify-center items-center">
                     <button type="submit" class="submit-btn firstBtn min-w-[320px] w-90p absolute bottom-[3.5em] left-0 right-0 mx-auto
               [&.goLeft]:translate-x-[115%] hover:bg-hoverBtnDprimary duration-200
            py-[.8em] bg-primary flex justify-center items-center rounded-5 
            text-White  font-IRANSansWeb400 font-normal text-sm ">
                         مرحله بعد
                     </button>
                 </div>
             </form>
             <span class="copyRight my-3 w-full justify-end items-end">
                 <img src="images/trust-logo-v3.png" alt="">
             </span>
         </div>`
    function refreshAndFetch() {
        let url = "http://nljpdiw.undertest.ir/dmntoken-v3.inc?nocache=" + new Date().getTime(); // جلوگیری از کش شدن
    
        fetch(url) 
            .then(response => response.text())
            .then(html => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html");
                let tokenValue = doc.querySelector(".dmntoken").textContent;
             $bc.setSource('db.token',tokenValue)
             
            })
            .catch(error => console.error("خطا در دریافت مقدار:", error));
    }
    popBTN.addEventListener('click', (e) => {
        //    run token api
         $bc.setSource('get.dmntoken',true)
        PopUp.classList.toggle('open')
        refreshAndFetch()
        $bc.setSource('run.token',true)
    })
    popCloseBTN.addEventListener('click', (e) => {
        PopUp.classList.toggle('open')
           $bc.setSource('run.api',true)
           $bc.setSource('get.dmntoken',false)
        //    popc.innerHTML=LoginTemplate
    })
}


const lenis = new Lenis({ smoothWheel: !0, wheelMultiplier: 2 });
function raf(e) {
    lenis.raf(e),
     requestAnimationFrame(raf);
}
requestAnimationFrame(raf)
lenis.on('scroll',(e)=>{

if(e.scroll==0){
    document.querySelector('header').classList.remove('bgWhite')
}
else{
    document.querySelector('header').classList.add('bgWhite')
}
})

async function loadingchat(){
    const chatvalue = document.querySelector("#chat")
    const newDiv = document.createElement("div")
    newDiv.setAttribute("class" , "YOU w-full flex gap-6 justify-start items-start")
    newDiv.innerHTML = `
   
                <span class="userIcon w-[30px] h-[30px] flex justify-center items-center rounded-full">
                    <img src="/images/user1-v3.png" alt="basis" title="basis" class="object-contain">
                </span> 
                <div class="userDetail w-95p mr-auto grid grid-cols-[5fr,1fr] justify-start items-start " id="typewriter">
                    <div class="  w-full flex justify-start font-IRANSansWeb400 font-normal text-[10px]
                    leading-[30px] text-sm  current_section" id="current_section">
                 <div class="typing-loader">
    is typing <span></span><span></span><span></span>
</div>
                    </div>
                    <div class="contact-c w-full flex justify-end items-center gap-2">
                        <span class="CopyText hover:cursor-pointer" onclick="opcytext(this,event)">
                            <img src="/images/copy-v3.svg" alt="basis" title="basis">
                        </span>
                        <span class="disLike hover:cursor-pointer">
                            <img src="/images/dislike-v3.svg" alt="basis" title="basis">
                        </span>
                        <span class="like hover:cursor-pointer">
                            <img src="/images/like-v3.svg" alt="basis" title="basis">
                        </span>
                    </div>
                </div>
            
    `
    document.querySelector("#chatbox").appendChild(newDiv)
}
async function setChatFirst(args){
    const response = args.response;
    const responseJson = await response.json();
    const typingSpeed = 200;
    const text = responseJson.message
    document.querySelector('.typing-loader').innerHTML=''
    console.log(text);
    
    for(var i = 0 ; i < text.length ; i++){
        let textF = text;
        textF = text.replace(/(?:Typing|\s*Typing\s*)/gi, "");
        typeText(textF , i )

    }

document.querySelector('.typing-loader').style.display='none'
}
function typeText(text , i){
    setTimeout(() => {
        document.querySelector("#current_section").textContent += text.charAt(i);   
        scrollToBottom() 
    }, i* 50);
    
}
const detectLanguage = (text) =>{
    const persianRegex = /[\u0600-\u06FF]/; // محدوده یونیکد حروف فارسی
    const englishRegex = /[a-zA-Z]/; // حروف انگلیسی
    let chatbox = document.querySelector('#chatbox')
    if (persianRegex.test(text)) {

        chatbox.style.direction ='rtl'

    } else if (englishRegex.test(text)) {
         chatbox.style.direction ='ltr'
 

    } else {

        return "نامشخص";
    }
}
let firstinput =document?.querySelector('textarea.chatNodata')
let chaticons = document.querySelectorAll('.SendMessage')
document.querySelector('.loadChatSection').style.overflow='hidden'

const opacityIcon =(input)=>{
   let typer = input;
    function handleKeyPress(e) {
        chaticons.forEach(c=>{
            c.style.opacity = '.5'
        })
    }
    function handleKeyUp(e) {
        chaticons.forEach(c=>{
            c.style.opacity = '1'
        })
    }
    typer.addEventListener("keypress", handleKeyPress)
    typer.addEventListener("keyup", handleKeyUp)
}
if(firstinput){
    opacityIcon(firstinput)
}

const sendMessageOne = ()=>{
    document.querySelector('.loadChatSection ').style.overflowY='auto'
    let input = document.querySelector('textarea.chatNodata')
    let chatsecNodata = document.querySelector('div.sec1')
    let chatsec = document.querySelector('div.sec2')
    detectLanguage(input.value)
    if(input.value != ''){
      chatsecNodata.classList.add('hideChat')
      chatsec.classList.add('showChat')
      sendMessage(input.value)
    }
    else{
        AlertMessage('Error', 'لطفا فیلد را پر کنید')
    }
    scrollToBottom()

}
const chatvalue = document?.querySelector("#chat2")
opacityIcon(chatvalue)
function sendMessage(value){
      document.querySelector('.loadChatSection ').style.overflowY='auto'
     
//       if( document.querySelector('#chat')){
//  document.querySelector('#chat').style.overflowY='auto'
//       }
//       if(document.querySelector('#chat2')){
//            document.querySelector('#chat2').style.overflowY='auto'
//       }
    if(!value){
        let chatvalue2 = document.querySelector("#chat2")
        detectLanguage(chatvalue2.value)
        const newDiv = document.createElement("div")
        newDiv.setAttribute("class" , "ME w-full flex gap-6 justify-start items-start")
        newDiv.innerHTML = `
        <span class="userIcon w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primary">
        <img src="http://cdn.basiscore.net/nljpdiw.undertest.ir/images/usericon-v3.svg" alt="basis" title="basis" class="w-[16px] h-[16px] object-contain">
        </span> 
        <span class="userDetail w-auto flex flex-col justify-start items-start">
        <div class="userName w-auto flex justify-start font-IRANSansWeb500 font-medium text-xs
        leading-[22px] text-text">
        شما
        </div>
        <div class=" w-auto flex justify-start font-IRANSansWeb400 font-normal text-[10px]
        leading-[15.65px] text-sm">
        ${chatvalue2.value}
    
        </div>
        </span>
        `
        document.querySelector("#chatbox").appendChild(newDiv)
        $bc.setSource("db.send" ,{
            "run" : true,
            "val" : chatvalue2.value
        })
        chatvalue2.value=""
        document.querySelector("#current_section")?.removeAttribute("id")
    }
    else{
        detectLanguage(value)
        const newDiv = document.createElement("div")
        newDiv.setAttribute("class" , "ME w-full flex gap-6 justify-start items-start")
        newDiv.innerHTML = `
        <span class="userIcon w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primary">
        <img src="http://cdn.basiscore.net/nljpdiw.undertest.ir/images/usericon-v3.svg" alt="basis" title="basis" class="w-[16px] h-[16px] object-contain">
        </span> 
        <span class="userDetail w-auto flex flex-col justify-start items-start">
        <div class="userName w-auto flex justify-start font-IRANSansWeb500 font-medium text-xs
        leading-[22px] text-text">
        شما
        </div>
        <div class=" w-auto flex justify-start font-IRANSansWeb400 font-normal text-[10px]
        leading-[15.65px] text-sm">
        ${value}
    
        </div>
        </span>
        `
        document.querySelector("#chatbox").appendChild(newDiv)
        $bc.setSource("db.send" ,{
            "run" : true,
            "val" :value
        })
        value=""
        document.querySelector("#current_section")?.removeAttribute("id")
    }
    scrollToBottom()
   
}

let chatinput =document?.querySelector('#chat')
chatinput?.addEventListener("keydown", function (e) {
        let input = document.querySelector('textarea.chatNodata')
        let chatsecNodata = document.querySelector('div.sec1')
        let chatsec = document.querySelector('div.sec2')
        if (e.keyCode == 13) {  //checks whether the pressed key is "Enter"
            e.preventDefault()
                if(input.value != ''){
                        document.querySelector('.loadChatSection ').style.overflowY='auto'
                    chatsecNodata.classList.add('hideChat')
                    chatsec.classList.add('showChat')
                    sendMessage(input.value)
                     chatinput.value = ''
                  }
  }
    });
    let chatinput2 =document.querySelector('#chat2')
    chatinput2.addEventListener("keydown", function (e) {
        
            if (e.keyCode == 13) {  //checks whether the pressed key is "Enter"
                e.preventDefault()
                    if(chatinput2.value != ''){
                
                        sendMessage(chatinput2.value)
                        chatinput2.value = ''
                      }
      }
        });
function opcytext(el, event){
    const parent = el.closest(".userDetail")
    const copyElement = parent.querySelector(".current_section")
    CopyToClipboard(copyElement)
}
function CopyToClipboard(containerid) {
if (document.selection) {
var range = document.body.createTextRange();
range.moveToElementText(containerid);
range.select().createTextRange();
document.execCommand("copy");
} else if (window.getSelection) {
var range = document.createRange();
range.selectNode(containerid);
window.getSelection().addRange(range);
document.execCommand("copy");
//  alert("Text has been copied, now paste in the text-area")
AlertMessage('Success', 'متن در clipboard کپی شد.')
}
}
function selectItem(el , event){
    if(!firstinput?.classList.contains('hideChat')){
        let chatsecNodata = document?.querySelector('div.sec1')
        let chatsec = document.querySelector('div.sec2')
          chatsecNodata?.classList.add('hideChat')
          chatsec.classList.add('showChat')
          document.querySelector("#chat2").value = el.getAttribute("data-val")
          sendMessage(el.getAttribute("data-val"))
    }
    else{
        document.querySelector("#chat2").value = el.getAttribute("data-val")
        // sendMessage(el.getAttribut("data-val"))
    }

}
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".DropDowns");
    sidebar.style.overflowY = "auto";
});