"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Add to Cart Logic
  const addToCart = (pizza, size = "Medium") => {
    setCart((prevCart) => {
      // Check if this exact pizza AND size is already in the cart
      const existingItem = prevCart.find(
        (item) => item.id === pizza.id && item.size === size,
      );

      if (existingItem) {
        // If it exists, just increase the quantity
        return prevCart.map((item) =>
          item.id === pizza.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // If it's new, add it to the array
      return [...prevCart, { ...pizza, size, quantity: 1 }];
    });
  };

  // 2. Remove from Cart
  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  // 3. Update Quantity
  const updateQuantity = (id, size, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        // Find the specific item by ID and Size
        if (item.id === id && item.size === size) {
          // Calculate new quantity (Math.max(1, ...) prevents it from going below 1)
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  // 3. Total Item Count for the Navbar Badge
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart easily in any component
export const useCart = () => useContext(CartContext);
