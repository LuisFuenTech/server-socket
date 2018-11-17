const socket = io(); //Envía eventos al servidor

//DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

button.addEventListener('click', () => {
    let userMsg = {
        username: username.value,
        message: message.value
    };
    console.log(userMsg);
    message.innerHTML = '';
    socket.emit('chat:msg', userMsg);    
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('server:msg', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('server:type', (data) => {
    actions.innerHTML = `<p><en>${data} is typing...</en></p>`;
});