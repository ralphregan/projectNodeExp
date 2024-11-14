import express from "express"
const router2 = express.Router()
import Article from "../models/articles.js"


router2.use(express.urlencoded({ extended: true }))


router2.get("/home", async (reg, res) => {
    const articles = await Article.find().sort({ CreatedTime: "desc" })

    res.render("public_article.ejs", { articles: articles })
})

router2.post("/home", async (req, res, next) => {
    const articles = await Article.find()
    res.render("public_article.ejs", { articles: articles, data: randName(), })


    console.log(req.body);
})
router2.get(`/home/:slug`, async (req, res) => {
    let article = await Article.findOne({ slug: req.params.slug })
    res.render("Articles/public_show", { article: article })
       

})


export default router2