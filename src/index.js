const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 8000;
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/posts.routes");
const conversationRoutes = require("./routes/conversations.routes");
const messagesRoutes = require("./routes/messages.routes");
const multer = require("multer");
const path = require("path");
const io = require("socket.io")(8008, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("An user disconnect");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit("getMessage",{
      senderId,
      text

    })
  });
});

//database
require("./database");

//Middlewares
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
