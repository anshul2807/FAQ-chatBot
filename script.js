let msg=document.getElementById('user-input');
let TOKEN="";
const months=["JAN","FEB","MARCH","APRIL","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"];
function sendMessage(){
    event.preventDefault()
    let curr_msg=msg.value;
    if(curr_msg=='')return;
    let curr_time=getCurrTime()
    let chatBody=document.getElementById('chat-body');
    reset(msg);
    let tagDiv = document.createElement("div")
    tagDiv.classList.add("sendMessage-container")
    let tagP1 = document.createElement("p");
    let tagP2 = document.createElement("p");
    
    let text = TextQuerryProcessing(curr_msg);
    tagP1.appendChild(text);
    tagP1.classList.add("user-chat");
    tagP2.appendChild(document.createTextNode(curr_time))
    tagP2.classList.add("time-Userchat");
    if(isValidHttpUrl(curr_msg))
      tagDiv=checkLink(tagDiv,curr_msg);
    tagDiv.appendChild(tagP1);
    tagDiv.appendChild(tagP2);
    chatBody.appendChild(tagDiv);
    
    messageProcess(curr_msg);
    scrollToBottom("chat-body");
}
function checkLink(tagDiv,msg){
  let link=msg.split("/")[3];
  let thm=`https://img.youtube.com/vi/${link}/0.jpg`;
  if(msg.split("/")[2]==="youtu.be"){
    let img=document.createElement('img');
    img.src=thm;
    img.alt="link";
    img.classList.add("user-img");
    tagDiv.appendChild(img);
  }else{
    console.log("Not a Valid URL");
  }
  return tagDiv;
}
function TextQuerryProcessing(curr_msg){
  let span=document.createElement("span");
  let msg=curr_msg.split(" ");
  msg.map(m=>{
    if(isValidHttpUrl(m)){
      let new_ele=document.createElement('a');
      new_ele.href=m;
      new_ele.appendChild(document.createTextNode(m))
      new_ele.classList.add("link-contains")
      span.appendChild(new_ele)
      span.appendChild(document.createTextNode(" "))
      
    }else{
      span.appendChild(document.createTextNode(m))
      span.appendChild(document.createTextNode(" "))
    }
  });

  return span;
}
function scrollToBottom(id){
  const element = $(`#${id}`);
   element.animate({
      scrollTop: element.prop("scrollHeight")
   }, 500);
}
function getCurrTime(){
  const dt=new Date();
  let curr_date=dt.getDate()+" "+months[dt.getMonth()]+" "+dt.getHours()+":"+dt.getMinutes();

  return curr_date;
}
function botRediirect(query){
  sendBotMessage(query);
  let sent_audio=new Audio('./static/sent.wav');
  sent_audio.play()
}
// API call
async function getDataFromServerPOST(url,usermsg){
    fetch(url,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(usermsg)
    })
    .then(res=>res.json())
    .then(res=>{
      botRediirect(res.message)
      if(res.data.token)  TOKEN=res.data.token;
    })
    .catch(err=>botRediirect(err.message));  
}
async function getDataFromServerGET(url){
  fetch(url,{
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN,
    }
  })
  .then(res=>res.json())
  .then(res=>{
    
    if(res.data.length > 0) {
      res.data.map(list=>{
        sendBotMessageLists(list);
      })
    }
    botRediirect(res.message)
  })
  .catch(err=>botRediirect(err.message));
}
function sendBotMessage(querry){
    let curr_time=getCurrTime();
    let tagDiv = document.createElement("div")
    tagDiv.classList.add("sendMessage-container")
    let chatBody=document.getElementById('chat-body');
    let tagP1 = document.createElement("p");
    let tagP2 = document.createElement("p");
    let text = document.createTextNode(querry);
    tagP1.appendChild(text);
    tagP1.classList.add("bot-chat");
    tagP2.appendChild(document.createTextNode(curr_time))
    tagP2.classList.add("time-Botchat");
    tagDiv.appendChild(tagP1)
    tagDiv.appendChild(tagP2);
    chatBody.appendChild(tagDiv);
}
function sendBotMessageLists(querry){
  let curr_time=getCurrTime();
  let tagDiv = document.createElement("div")
  tagDiv.classList.add("sendMessage-container")
  let chatBody=document.getElementById('chat-body');
  let ul1 = document.createElement("ul");
  let tagP2 = document.createElement("p");
  let text1 = document.createTextNode(querry.name);
  let text2 = document.createTextNode(querry.email);
  let text3 = document.createTextNode(querry.qualification);
  let text4 = document.createTextNode(querry.department);
  let text5 = document.createTextNode(querry.workexperience);

  let li1=document.createElement("li");
  let li2=document.createElement("li");
  let li3=document.createElement("li");
  let li4=document.createElement("li");
  let li5=document.createElement("li");
  
  li1.appendChild(text1);
  li2.appendChild(text2);
  li3.appendChild(text3);
  li4.appendChild(text4);
  li5.appendChild(text5);

  ul1.appendChild(li1);
  ul1.appendChild(li2);
  ul1.appendChild(li3);
  ul1.appendChild(li4);
  ul1.appendChild(li5);
  
  
  ul1.classList.add("bot-chat");
  tagP2.appendChild(document.createTextNode(curr_time))
  tagP2.classList.add("time-Botchat");
  tagDiv.appendChild(ul1)
  tagDiv.appendChild(tagP2);
  chatBody.appendChild(tagDiv);
}
function reset(param){
    param.value="";
}
function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
function addOptions(querry,{btn,btn_name}){
 
}
// stickers
let toggleSticker=false;
function handleStickers(){
  toggleSticker=!toggleSticker;
  handleStickerSection(toggleSticker);
}
function handleStickerSection(flag){
  let secSticker=document.getElementsByClassName('chat__sticker')[0];
  if(flag)
    secSticker.classList.remove("none");
  else
    secSticker.classList.add("none");
}
// message Process

function messageProcess(query){
  let data=query.split("/");
  let localURL="http://localhost:4000"
  if(data.length<=1) {
    botRediirect("Not a valid Request");
    return;
  }
  switch (data[1]) {
    case "register":
      getDataFromServerPOST(`${localURL}/user/register/`,{
        username:data[2],
        email:data[3],
        password:data[4]
      });
      break;
    case "login":
      getDataFromServerPOST(`${localURL}/user/login/`,{
        username:data[2],
        password:data[3]
      });
      break;
    case "faculty":
      if(data[2]=="lists"){
        getDataFromServerGET(`${localURL}/faculty/lists/`);
      }
      break;
  
    default:
      botRediirect("Not a valid Request");
      break;
  }
}
window.onload=()=>{
    document.getElementById("onload-time").innerHTML=getCurrTime()
}