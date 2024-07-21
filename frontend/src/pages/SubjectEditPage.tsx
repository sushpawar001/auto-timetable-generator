import React, { useState, useEffect } from "react";
import { Subject } from "../types/subjectType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//Todo: Add a autosuggestions for the professor and department
export default function SubjectEditPage() {
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const fetchSubject = async (id: string) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/subject/get/${id}`,
                { withCredentials: true }
            );
            console.log(response.data);
            setSubject(response.data.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching subject data");
            setLoading(false);
        }
    };

    const updateSubject = async (updatedSubject: Subject) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/subject/update/${
                    updatedSubject._id
                }`,
                updatedSubject,
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log(response.data);
                setSubject(response.data.data);
                toast.success("Subject updated successfully");
                setTimeout(() => {
                    navigate("/subjects");
                }, 300);
            }
        } catch (error) {
            setError("Error updating subject data");
            toast.error("Error updating subject data: " + error);
        }
    };

    const handleCancel = () => {
        navigate("/subjects");
    };

    useEffect(() => {
        const subjectId = window.location.pathname.split("/").pop();
        if (subjectId) {
            fetchSubject(subjectId);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!subject) {
        return <div>No subject found</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => {
            if (prevSubject) {
                return { ...prevSubject, [name]: value };
            }
            return prevSubject;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (subject) {
            updateSubject(subject);
        }
    };

    return (
        <div className="bg-secondary p-4 rounded-md flex flex-col justify-center items-center h-full shadow-lg overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4 font-custom">Edit Subject</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="subject"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={subject.subject}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="professor"
                    >
                        Professor
                    </label>
                    <input
                        type="text"
                        name="professor"
                        value={subject.professor}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="department"
                    >
                        Department
                    </label>
                    <input
                        type="text"
                        name="department"
                        value={subject.department}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="college_year"
                    >
                        College Year
                    </label>
                    <input
                        type="text"
                        name="college_year"
                        value={subject.college_year}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="subject_type"
                    >
                        Subject Type
                    </label>
                    <input
                        type="text"
                        name="subject_type"
                        value={subject.subject_type}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="workload"
                    >
                        Workload
                    </label>
                    <input
                        type="number"
                        name="workload"
                        value={subject.workload}
                        onChange={handleChange}
                        className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2  duration-300"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="border-2 border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2  duration-300"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
