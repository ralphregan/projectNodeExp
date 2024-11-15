import express, { Router } from "express"
import path from "path"
import Article from "../models/articles.js"
import upload from "../models/uploads.js"
import slugify from "slugify"


const router = express.Router()

router.use(express.urlencoded({ extended: true }))


router.get("/new", (req, res) => {
    res.render("Articles/new.ejs", { article: new Article })
   
})

router.get("/:slug", async (req, res) => {
    let article = await Article.findOne({ slug: req.params.slug })

    if (article == null) { res.redirect("/profile") }

    res.render("Articles/show", { article: article })

})


router.post("/show", upload.single("image"), async (req, res) => {
    const imageUrl =  "/uploads/" + req.file.filename
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        CreatedTime: req.body.CreatedTime,
        path: req.body.path,
        arthur: req.body.arthur,
        imageUrl: `/uploads/${req.file.filename}`,
        slug: slugify(req.body.title, { lower: true, strict: true }),

    })
    console.log(article.imageUrl)
    try {
    
        await article.save()
        res.redirect(`/profile/${article.slug}`)
    } catch (e) {
        res.render("Articles/new.ejs", { article: article })
        console.log("error", e);

    }

})


router.delete("/:id", async(req, res) => {
    console.log("i am here", req.params.id);
    try {
        await Article.findByIdAndDelete(req.params.id)  
        res.redirect("/profile")
    } catch (error) {
        console.log("Error deleting ", error);
        
    }
  
})


export default router