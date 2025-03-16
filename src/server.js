import http from "http"
import WebSocket from "ws"
import express from "express"

const app = express()
const PORT_NUMBER = 3000
const DEFAULT_ANONYMOUS_NAME = "Anonymous"
const TYPE_NICKNAME = "nickname"
const TYPE_NEW_MESSAGE = "new_message"

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_,res) => res.render("home"))
app.get("/*", (_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:${PORT_NUMBER}`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const sockets = []

wss.on("connection", (socket) => {
    sockets.push(socket)
    socket["nickname"] = DEFAULT_ANONYMOUS_NAME
    console.log("Connected to the Browser ✅")
    socket.on("close", ()=>console.log("Disconnected from the Broswer 😴"))
    socket.on("message", (msg) => {
        const message = JSON.parse(msg)
        switch (message.type) {
            case TYPE_NEW_MESSAGE:
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`))
                break
            case TYPE_NICKNAME:
                socket["nickname"] = message.payload
                break
        }
    })
})
server.listen(PORT_NUMBER, handleListen)