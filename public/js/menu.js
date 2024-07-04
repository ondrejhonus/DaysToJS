const socket = io();

function formSubmitted(){
    let date = document.getElementById("dateInput").value;
    let room = date;
    socket.emit("join room", room);
    window.location.assign(`./countdown?room=${room}`);
}