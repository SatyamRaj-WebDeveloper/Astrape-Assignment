import User from "../models/User.model.js";
import Product from "../models/Item.model.js";

// GET CART
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    const user = await User.findById(req.user.id);

    // Check if item already exists in cart
    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex !== -1) {
      // If exists, update quantity
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CART ITEM QUANTITY
export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ message: "Quantity is required" });
  }

  try {
    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({ message: "Cart item updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const newCart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    user.cart = newCart;
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
