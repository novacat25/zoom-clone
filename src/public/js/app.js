const socket = io()

const welcomeSection = document.getElementById("welcome")
const roomNameForm = document.getElementById("room-name")

const noticeBackendDone = (msg) => {
    console.log(`The backend says: ${msg}`)
}

const handleRoomSubmit = (e) => {
    e.preventDefault()
    const roomInput = document.getElementById("room-input")
    socket.emit("enter-room", roomInput.value, noticeBackendDone)
    roomInput.value = ""
}

roomNameForm.addEventListener("submit", handleRoomSubmit)