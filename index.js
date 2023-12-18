const express=require("express")
const cors = require('cors')
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {quizRouter}=require("./routes/quiz.routes")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.use("/quizzes",quizRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Server is running at port 8080`)
    } catch (error) {
        console.log(err)
    }
    })