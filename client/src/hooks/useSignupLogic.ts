// File: src/hooks/useSignupLogic.ts
import { useSignupMutation } from "@/store/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignupLogic = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    shops: ["", "", ""],
  });
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  const handleChange = (name: string, value: string) => {
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addShopField = () => {
    setSignupData((prev) => ({
      ...prev,
      shops: [...prev.shops, ""],
    }));
  };

  const removeShopField = (index: number) => {
    if (signupData.shops.length > 3) {
      setSignupData((prev) => ({
        ...prev,
        shops: prev.shops.filter((_, i) => i !== index),
      }));
    }
  };

  const updateShop = (index: number, value: string) => {
    setSignupData((prev) => {
      const newShops = [...prev.shops];
      newShops[index] = value;
      return { ...prev, shops: newShops };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.username.trim()) {
      toast("Username is required");
      return;
    }

    if (!validatePassword(signupData.password)) {
      toast(
        "Password must be at least 8 characters with at least one number and one special character"
      );
      return;
    }

    const validShops = signupData.shops.filter((shop) => shop.trim() !== "");
    if (validShops.length < 3) {
      toast("Please enter at least 3 shop names");
      return;
    }

    const uniqueShops = [...new Set(validShops)];
    if (uniqueShops.length !== validShops.length) {
      toast("Shop names must be unique");
      return;
    }

    try {
      await signup({
        username: signupData.username,
        password: signupData.password,
        shopNames: uniqueShops,
      }).unwrap();
      toast("Account created successfully!");
      navigate("/signin");
    } catch (error: any) {
      toast(error.data?.message || "Signup failed");
    }
  };

  return {
    showPassword,
    setShowPassword,
    isLoading,
    addShopField,
    removeShopField,
    updateShop,
    signupData,
    navigate,
    handleChange,
    handleSubmit,
  };
};

export default useSignupLogic;
