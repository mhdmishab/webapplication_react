import express from "express";
import {upload} from "../multer/multer.js";

import {register,Login,UpdateProfile,UpdateImage} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); 
router.post("/login", Login);
router.post("/update", UpdateProfile);
router.post("/updateimage/:id",upload.single('image'),UpdateImage);



export default router;