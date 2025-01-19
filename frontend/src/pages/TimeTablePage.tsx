import axios from "axios";
import React, { useState, useEffect } from "react";
import { Timetable } from "../../types/timetable";

type subjectType = {
    subject: string;
    subtype: string;
    professor: string;
};

export default function TimeTablePage() {
    const [timeTable, setTimeTable] = useState<Timetable>();
    const [filteredTimeTable, setFilteredTimeTable] = useState<Timetable>();
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [numberOfLectures, setNumberOfLectures] = useState(0);

    const getTimeTable = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/timetable/generate_timetable`,
            { withCredentials: true }
        );
        console.log(response.data.timetable);
        setDepartments(Object.keys(response.data.timetable).sort());
        setTimeTable(response.data.timetable);
        if (selectedDepartment === "") {
            setSelectedDepartment(Object.keys(response.data.timetable)[0]);
        }
    };

    useEffect(() => {
        getTimeTable();
    }, []);

    useEffect(() => {
        if (selectedDepartment !== "" && timeTable) {
            setFilteredTimeTable(timeTable[selectedDepartment]);
        }
    }, [selectedDepartment, timeTable]);

    useEffect(() => {
        if (filteredTimeTable) {
            setNumberOfLectures(filteredTimeTable["Mon"].length);
        }
    }, [filteredTimeTable]);

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
                <div className="bg-secondary rounded-md w-2/3 flex items-center p-1.5 shadow-md">
                    <h1 className="~text-base/xl font-bold pl-2 text-primary-950 font-custom">
                        {selectedDepartment} Time Table
                    </h1>
                </div>
                <div className="flex w-1/3 bg-secondary ~p-1/1.5 rounded-md shadow-md">
                    <p className="~text-xs/sm my-auto w-3/5 text-center">
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
            <div className="bg-secondary ~p-2.5/4 rounded-md flex flex-col items-center h-full shadow-lg overflow-y-auto">
                <div className="w-full h-full">
                    <table className="w-full h-full">
                        <thead>
                            <tr className="divide-x divide-gray-300">
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
                                            className="p-1 ~text-xs/base text-center font-bold bg-gray-500 text-white h-10 font-custom"
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
                                                const isFreeLecture =
                                                    subObj["subject"] ===
                                                    "Empty Slot";
                                                return (
                                                    <td
                                                        className={`border border-gray-400 ~p-0.5/1 text-center w-1/6 hover:border-primary-700 hover:border-2 text-sm h-${numberOfLectures} ${
                                                            isFreeLecture
                                                                ? "bg-gray-100 hover:border-gray-400"
                                                                : "hover:bg-primary-100"
                                                        }`}
                                                        key={day + "-" + i}
                                                    >
                                                        {isFreeLecture ? (
                                                            <p className="text-sm font-medium text-gray-400">
                                                                Free Lecture
                                                            </p>
                                                        ) : (
                                                            <SubjectSlot
                                                                data={subObj}
                                                            />
                                                        )}
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

export function SubjectSlot({ data }: { data: subjectType }) {
    return (
        <>
            <p className="~text-xs/sm font-medium">{data.subject}</p>
            <p className="~text-xs/sm text-gray-600 mt-0.5">{data.professor}</p>
            <p className="text-xs text-gray-600">({data.subtype})</p>
        </>
    );
}
