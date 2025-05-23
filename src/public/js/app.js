const socket = io()

const welcomeSection = document.getElementById("welcome")
const roomNameForm = document.getElementById("room-name")
const roomSection = document.getElementById("room")
const nicknameForm = document.getElementById("nickname-form")

const DEFAULT_NICKNAME = "Anonymous"
const DEFAULT_DISPLAY_NICKNAME = "Someone"

const isAnonymousUser = (userNickname) => (userNickname === DEFAULT_NICKNAME)

const addMessage = (msg) => {
    const dialogList = document.getElementById("dialog-list")
    const chatItem = document.createElement("li")
    chatItem.innerText = msg
    dialogList.appendChild(chatItem)
}

const handleNicknameSubmit = (e) => {
    e.preventDefault()
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

const refreshRoomName = (roomText) => {
    const roomTitle = document.getElementById("room-title")
    roomTitle.innerText = `Room: ${roomText}`
}

const showRoom = (newCount) => {
    welcomeSection.hidden = true
    roomSection.hidden = false
    refreshRoomName(`${roomName} (${newCount})`)

    const chatForm = document.getElementById("chat-form")
    chatForm.addEventListener("submit", handleMessageSubmit)
}

socket.on("welcome-everyone", (user, newCount) => {
    const displayUserName = isAnonymousUser(user) ? DEFAULT_DISPLAY_NICKNAME : user
    refreshRoomName(`${roomName} (${newCount})`)
    addMessage(`${displayUserName} has joined!`)
})
socket.on("left-room", (user, newCount) => {
    const displayUserName = isAnonymousUser(user) ? DEFAULT_DISPLAY_NICKNAME : user
    refreshRoomName(`${roomName} (${newCount})`)
    addMessage(`${displayUserName} has left!`)
}) 
socket.on("room-change", (rooms) => {
    const roomsList = document.getElementById("rooms-list")
    roomsList.innerHTML = ""

    if(rooms.length === 0) {
        return
    }

    rooms.forEach((room) => {
        const roomItem = document.createElement("li")
        roomItem.innerText = room
        roomsList.appendChild(roomItem)
    })
}) 

socket.on("show-message", addMessage)

nicknameForm.addEventListener("submit", handleNicknameSubmit)
roomNameForm.addEventListener("submit", handleRoomSubmit)