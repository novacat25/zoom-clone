import http from "http"
import WebSocket from "ws"
import express from "express"

const app = express()
const PORT_NUMBER = 3000

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
    console.log("Connected to the Browser ✅")
    socket.on("close", ()=>console.log("Disconnected from the Broswer 😴"))
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString("utf8")))
    })
})
server.listen(PORT_NUMBER, handleListen)