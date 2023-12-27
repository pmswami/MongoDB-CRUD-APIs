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
    let books=[]
    db.collection("newbooks")
    .find() // returns cursor to the data from collection
    .sort({"author":1})
    .forEach(element => {
        books.push(element)
    })
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error: "Could not fetch the documents"})
    })
})

