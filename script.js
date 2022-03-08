let msg=document.getElementById('user-input');

function sendMessage(){
    let curr_msg=msg.value;
    let chatBody=document.getElementById('chat-body');
    reset(msg);
    let tagP = document.createElement("p");
    let text = document.createTextNode(curr_msg);
    tagP.appendChild(text);
    tagP.classList.add("user-chat");
    chatBody.appendChild(tagP);
}
function reset(param){
    param.value="";
}