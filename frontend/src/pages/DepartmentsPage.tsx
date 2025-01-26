import React, { useState, useEffect } from "react";
import DepartmentSettings from "../components/DepartmentSettings";
import axios from "axios";
import { DepartmentSettingsType } from "../types/departmentType";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export default function DepartmentsPage() {
    const [departments, setDepartments] = useState<DepartmentSettingsType[]>(
        []
    );
    const [departmentSettings, setDepartmentSettings] =
        useState<DepartmentSettingsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const getDepartments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/departments/get`, {
                    withCredentials: true,
                });
                setDepartments(response.data.data);
                setActiveTab(response.data.data[0].department);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const getDepartmentSettings = () => {
            if (departments.length > 0) {
                const selectedDepartment = departments.find(
                    (dept) => dept.department === activeTab
                );
                setDepartmentSettings(selectedDepartment);
            }
        };
        getDepartmentSettings();
    }, [activeTab, departments]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-center text-2xl font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="bg-gray-100 p-1 rounded-lg w-full mb-2.5 shadow-md">
                <div className="flex gap-2">
                    {departments.map((dept) => (
                        <button
                            key={dept.department}
                            onClick={() => setActiveTab(dept.department)}
                            className={`py-2.5 text-sm font-medium rounded-md transition-colors flex items-center justify-center w-full
                    ${
                        activeTab === dept.department
                            ? "bg-secondary shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                        >
                            {dept.department}
                            {activeTab === dept.department && (
                                <span className="bg-green-600 w-2 h-2 ml-2 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-secondary ~p-2.5/4 rounded-md flex flex-col items-center h-full shadow-lg overflow-y-auto">
                {departmentSettings && (
                    <DepartmentSettings
                        departmentSettings={departmentSettings}
                    />
                )}
            </div>
        </div>
    );
}
