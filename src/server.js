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
    socket.on("enter-room", (roomName, jobDone) => {
        console.log(roomName)
        setTimeout(()=>jobDone(JOBDONE_MESSAGE), ANONYMOUS_SECOND)
    })
})

httpServer.listen(PORT_NUMBER, handleListen)