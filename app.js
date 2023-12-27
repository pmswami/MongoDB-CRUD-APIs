const express = require("express")
const {connectToDb, getDb} = require("./db")

// init the app and middleware
const app = express()

//DB Connection
let db
connectToDb((err)=>{
    if (!err){
        app.listen(3000, ()=>{
            console.log("App is listening on port 3000")
        })
        db=getDb()
    }
})

//routes
app.get("/books", (req, res)=>{
    res.json({msg:"Welcome to the API"})
})

