import http from "http"
import { Server } from "socket.io"
import express from "express"

const app = express()
const PORT_NUMBER = 3000
const ANONYMOUS_SECOND = 2000
const JOBDONE_MESSAGE = "Hello From the Backend"

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res) => res.render("home"))
app.get("/*", (_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:${PORT_NUMBER}`)

const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Socket Event: ${event}`) )
    socket.on("enter-room", (roomName, jobDone) => {
        console.log("socket.id", socket.id)
        console.log(socket.rooms)
        socket.join(roomName)
        console.log(socket.rooms)
        setTimeout(()=>jobDone(JOBDONE_MESSAGE), ANONYMOUS_SECOND)
    })
})

httpServer.listen(PORT_NUMBER, handleListen)