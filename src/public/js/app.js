const socket = io()

const welcomeSection = document.getElementById("welcome")
const roomNameForm = document.getElementById("room-name")
const roomSection = document.getElementById("room")
const nicknameForm = document.getElementById("nickname-form")
const DEFAULT_NICKNAME = "Anonymous"

let isUserSetNickname = false
const isAnonymousUser = (userNickname) => (userNickname === DEFAULT_NICKNAME)

const addMessage = (msg) => {
    const dialogLost = document.getElementById("dialog-list")
    const chatItem = document.createElement("li")
    chatItem.innerText = msg
    dialogLost.appendChild(chatItem)
}

const handleNicknameSubmit = (e) => {
    e.preventDefault()
    isUserSetNickname = true
    const nicknameInput = document.getElementById("nickname-input")
    const userNicknameDisplay = document.getElementById("username-display")
    const userNickName = nicknameInput.value
    socket.emit("choose-nickname", userNickName)
    nicknameForm.hidden = true
    userNicknameDisplay.innerText = ` Hello ${userNickName}!`
    userNicknameDisplay.hidden = false
    nicknameInput.value = ""
}

const handleRoomSubmit = (e) => {
    e.preventDefault()
    if(!isUserSetNickname) {
        alert("Please choose a nickname!")
        return
    }
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

const showRoom = () => {
    welcomeSection.hidden = true
    roomSection.hidden = false
    const roomTitle = document.getElementById("room-title")
    roomTitle.innerText = `Room: ${roomName}`

    const chatForm = document.getElementById("chat-form")

    chatForm.addEventListener("submit", handleMessageSubmit)
}

socket.on("welcome-everyone", (user) => {
    isAnonymousUser(user) ? addMessage(`Someone has joined!`) : addMessage(`${user} has joined!`)
})
socket.on("left-room", (user) => {
    isAnonymousUser(user) ? addMessage(`Someone has left!`) : addMessage(`${user} has left!`)
}) 
socket.on("show-message", addMessage)

nicknameForm.addEventListener("submit", handleNicknameSubmit)
roomNameForm.addEventListener("submit", handleRoomSubmit)