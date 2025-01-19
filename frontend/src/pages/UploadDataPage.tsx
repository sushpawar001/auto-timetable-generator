import GenerateTimetableCard from "../components/GenerateTimetableCard";
import TTScore from "../components/TTScore";
import UploadDataComponent from "../components/UploadDataComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function UploadDataPage() {
    const [Score, setScore] = useState({
        empty_lecs: 0,
        total_lecs: 0,
        tt_score: 0,
    });

    useEffect(() => {
        const getScore = async () => {
            const response = await axios.get(
                `${apiUrl}/timetable/get_timetable_score`,
                { withCredentials: true }
            );
            console.log(response.data);
            setScore(response.data);
        };
        getScore();
    }, []);

    return (
        <div className="flex h-full md:overflow-hidden">
            <div className="grid w-full h-full gap-3 md:grid-cols-2 lg:grid-cols-3">
                <UploadDataComponent />
                <div className="flex flex-col h-full gap-3">
                    <TTScore Score={Score} />
                    <GenerateTimetableCard />
                </div>
            </div>
        </div>
    );
}
