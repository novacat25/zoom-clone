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

    const chatForm = document.getElementById("chat-form")
    chatForm.addEventListener("submit", handleMessageSubmit)
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

const handleMessageSubmit = (e) => {
    e.preventDefault()
    const messageInput = document.getElementById("message-input")
    const messageInputValue = messageInput.value
    socket.emit("send-message", messageInputValue, roomName, () => {
        addMessage(`You: ${messageInputValue}`)
    })
    messageInput.value = ""
}

socket.on("welcome-everyone", () => addMessage("Someone has joined!"))
socket.on("left-room", () => addMessage("Someone has left!")) 
socket.on("show-message", addMessage)

roomNameForm.addEventListener("submit", handleRoomSubmit)