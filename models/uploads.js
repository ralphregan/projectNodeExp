
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({destination: (req, file, cb)=>{
    cb(null, "uploads/");
},
filename:(req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
}
 })

 const fileFilter =(req, file, cb)=>{
    const fileType = /jpeg|jpg|png|gif/
    const extname = fileType.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileType.test(file.mimetype)
    if(extname && mimetype){
        cb(null, true)
    
    }else{
        cb(new Error("Only image files are allowed"))
    }
 }

 const upload = multer({storage, fileFilter})
 export default upload