import http from "http"
import { Server } from "socket.io"
import express from "express"

const app = express()
const PORT_NUMBER = 3000
const DEFAULT_NICKNAME = "Anonymous"

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res) => res.render("home"))
app.get("/*", (_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:${PORT_NUMBER}`)

const httpServer = http.createServer(app)
const io = new Server(httpServer)

const publicRooms = () => {
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = io

    const publicRoomsList = []
    rooms.forEach((_, key) => {
        if(!sids.get(key)) {
            publicRoomsList.push(key)
        }
    })

    return publicRoomsList
}

const countRoom = (roomName) => io.sockets.adapter.rooms.get(roomName)?.size


io.on("connection", (socket) => {
    socket["nickname"] = DEFAULT_NICKNAME
    socket.on("enter-room", (roomName, jobDone) => {
        socket.join(roomName)
        socket.to(roomName).emit("welcome-everyone", socket.nickname, countRoom(roomName))
        io.sockets.emit("room-change", publicRooms())
        jobDone(countRoom(roomName))
    })
    socket.on("choose-nickname", (nick) => socket["nickname"] = nick)
    socket.on("send-message", (msg, chatRoom, jobDone) => {
        socket.to(chatRoom).emit("show-message", `${socket.nickname}: ${msg}`)
        jobDone()
    })
    socket.on("disconnecting", ()=>{
        socket.rooms.forEach((room) => socket.to(room).emit("left-room", socket.nickname, countRoom(room) - 1))
    })
    socket.on("disconnect", () => {
        io.sockets.emit("room-change", publicRooms())
    })
})

httpServer.listen(PORT_NUMBER, handleListen)