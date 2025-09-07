import express from "express";
import { getCart, addToCart, updateCartItem, removeCartItem , getCartCount } from "../controllers/cart.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/get",verifyjwt, getCart);
router.post("/add", verifyjwt, addToCart);
router.put("/update/:productId", verifyjwt, updateCartItem);
router.delete("/remove/:productId", verifyjwt, removeCartItem);
router.get("/user/cartcount" , verifyjwt , getCartCount);

export default router;