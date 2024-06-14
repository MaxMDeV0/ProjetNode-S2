import express from "express";
import { getHome, getLoginForm, addUser, getUser, loginUser } from "../controller/user.controller.js";
import authMiddleware from '../middleware/auth.js';



const router = express.Router()

router.get("/", getHome)
router.get("/signin", getHome)
router.post("/signin", addUser)
router.get("/login", getLoginForm)
router.post("/login", loginUser)
router.get("/dashboard", authMiddleware, getUser)


export default router;