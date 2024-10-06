import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppStore } from "../zustand";

const Login = () => {
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRef.current.value) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = "Invalid email address";
    }

    if (!passwordRef.current.value) {
      newErrors.password = "Password is required";
    } else if (passwordRef.current.value.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "https://trello.vimlc.uz/api/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, response.status, response.data);
      navigate("/")
      setUser(response.data);
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.status === 400) {
        setErrors({ api: "Incorrect email or password" });
      } else if (error.response) {
        const apiErrors = error.response.data.errors || {};
        setErrors(apiErrors);
      } else {
        setErrors({ api: "An error occurred during login." });
      }
    }
  };

  return (
    <div className=" bg-orange-100 m-auto justify-center min-h-screen flex">

      <div className="w-1/2 bg-inherit flex flex-col justify-center items-center p-10">

        <form className="w-60 max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className={`mt-1 bg-slate-200 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none border-0 focus:border-indigo-500 sm:text-sm`}
              placeholder="@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                className={`mt-1 bg-slate-200  block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none border-0 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.api && (
            <p className="text-red-500 text-xs mt-1">{errors.api}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">

          <span
            className="text-blue-800 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register / o`tish
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
