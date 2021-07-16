const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const helmet = require("helmet")
const morgan = require("morgan")
const port = process.env.PORT || 3000
const userRoutes = require("./routes/users.routes")
const authRoutes = require("./routes/auth.routes")

//database
require("./database")

//Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.listen(port, () => {
   console.log(`App listening at port ${port}`)
})