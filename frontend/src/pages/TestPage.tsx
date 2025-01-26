"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import DepartmentSettings from "../components/DepartmentSettings";

export default function CSVUploaderCard() {
    const [csvData, setCSVData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState<string>("");

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            Papa.parse(file, {
                complete: (result) => {
                    setCSVData(result.data as string[][]);
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Department Settings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        key={123}
                        className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Department Name
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue="07:20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue="10:00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Number of Practical Slots
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue="40"
                                />
                            </div>
                        </div>

                        <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Save Settings
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
