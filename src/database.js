const mongoose = require("mongoose")

module.exports = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log("connected tu mongo"))

