import express from "express" 
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/authController.js";

const router = express.Router();


// register route
router.post("/register", registerUser);

// logim route
router.post("/login", loginUser);

router.post("/login", (req, res) => { 
    res.send( "Login Route");
})

export default router;