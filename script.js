let msg=document.getElementById('user-input');

function sendMessage(){
    event.preventDefault()
    let curr_msg=msg.value;
    let chatBody=document.getElementById('chat-body');
    reset(msg);
    let tagP = document.createElement("p");
    let text = document.createTextNode(curr_msg);
    tagP.appendChild(text);
    tagP.classList.add("user-chat");
    if(isValidHttpUrl(curr_msg))    tagP.classList.add("link-contains")
    chatBody.appendChild(tagP);
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