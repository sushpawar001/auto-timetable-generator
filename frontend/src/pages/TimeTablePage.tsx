import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { Timetable } from "../../types/timetable";
import { debounce } from "lodash";

type subjectType = {
    subject: string;
    subtype: string;
    professor: string;
};

interface FreeProfessors {
    Mon: string[][];
    Tue: string[][];
    Wed: string[][];
    Thurs: string[][];
    Fri: string[][];
    Sat: string[][];
}

export default function TimeTablePage() {
    const [timeTable, setTimeTable] = useState<Timetable>();
    const [filteredTimeTable, setFilteredTimeTable] = useState<Timetable>();
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [freeProfessors, setFreeProfessors] = useState<FreeProfessors>();

    const [numberOfLectures, setNumberOfLectures] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const getTimeTable = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/timetable/get_timetable`,
            { withCredentials: true }
        );
        // console.log(response.data.timetable);
        setDepartments(Object.keys(response.data.timetable).sort());
        setTimeTable(response.data.timetable);
        if (selectedDepartment === "") {
            setSelectedDepartment(Object.keys(response.data.timetable)[0]);
        }
    };

    useEffect(() => {
        const getFreeProfessors = async () => {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/professors/free-slot?department=${selectedDepartment}`,
                { withCredentials: true }
            );
            console.log(response.data.free_professors);
            setFreeProfessors(response.data.free_professors);
        };
        if (selectedDepartment !== "") {
            getFreeProfessors();
        }
    }, [selectedDepartment]);

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

    const debouncedSetSearch = useMemo(
        () => debounce((value: string) => setSearchTerm(value), 300),
        []
    );

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
                <div className="bg-secondary rounded-md w-1/3 flex items-center p-1.5 shadow-md">
                    <h1 className="~text-base/xl font-bold pl-2 text-primary-950 font-custom">
                        {selectedDepartment} Time Table
                    </h1>
                </div>
                <div className="w-1/3 relative">
                    <input
                        type="text"
                        placeholder="Search subjects or professors..."
                        className="w-full h-full p-2 pr-8 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        onChange={(e) => debouncedSetSearch(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                const searchInput = document.querySelector(
                                    'input[type="text"]'
                                ) as HTMLInputElement;
                                if (searchInput) searchInput.value = "";
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
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
                    {filteredTimeTable ? (
                        <TimeTableComponent
                            numberOfLectures={numberOfLectures}
                            filteredTimeTable={filteredTimeTable!}
                            searchTerm={searchTerm}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            You have not created a timetable
                        </div>
                    )}
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

export function TimeTableComponent({
    numberOfLectures,
    filteredTimeTable,
    searchTerm,
}: {
    numberOfLectures: number;
    filteredTimeTable: Timetable;
    searchTerm: string;
}) {
    const matchesSearch = (subObj: subjectType) => {
        if (!searchTerm) return false;
        const searchLower = searchTerm.toLowerCase();
        return (
            subObj.subject.toLowerCase().includes(searchLower) ||
            subObj.professor.toLowerCase().includes(searchLower)
        );
    };

    return (
        <table className="w-full h-full">
            <thead>
                <tr className="divide-x divide-gray-300">
                    {["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map((day) => {
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
                {Array.from({ length: numberOfLectures }, (_, i) => {
                    return (
                        <tr key={i}>
                            {["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map(
                                (day) => {
                                    const subObj = filteredTimeTable[day][i];
                                    const isFreeLecture =
                                        subObj["subject"] === "Empty Slot";
                                    const isHighlighted =
                                        !isFreeLecture && matchesSearch(subObj);

                                    return (
                                        <td
                                            className={`border border-gray-400 ~p-0.5/1 text-center w-1/6 hover:border-primary-700 hover:border-2 text-sm h-${numberOfLectures} ${
                                                isFreeLecture
                                                    ? "bg-gray-100 hover:border-gray-400"
                                                    : isHighlighted
                                                    ? "bg-primary-200 hover:bg-primary-300"
                                                    : "hover:bg-primary-100"
                                            } transition-all duration-200`}
                                            key={day + "-" + i}
                                        >
                                            {isFreeLecture ? (
                                                <p className="text-sm font-medium text-gray-400">
                                                    Free Lecture
                                                </p>
                                            ) : (
                                                <div
                                                    className={`${
                                                        isHighlighted
                                                            ? "font-medium"
                                                            : ""
                                                    }`}
                                                >
                                                    <SubjectSlot
                                                        data={subObj}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    );
                                }
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
