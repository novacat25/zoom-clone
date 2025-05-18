import http from "http"
import { Server } from "socket.io"
import express from "express"
import 'dotenv/config'

const app = express()
const PORT_NUMBER = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res) => res.render("home"))
app.get("/*", (_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:${PORT_NUMBER}`)

const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket) => {
    socket.on("join-room", (roomName, execute) => {
        socket.join(roomName)
        execute()
        socket.to(roomName).emit("welcome")
    })
})

httpServer.listen(PORT_NUMBER, handleListen)