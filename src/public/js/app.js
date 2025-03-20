const socket = io()

const welcomeSection = document.getElementById("welcome")
const roomNameForm = document.getElementById("room-name")

const handleRoomSubmit = (e) => {
    e.preventDefault()
    const roomInput = document.getElementById("room-input")
    socket.emit("enter-room", { payload: roomInput.value }, ()=>{
        console.log("Server is Done!")
    })
    roomInput.value = ""
}

roomNameForm.addEventListener("submit", handleRoomSubmit)