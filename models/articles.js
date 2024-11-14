import mongoose from "mongoose";
import path from "path";
import { Marked } from "marked";
import slugify from "slugify";
import { type } from "os";


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    arthur:{
        type: String,
        required: true,
    },

    description: {
        type: String,


    },
    path: {
        type: String,
        required: true

    },
    CreatedTime: {
        type: Date,
        default: Date.now
    },
    imageUrl:{
       type: String,
    },

    slug: {
        type: String,
        required: true,
        default: true
    },
})
postSchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})
const Article = mongoose.model("Article", postSchema)

export default Article