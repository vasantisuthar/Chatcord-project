const socket = io();

var name;
const messages = document.getElementById('message'),
send = document.getElementById('sendBtn'),
message_section = document.querySelector('.message-section');
const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
let msg;

do{
    name = prompt("Please enter your name");
}while(!name);

messages.focus();

socket.emit('welcome',name);
socket.on('welcome',name => {
    chatBot(name);
});

send.addEventListener('click',(e) => {
    if(messages.value != ''){
        sendMessage(messages.value);
    }
})

function sendMessage(messages){
    msg = {
        time: time,
        user : name.charAt(0).toUpperCase() + name.slice(1),
        message : messages.trim()
    }
    appendMessage(msg, 'outgoing');
    socket.emit('chatmessage', msg);
    message_section.scrollTop = message_section.scrollHeight;
}

function appendMessage(msg, type){
    const div = document.createElement('div');
    div.classList.add(type,'message');
    div.innerHTML=`<h4>${msg.user} <span> <small class="text-muted">${msg.time}</small></span></h4>
    <p>${msg.message} </p>`
    message_section.appendChild(div);
    messages.value='';
    messages.focus();
}

function chatBot(name){
    const div = document.createElement('div');
    div.classList.add('chatBot');
    div.innerHTML = `<p>${name.charAt(0).toUpperCase() + name.slice(1)} has joined Chatcord</p>`;
    message_section.appendChild(div);
}

socket.on('message',(msg) => {
    appendMessage(msg, 'incoming')
    message_section.scrollTop = message_section.scrollHeight;
})