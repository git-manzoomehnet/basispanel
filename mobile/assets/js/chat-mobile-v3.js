let userMessage = document.querySelectorAll('.YOU')
userMessage.forEach(y=>{
    let message = y.querySelector('.message').innerHTML
    y.querySelector('.CopyText').addEventListener('click',()=>{
        console.log(message,'message');
        copyToClipboard(message)
        
    })
})
let dropBtn = document.querySelector('.DropBTN')
let dropBtnClose = document.querySelector('.DropPop .CloseDrop')
let dropPop =document.querySelector('.DropPop')
dropBtn.addEventListener('click',()=>{
    dropPop.classList.add('OpenDrop')
})
dropBtnClose.addEventListener('click',()=>{
    dropPop.classList.remove('OpenDrop')
})
function copyToClipboard(message) {
    console.log(message,'message');
    
    const text = message;
    navigator.clipboard.writeText(text)
        .then(() =>  console.log('copy text'))
        .catch(err => console.error("error in copy:", err));
}

    function scrollToBottom() {

        
    const container = document.querySelector(".section-1 .container-chat .chats"); 
    const lastChild = container.lastElementChild;
    const extraPadding = 100;

    if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth" });
        container.style.paddingBottom = extraPadding + "px";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  });

  document.querySelector('header').classList.add('bgWhite')
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
                        <span class="CopyText hover:cursor-pointer" onclick="opcytext(this,event)" >
                         
<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 14.0003C5.04167 14.0003 4.64931 13.8371 4.32292 13.5107C3.99653 13.1844 3.83333 12.792 3.83333 12.3337V2.33366C3.83333 1.87533 3.99653 1.48296 4.32292 1.15658C4.64931 0.830187 5.04167 0.666992 5.5 0.666992H13C13.4583 0.666992 13.8507 0.830187 14.1771 1.15658C14.5035 1.48296 14.6667 1.87533 14.6667 2.33366V12.3337C14.6667 12.792 14.5035 13.1844 14.1771 13.5107C13.8507 13.8371 13.4583 14.0003 13 14.0003H5.5ZM5.5 12.3337H13V2.33366H5.5V12.3337ZM2.16667 17.3337C1.70833 17.3337 1.31597 17.1705 0.989583 16.8441C0.663194 16.5177 0.5 16.1253 0.5 15.667V4.83366C0.5 4.59755 0.579861 4.39963 0.739583 4.23991C0.899306 4.08019 1.09722 4.00033 1.33333 4.00033C1.56944 4.00033 1.76736 4.08019 1.92708 4.23991C2.08681 4.39963 2.16667 4.59755 2.16667 4.83366V15.667H10.5C10.7361 15.667 10.934 15.7469 11.0938 15.9066C11.2535 16.0663 11.3333 16.2642 11.3333 16.5003C11.3333 16.7364 11.2535 16.9344 11.0938 17.0941C10.934 17.2538 10.7361 17.3337 10.5 17.3337H2.16667Z" fill="#C8CCCF"/>
</svg>

                        </span>
                        <span class="disLike hover:cursor-pointer" onclick="dislikeMessage(this,event)">
                          
<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path id="dislikeicon" d="M2.50016 11.3333C2.05572 11.3333 1.66683 11.1667 1.3335 10.8333C1.00016 10.5 0.833496 10.1111 0.833496 9.66667V8C0.833496 7.90278 0.847385 7.79861 0.875163 7.6875C0.902941 7.57639 0.930718 7.47222 0.958496 7.375L3.4585 1.5C3.5835 1.22222 3.79183 0.986111 4.0835 0.791667C4.37516 0.597222 4.68072 0.5 5.00016 0.5H14.1668V11.3333L9.16683 16.2917C8.9585 16.5 8.71197 16.6215 8.42725 16.6562C8.14252 16.691 7.86822 16.6389 7.60433 16.5C7.34044 16.3611 7.146 16.1667 7.021 15.9167C6.896 15.6667 6.86822 15.4097 6.93766 15.1458L7.87516 11.3333H2.50016ZM12.5002 10.625V2.16667H5.00016L2.50016 8V9.66667H10.0002L8.87516 14.25L12.5002 10.625ZM16.6668 0.5C17.1252 0.5 17.5175 0.663194 17.8439 0.989583C18.1703 1.31597 18.3335 1.70833 18.3335 2.16667V9.66667C18.3335 10.125 18.1703 10.5174 17.8439 10.8437C17.5175 11.1701 17.1252 11.3333 16.6668 11.3333H14.1668V9.66667H16.6668V2.16667H14.1668V0.5H16.6668Z" fill="#C8CCCF"/>
</svg>

                        </span>
                        <span class="like hover:cursor-pointer" onclick="likeMessage(this,event)">
                           
<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="likeicon" d="M16.4998 5.66634C16.9443 5.66634 17.3332 5.83301 17.6665 6.16634C17.9998 6.49967 18.1665 6.88856 18.1665 7.33301V8.99967C18.1665 9.0969 18.1526 9.20106 18.1248 9.31217C18.0971 9.42329 18.0693 9.52745 18.0415 9.62467L15.5415 15.4997C15.4165 15.7775 15.2082 16.0136 14.9165 16.208C14.6248 16.4025 14.3193 16.4997 13.9998 16.4997H4.83317V5.66634L9.83317 0.708008C10.0415 0.499674 10.288 0.378147 10.5728 0.343424C10.8575 0.308702 11.1318 0.360786 11.3957 0.499674C11.6596 0.638563 11.854 0.833008 11.979 1.08301C12.104 1.33301 12.1318 1.58995 12.0623 1.85384L11.1248 5.66634H16.4998ZM6.49984 6.37467V14.833H13.9998L16.4998 8.99967V7.33301H8.99984L10.1248 2.74967L6.49984 6.37467ZM2.33317 16.4997C1.87484 16.4997 1.48248 16.3365 1.15609 16.0101C0.829698 15.6837 0.666504 15.2913 0.666504 14.833V7.33301C0.666504 6.87467 0.829698 6.48231 1.15609 6.15592C1.48248 5.82954 1.87484 5.66634 2.33317 5.66634H4.83317V7.33301H2.33317V14.833H4.83317V16.4997H2.33317Z" fill="#C8CCCF"/>
</svg>

                        </span>
                    </div>
                </div>
            
    `
    document.querySelector("#chatbox").appendChild(newDiv)
    scrollToBottom()
}
async function setChatFirst(args){
    const response = args.response;
    const responseJson = await response.json();
    const typingSpeed = 200;
    const text = responseJson.message
    document.querySelector("#current_section").setAttribute("data-id",responseJson.id)
    if(document.querySelector('.typing-loader')){
   document.querySelector('.typing-loader').innerHTML=''

    }
 
   
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
    let input = document.querySelector('textarea.chatNodata')
    let chatsecNodata = document.querySelector('div.sec1')
    let chatsec = document.querySelector('div.sec2')
    detectLanguage(input.value)
    scrollToBottom()
    if(input.value != ''){
      chatsecNodata.classList.add('hideChat')
      chatsec.classList.add('showChat')
      sendMessage(input.value)
    }
    else{
        AlertMessage('Error', 'لطفا فیلد را پر کنید')
    }
  

}
const chatvalue = document?.querySelector("#chat2")
opacityIcon(chatvalue)
function sendMessage(value){
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
    // copyToClipboard(copyElement.innerText)

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
    scrollToBottom()
    dropPop.classList.remove('OpenDrop')
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
function likeMessage(el, event){
    const messageid = el.closest("#typewriter").querySelector(".current_section").getAttribute("data-id")
    document.querySelector("#likeicon").style.fill="#00A693"
    let json= {
	"messageid":messageid,
	"reactionid ":1
}

    $bc.setSource("db.like",{
        "val" : JSON.stringify(json) ,
        "run" : true
    })
}
async function likeMethod(args){
    const response = args.response;
    const responseJson = await response.json();
    if(responseJson.errorid == 5){
        AlertMessage('Success', 'متن مورد نظر پسندیده شد.')
    }
    else{
        AlertMessage('error', 'خطا در انجام عملیات')
    }
}
async function dislikeMethod(args){
    const response = args.response;
    const responseJson = await response.json();
    if(responseJson.errorid == 5){
        AlertMessage('Success', 'متن مورد نظر پسندیده نشد.')
    }
    else{
        AlertMessage('error', 'خطا در انجام عملیات')
    }
}

function dislikeMessage(el, event){
    const messageid = el.closest("#typewriter").querySelector(".current_section").getAttribute("data-id")
    document.querySelector("#dislikeicon").style.fill="#F9461C"
    let json= {
	"messageid":messageid,
	"reactionid ":0
}

    $bc.setSource("db.dislike",{
        "val" : JSON.stringify(json) ,
        "run" : true
    })
}
async function makeList(args){
    const response = args.response;
    const responseJson = await response.json();
    responseJson.forEach(e => {
        const newDrop = document.createElement("div") 
        let question = ""
        e.questions	.forEach(q => {
            
            question += `  
                    <li class="menu-item py-[.5em] leading-[22px] pr-5
        font-IRANSansWeb500 font-medium text-xs text-text" data-val=" ${q}" onclick="selectItem(this,event)">
      ${q}
        </li>`
        })
        
        newDrop.innerHTML = `
                        <div class="Drop overflow-x-hidden hover:cursor-pointer duration-1000 
                group/drop w-full flex flex-col">
                    <div class="title-dropdown border-b-[1px] border-[#E8ECEF] duration-300 px-[.5em] rounded-5 
                    border-l-White border-r-White border-b-[#004B85] border-r-[4px] border-l-[4px]
                    group-hover/drop:border-r-[#004B85]   group-hover/drop:border-l-[#004B85]    
                group-[&.open]/drop:border-r-[#004B85] group-[&.open]/drop:border-l-[#004B85]  w-full flex justify-between">
                        <span class="title py-[1em] font-IRANSansWeb500 font-medium text-sm text-text">
                             ${e.title}
                        </span>
                        <span class="icon w-auto flex group-[&.open]/drop:rotate-[-90deg] duration-300">
                            <img src="/images/arrowicon-v3.svg" alt="">
                        </span>
                    </div>
                    <div class="dropdown-menu w-full duration-[.4s] h-0 opacity-0 overflow-hidden 
                    flex group-[&.open]/drop:h-[auto] group-[&.open]/drop:opacity-[1] flex-col group-[&.open]/drop:mt-4
                    group-[&.open]/drop:py-[.5em] bg-[#E5E5E540]">
                        <ul class="menu w-full flex flex-col">
                      ${question}

                        </ul>
                    </div>
                </div>
`
                    document.querySelector(".question_loader")?.remove()
                    document.querySelector(".DropPop .DropDowns").appendChild(newDrop)
    })
    let drops = document.querySelectorAll('.DropDowns .Drop');

    drops.forEach(drop => {
        let dropdownMenu = drop.querySelector('.dropdown-menu');
        let titleDropdown = drop.querySelector('.title-dropdown');
        let icon = drop.querySelector('.icon');
        let hasItems = dropdownMenu && dropdownMenu.querySelector('ul li');
    
        if (hasItems) {
            titleDropdown.addEventListener('click', (e) => {
                drops.forEach(otherDrop => {
                    if (otherDrop !== drop) {
                        otherDrop.classList.remove('open');
                        let otherMenu = otherDrop.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.height = '0px';
                            otherMenu.style.opacity = '0';
                        }
                    }
                });
                drop.classList.toggle('open');
    
                if (drop.classList.contains('open')) {
                    dropdownMenu.style.height = dropdownMenu.scrollHeight +20+ 'px';
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
  
}