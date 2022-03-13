let msg=document.getElementById('user-input');
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
    tagDiv.appendChild(tagP1);
    tagDiv.appendChild(tagP2);
    chatBody.appendChild(tagDiv);
    

    botRediirect(curr_msg);
    scrollToBottom("chat-body");
}
function TextQuerryProcessing(curr_msg){
  let span=document.createElement("span");
  let msg=curr_msg.split(" ");
  msg.map(m=>{
    if(isValidHttpUrl(m)){
      let new_ele=document.createElement('span');
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
function botRediirect(userMsg){
  let querry="Processing...";
  if(userMsg==="hello"){
    querry="namaste";
  }
  sendBotMessage(querry);

  let sent_audio=new Audio('./static/sent.wav');
  sent_audio.play()
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
window.onload=()=>{
    document.getElementById("onload-time").innerHTML=getCurrTime()
}