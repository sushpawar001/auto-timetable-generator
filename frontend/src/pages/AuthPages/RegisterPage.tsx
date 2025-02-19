import React, { useState } from "react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "Email is required";
        }
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return "Password is required";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear error when user starts typing
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const emailError = validateEmail(form.email);
        const passwordError = validatePassword(form.password);

        setErrors({
            email: emailError,
            password: passwordError,
        });

        return !emailError && !passwordError;
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/register`,
                form
            );
            if (response.status === 200) {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(response.data.detail);
            }
        } catch (error: any) {
            if (error.response?.status === 409) {
                setErrors({ ...errors, email: "Email already exists" });
                toast.error("Email already exists");
            } else {
                toast.error(
                    error.response?.data?.detail || "Registration failed"
                );
            }
        }
    };

    return (
        <div className="bg-white p-5 shadow-lg rounded-2xl w-full md:w-1/3">
            <form onSubmit={submitHandler}>
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Register
                </h1>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaEnvelope className="w-4 h-4 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className={`bg-gray-50 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`}
                            placeholder="name@mail.com"
                            value={form.email}
                            onChange={inputHandler}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaLock className="w-4 h-4 text-gray-500" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className={`bg-gray-50 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 pe-12 p-2.5`}
                            placeholder="password"
                            value={form.password}
                            onChange={inputHandler}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                            ) : (
                                <FaEye className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="mb-2">
                    <button
                        className="w-full bg-black hover:bg-black/85 text-white font-bold py-2 px-4 rounded-lg duration-500 hover:scale-y-105"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
                <div className="flex w-full justify-center gap-3">
                    <p>Already have an account?</p>
                    <Link
                        to="/login"
                        className="text-primary-500 font-bold hover:text-primary-900 duration-300"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
