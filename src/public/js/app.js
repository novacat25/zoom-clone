const socket = io()
const myFace = document.getElementById("my-face")
const muteButton = document.getElementById("mute")
const cameraButton = document.getElementById("camera")

let myStream = null
let [muted, cameraOff] = [false, false]

const getMedia = async () => {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        myFace.srcObject = myStream
        console.log(myStream)

    } catch (err) {
        console.error(err)
    }
}

const handleMuteClick = () => {
    myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled))

    if (!muted) {
        muted = true
        muteButton.innerText = "Unmute"
    } else {
        muted = false
        muteButton.innerText = "Mute"
    }
}

const handleCameraClick = () => {
    myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled))

    if (!cameraOff) {
        cameraOff = true
        cameraButton.innerText = "Camera On"
    } else {
        cameraOff = false
        cameraButton.innerText = "Camera Off"
    }
}

getMedia()

muteButton.addEventListener("click", handleMuteClick)
cameraButton.addEventListener("click", handleCameraClick)