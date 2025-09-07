import express from "express";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/cart/get", authMiddleware, getCart);
router.post("/cart/add", authMiddleware, addToCart);
router.put("/cart/update/:productId", authMiddleware, updateCartItem);
router.delete("/cart/remove/:productId", authMiddleware, removeCartItem);

export default router;