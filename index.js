import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { randomSuperhero } from "superheroes"
import random from "random-name"
import methodOverride from "method-override"
import { title } from "process"
var app = express()
var port = process.env.PORT || 3000
import mongoose from "mongoose"
import router from "./routes/post.js"
import router2 from "./routes/public_post.js"
import Article from "./models/articles.js"

dotenv.config()

const dbURI = process.env.DATABASE_URL

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
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



app.listen(port, (req, res) => {
    console.log(`i'm listening on the port ${port}`);

})
