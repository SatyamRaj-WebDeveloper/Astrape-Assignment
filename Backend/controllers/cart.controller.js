// controllers/cart.controller.js
import User from "../models/User.model.js";
import Item from "../models/Item.model.js"; 

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("getCart error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity required" });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existsIdx = user.cart.findIndex(
      (it) => it.product.toString() === productId.toString()
    );

    if (existsIdx !== -1) {
      user.cart[existsIdx].quantity += Number(quantity);
    } else {
      user.cart.push({ product: productId, quantity: Number(quantity) });
    }

    await user.save();
    await user.populate("cart.product");
    return res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    console.error("addToCart error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity === "undefined") {
      return res.status(400).json({ message: "Quantity required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const idx = user.cart.findIndex(
      (it) => it.product.toString() === productId.toString()
    );

    if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

    user.cart[idx].quantity = Number(quantity);
    // Optionally remove if quantity is zero:
    if (user.cart[idx].quantity <= 0) {
      user.cart.splice(idx, 1);
    }

    await user.save();
    await user.populate("cart.product");
    return res.status(200).json({ message: "Cart item updated", cart: user.cart });
  } catch (err) {
    console.error("updateCartItem error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((it) => it.product.toString() !== productId.toString());

    await user.save();
    await user.populate("cart.product");
    return res.status(200).json({ message: "Item removed", cart: user.cart });
  } catch (err) {
    console.error("removeCartItem error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const getCartCount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalItems = (user.cart || []).reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return res.status(200).json({ cartCount: totalItems });
  } catch (err) {
    console.error("getCartCount error:", err);
    return res.status(500).json({ message: err.message });
  }
};
