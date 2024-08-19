const socket = io();

let roomName;

function formSubmitted() {
  let date = document.getElementById("dateInput").value;
  roomName = document.getElementById("nameInput").value;
  let room = {
    date: date,
    name: roomName
  };
  socket.emit("join room", room);
  window.location.assign(`./countdown?room=${room.date}&name=${room.name}`);
}

function getRooms() {
  socket.emit('get_rooms');
}
getRooms();

socket.on('rooms_list', (rooms) => {
  let roomsList = document.getElementById('roomsList');
  let roomListText = document.getElementById("roomListText");
  roomsList.innerHTML = '';
  rooms.forEach(room => {
    roomListText.classList.remove("is-hidden");
    let date = new Date(room.date);
    let year = date.getFullYear();
    let mon = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sumDay = day + ". " + mon + ". " + year + " | " + hour.toLocaleString('en-US', {minimumIntegerDigits: 2}) 
    + ":" + min.toLocaleString('en-US', {minimumIntegerDigits: 2});
    let listItem = document.createElement('li');
    listItem.innerHTML = `<a href="./countdown?room=${room.date}&name=${room.name}">${room.name} | ${sumDay}</a>`;
    roomsList.appendChild(listItem);
  });
});
