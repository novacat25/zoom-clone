const socket = io()

const myFace = document.getElementById("my-face")
const muteButton = document.getElementById("mute")
const cameraButton = document.getElementById("camera")
const cameraSelect = document.getElementById("camera-select")

const CAMERA_INPUT_TYPE = "videoinput"

let myStream = null
let [muted, cameraOff] = [false, false]

const getCameras = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter((device) => device.kind === CAMERA_INPUT_TYPE)
        const currentCamera = myStream.getVideoTracks()[0]

        cameras.forEach((camera) => {
            const option = document.createElement("option")
            option.innerText = camera.label
            option.value = camera.deviceId
            if(camera.label === currentCamera.label) {
                option.selected = true
            }
            cameraSelect.appendChild(option)
        })

    } catch (err) {
        console.error(err)
    }

}
const getMedia = async (deviceId) => {
    const initialConstraints = {
        audio: true,
        video: {
            facingMode: "user"
        }
    }
    const cameraConstraints = {
        audio: true,
        video: {
            deviceId: deviceId
        }
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstraints
        )
        myFace.srcObject = myStream

        if(!deviceId) {
            await getCameras()
        }

    } catch (err) {
        console.error(err)
    }
}

const handleCameraChange = async () => {
    await getMedia(cameraSelect.value)
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
cameraSelect.addEventListener("input", handleCameraChange)