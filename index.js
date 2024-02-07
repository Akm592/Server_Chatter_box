const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://akm59221:"+ encodeURIComponent("Chatter@box") +"@cluster0.nofjnyo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err.message);
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
        origin: "https://chatter-box-vh95.onrender.com",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});
//static files
app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})