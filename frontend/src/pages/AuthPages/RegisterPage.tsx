import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, form);
            console.log(response)
            if (response.status === 200) {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(response.data.detail);
            }
        } catch (error) {
            toast.error(error.response.data.detail);
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
                        htmlFor="email-address-icon"
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
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="name@mail.com"
                            value={form.email}
                            onChange={inputHandler}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email-address-icon"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaLock className="w-4 h-4 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="password"
                            value={form.password}
                            onChange={inputHandler}
                        />
                    </div>
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
                    <Link to="/login" className="text-primary-500 font-bold hover:text-primary-900 duration-300">Login</Link>
                </div>           
            </form>
        </div>
    );
}
