const SOCKET_URL = `ws://${window.location.host}`
const TIME_DELAY = 10000
const socket = new WebSocket(SOCKET_URL)

socket.addEventListener("message", () => console.log("Connected to the Server ✅"))
socket.addEventListener("message", (message) => console.log(`New Message: ${message.data}`))
socket.addEventListener("close", () => console.log("Disconnected to the Server 😴"))

setTimeout(()=>{
    socket.send("Hello from the browser!")
}, TIME_DELAY)