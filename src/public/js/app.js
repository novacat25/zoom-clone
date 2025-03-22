const socket = io()

const welcomeSection = document.getElementById("welcome")
const roomNameForm = document.getElementById("room-name")
const roomSection = document.getElementById("room")

let roomName = ""

const showRoom = () => {
    welcomeSection.hidden = true
    roomSection.hidden = false
    const roomTitle = document.getElementById("room-title")
    roomTitle.innerText = roomName
}

const addMessage = (msg) => {
    const dialogLost = document.getElementById("dialog-list")
    const chatItem = document.createElement("li")
    chatItem.innerText = msg
    dialogLost.appendChild(chatItem)
}

const handleRoomSubmit = (e) => {
    e.preventDefault()
    const roomInput = document.getElementById("room-input")
    roomName = roomInput.value
    socket.emit("enter-room", roomInput.value, showRoom)
    roomInput.value = ""
}

socket.on("welcome-everyone", () => addMessage("Someone has joined!"))
socket.on("left-room", () => addMessage("Someone has left!")) 

roomNameForm.addEventListener("submit", handleRoomSubmit)