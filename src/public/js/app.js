const SOCKET_URL = `ws://${window.location.host}`
const TIME_DELAY = 10000
const socket = new WebSocket(SOCKET_URL)

const messageList = document.getElementById("message-list")
const messageForm = document.getElementById("message-form")

socket.addEventListener("open", () => console.log("Connected to the Server ✅"))
socket.addEventListener("message", (message) => console.log(`New Message: ${message.data}`))
socket.addEventListener("close", () => console.log("Disconnected to the Server 😴"))

const handleSubmit = (event) => {
    event.preventDefault()
    const input = document.getElementById("message-input")
    socket.send(input.value)
    input.value = ""
}

messageForm.addEventListener("submit", handleSubmit)

setTimeout(()=>socket.send("Hello from the browser!"), TIME_DELAY)
