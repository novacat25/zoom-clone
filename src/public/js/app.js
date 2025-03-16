const SOCKET_URL = `ws://${window.location.host}`
const socket = new WebSocket(SOCKET_URL)

const TYPE_NICKNAME = "nickname"
const TYPE_NEW_MESSAGE = "new_message"

const messageList = document.getElementById("message-list")
const messageForm = document.getElementById("message-form")
const nicknameForm = document.getElementById("nickname-form")

socket.addEventListener("open", () => console.log("Connected to the Server ✅"))
socket.addEventListener("message", (message) => {
    const li = document.createElement("li")
    li.innerText = message.data
    messageList.append(li)
})
socket.addEventListener("close", () => console.log("Disconnected to the Server 😴"))

const makeMessage = (type, payload) => JSON.stringify({type, payload})

const handleSubmit = (event) => {
    event.preventDefault()
    const input = document.getElementById("message-input")
    socket.send(makeMessage(TYPE_NEW_MESSAGE, input.value))
    input.value = ""
}

const handleNicknameSubmit = (event) => {
    event.preventDefault()
    const input = document.getElementById("nickname-input")
    socket.send(makeMessage(TYPE_NICKNAME, input.value))
    input.value = ""
}

messageForm.addEventListener("submit", handleSubmit)
nicknameForm.addEventListener("submit", handleNicknameSubmit)