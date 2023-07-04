// Conexión con el servidor de Socket.io
const socket = io();

// Elementos del DOM
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');

// Función para agregar un mensaje al DOM
function addMessage(message) {
    const li = document.createElement('li');
    li.innerText = message;
    messagesList.appendChild(li);
}

// Evento al hacer clic en el botón de enviar
sendButton.addEventListener('click', function () {
    const message = messageInput.value;
    addMessage('Yo: ' + message);
    socket.emit('chatMessage', message);
    messageInput.value = '';
});

// Evento cuando se recibe un mensaje del servidor
socket.on('chatMessage', function (message) {
    addMessage(message);
});

document.addEventListener("DOMContentLoaded", function (event) {
    socket.emit('viewMessage')

    socket.on('messages', data => {
        if (data !== null) {
            // Limpiar la lista de productos existente
            messagesList.innerHTML = '';
        }
        data.forEach((item) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                        <li>${item.user} : ${item.message} </li>
                    `;
            messagesList.appendChild(tr);
        });
    })
})
