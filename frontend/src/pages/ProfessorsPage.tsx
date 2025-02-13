import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";


type subjectType = {
    subject: string;
    subtype: string;
    department: string;
};

function getSlots(number_of_lectures: number): number[] {
    const slots = Array.from({ length: number_of_lectures }, (_, i) => i);
    return slots;
}

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

export default function ProfessorsPage() {
    const [professors, setProfessors] = useState<string[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useState<string>("");
    const [timeTable, setTimeTable] = useState(null);
    const [filteredTimeTable, setFilteredTimeTable] = useState(null);

    const [numberOfLectures, setNumberOfLectures] = useState(0);
    const [slots, setSlots] = useState<number[]>([]);

    const getProfessorsTimeTable = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/professors/timetable`,
                { withCredentials: true }
            );
            if (!response.data) {
                throw new Error("No data received from server");
            }
            const { timetable_data, number_of_lectures } = response.data;
            if (!timetable_data || !number_of_lectures) {
                throw new Error("Missing data in response");
            }
            setTimeTable(timetable_data);
            setNumberOfLectures(number_of_lectures);
            const professors = Object.keys(timetable_data).sort();
            if (professors.length === 0) {
                throw new Error("No professors found in response");
            }
            setProfessors(professors);
            setSelectedProfessor(professors[0]);
        } catch (error) {
            console.error(error);
            // toast.error(error.response.data.detail);
        }
    };

    useEffect(() => {
        getProfessorsTimeTable();
    }, []);

    useEffect(() => {
        if (selectedProfessor !== "") {
            setFilteredTimeTable(timeTable[selectedProfessor]);
        }
    }, [selectedProfessor, timeTable]);

    useEffect(() => {
        setSlots(getSlots(numberOfLectures));
    }, [numberOfLectures]);

    return (
        <div className="h-full gap-3 flex flex-col">
            <div className="flex flex-grow gap-3">
                <div className="bg-white rounded-md w-1/4 flex items-center p-1.5 shadow-md">
                    <h1 className="~text-base/xl font-bold pl-2 text-primary-950 font-custom">
                        Professors
                    </h1>
                </div>
                <div className="flex w-1/3 bg-secondary ~p-1/1.5 rounded-md shadow-md">
                    <p className="~text-xs/sm my-auto w-3/5 text-center">
                        Select Professor:
                    </p>
                    <select
                        className="border border-stone-300 p-2 rounded-md w-full ml-1"
                        onChange={(e) => setSelectedProfessor(e.target.value)}
                    >
                        {professors.map((professor) => (
                            <option key={professor} value={professor}>
                                {professor}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="bg-secondary ~p-2.5/4 rounded-md flex flex-col items-center h-full shadow-lg overflow-y-auto">
                <div className="w-full h-full">
                    {filteredTimeTable ? (
                        <table className="w-full h-full table-fixed">
                            <thead>
                                <tr className="divide-x divide-gray-300">
                                    {days.map((day) => {
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
                                {slots.map((lecNum) => {
                                    return (
                                        <tr key={lecNum}>
                                            {days.map((day) => {
                                                const isFreeLec =
                                                    filteredTimeTable[day][
                                                        lecNum
                                                    ]
                                                        ? false
                                                        : true;
                                                return (
                                                    <td
                                                        key={day + lecNum}
                                                        className={`border border-gray-400 ~p-0.5/1 text-center hover:border-2 text-sm h-1/${
                                                            slots.length
                                                        } ${
                                                            isFreeLec
                                                                ? "bg-gray-100 hover:border-gray-400"
                                                                : "hover:bg-primary-100 hover:border-primary-700 hover:text-primary-900"
                                                        }`}
                                                    >
                                                        {filteredTimeTable[day][
                                                            lecNum
                                                        ] ? (
                                                            <ProfSlot
                                                                data={
                                                                    filteredTimeTable[
                                                                        day
                                                                    ][lecNum]
                                                                }
                                                            />
                                                        ) : (
                                                            <p className="text-sm font-medium text-gray-400">
                                                                Free Lecture
                                                            </p>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">You have not created a timetable</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ProfSlot({ data }: { data: subjectType }) {
    return (
        <>
            <p className="~text-xs/sm font-medium">{data.subject}</p>
            <p className="~text-xs/sm text-gray-600 mt-0.5">{data.department}</p>
            <p className="text-xs text-gray-600">({data.subtype})</p>
        </>
    );
}
