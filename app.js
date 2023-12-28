const express = require("express")
const {connectToDb, getDb} = require("./db")
const { ObjectId } = require("mongodb")

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


app.get("/books/:id", (req, res)=>{

    // console.log(req.params.id)

    if(ObjectId.isValid(req.params.id)){
        db.collection("newbooks")
        .findOne({_id: new ObjectId(req.params.id)})
        .then((doc)=>{
            if(doc) res.status(200).json(doc)
            else res.status(200).json({error: "Object does not exist"})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({error: "could not fetch results"})
        })
    }
    else{
        res.status(500).json({error: "not a valid doc Id"})
    }
    
})