const express = require("express");
const signupRouter = require('./routes/authSignupRoute')

const app = express();

// Accept json
app.use(express.json())
// Accept body
app.use(express.urlencoded({ extended: true }))
// Accept Html
app.use(express.static("public"))

app.use("/api/v1",signupRouter)



console.log(process)
app.listen('3000', () => console.log("Done"))