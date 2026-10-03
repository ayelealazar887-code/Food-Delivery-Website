import React, { useEffect, useState, type ReactNode } from "react";
import { StoreContext, type StoreContextType, type Food } from "./StoreContext";
import { apii, apiii } from "../api/axios";

type Props = {
  children: ReactNode;
};

function StoreContextProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [token, setToken] = useState<string>("");
  const [food_list, setFoodList] = useState<Food[]>([]);

  const addToCart = async (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await apiii.post("/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

const removeFromCart = async (itemId: string) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
  }))

  if (token) {
    try {
      const response = await apiii.post(
        '/remove',
        { itemId },
        {
          headers: {
            token,
          },
        }
      )

      console.log('REMOVE RESPONSE:', response.data)
    } catch (error: any) {
      console.error('REMOVE CART ERROR:', error)
      console.log('BACKEND RESPONSE:', error.response?.data)
    }
  }
}
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const itemDetails = food_list.find((food) => food.id === item);

      if (itemDetails) {
        totalAmount += itemDetails.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await apii.get("/list");

      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const cartLoadData = async (token: string) => {
    try {
      const response = await apiii.get("/get", {
        headers: { token },
      });
      console.log("CART RESPONSE:", response.data);
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        setToken(savedToken);
        await cartLoadData(savedToken);
      }
    };

    loadData();
  }, []);

  const contextValue: StoreContextType = {
    food_list,
    setFoodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
