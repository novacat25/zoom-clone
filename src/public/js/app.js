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

const handleRoomSubmit = (e) => {
    e.preventDefault()
    const roomInput = document.getElementById("room-input")
    roomName = roomInput.value
    socket.emit("enter-room", roomInput.value, showRoom)
    roomInput.value = ""
}

roomNameForm.addEventListener("submit", handleRoomSubmit)