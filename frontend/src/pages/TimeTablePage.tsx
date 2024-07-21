import axios from "axios";
import React, { useState, useEffect } from "react";

export default function TimeTablePage() {
    const [timeTable, setTimeTable] = useState({
        Mon: [],
        Tue: [],
        Wed: [],
        Thurs: [],
        Fri: [],
        Sat: [],
    });
    const [filteredTimeTable, setFilteredTimeTable] = useState({
        Mon: [],
        Tue: [],
        Wed: [],
        Thurs: [],
        Fri: [],
        Sat: [],
    });
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [numberOfLectures, setNumberOfLectures] = useState(0);

    const getTimeTable = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/timetable`,
            { withCredentials: true }
        );
        console.log(response.data);
        setDepartments(Object.keys(response.data.data));
        setTimeTable(response.data.data);
        if (selectedDepartment === "") {
            setSelectedDepartment(Object.keys(response.data.data)[0]);
        }
    };

    useEffect(() => {
        getTimeTable();
    }, []);

    useEffect(() => {
        if (selectedDepartment !== "") {
            setFilteredTimeTable(timeTable[selectedDepartment]);
        }
    }, [selectedDepartment, timeTable]);

    useEffect(() => {
        setNumberOfLectures(filteredTimeTable["Mon"].length);
    }, [filteredTimeTable]);

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
                <div className="bg-secondary rounded-md w-2/3 flex items-center p-1.5 shadow-md">
                    <h1 className="text-2xl font-bold pl-4 text-primary-950 font-custom">
                        {selectedDepartment} Time Table
                    </h1>
                </div>
                <div className="flex w-1/3 bg-secondary p-1.5 rounded-md shadow-md">
                    <p className="text-sm my-auto w-3/5 text-center">
                        Select Department:
                    </p>
                    <select
                        className="border border-stone-300 p-2 rounded-md w-full"
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="bg-secondary p-4 rounded-md flex flex-col items-center h-full shadow-lg overflow-y-auto">
                <div className="w-full h-full">
                    <table className="w-full h-full">
                        <thead>
                            <tr>
                                {[
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thurs",
                                    "Fri",
                                    "Sat",
                                ].map((day) => {
                                    return (
                                        <th
                                            key={day}
                                            className="border border-slate-300 p-1 text-center font-bold bg-primary-700 text-white h-10 font-custom"
                                        >
                                            {day}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {Array.from(
                                { length: numberOfLectures },
                                (_, i) => {
                                    return (
                                        <tr key={i}>
                                            {[
                                                "Mon",
                                                "Tue",
                                                "Wed",
                                                "Thurs",
                                                "Fri",
                                                "Sat",
                                            ].map((day) => {
                                                const subObj =
                                                    filteredTimeTable[day][i];
                                                return (
                                                    <td
                                                        className={`border border-primary-300 p-1 text-center w-1/6 hover:border-primary-700 hover:border-2 text-sm ${
                                                            subObj[
                                                                "subject"
                                                            ] === "Empty Slot"
                                                                ? "bg-red-100"
                                                                : "hover:bg-primary-100"
                                                        }`}
                                                        key={day + "-" + i}
                                                    >
                                                        <p>
                                                            {subObj["subject"]}
                                                        </p>
                                                        <p>
                                                            {
                                                                subObj[
                                                                    "professor"
                                                                ]
                                                            }
                                                        </p>
                                                        <p>
                                                            ({" "}
                                                            {subObj["subtype"]}{" "}
                                                            )
                                                        </p>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
