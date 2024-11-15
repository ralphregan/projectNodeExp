import mongoose from "mongoose"
import {MongoClient, ServerApiVersion} from "mongodb"
import dotenv from "dotenv"
dotenv.config()
import express from "express"

import bodyParser from "body-parser"
import { randomSuperhero } from "superheroes"
import random from "random-name"
import methodOverride from "method-override"
import { title } from "process"
var app = express()
console.log(process.env)
console.log(process.env.DATABASE_URL);



var port = process.env.PORT || 3000

import router from "./routes/post.js"
import router2 from "./routes/public_post.js"
import Article from "./models/articles.js"
import { log } from "console"


const uri = process.env.DATABASE_URL
if(!uri){
   console.log(`its the dburl ${process.env.DATABASE_URL}`)
    
}
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 3000})
    .then(() => {
        // Listen for requests
        console.log("i am connected")
    })
    .catch((error) => {
        console.log(error);
    });

function randName() {
    return `${randomSuperhero()}  ${random.first()}`

}
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static("public"))

app.use("/uploads", express.static("uploads"))
app.use("/profile", router)
app.use(router2)



app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.get("/start", (req, res, next) => {
    res.render("registration.ejs")

})

app.post("/start", (req, res, next) => {
    res.render("registration.ejs")

})
app.get("/profile", async (reg, res) => {
    const articles = await Article.find().sort({ CreatedTime: "desc" })

    res.render("profile.ejs", { articles: articles })
})

app.post("/profile", async (req, res, next) => {
    const articles = await Article.find()
    res.render("profile.ejs", { articles: articles, data: randName(), })


    console.log(req.body);
})



app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`i'm listening on the port ${port}`);

})
