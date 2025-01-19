import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Label } from "recharts";

type chartDataType = {
    name: string;
    value: number;
    fill: string;
};

export default function TTScore() {
    const [Score, setScore] = useState({
        empty_lecs: 0,
        total_lecs: 0,
        tt_score: 0,
    });
    const [chartData, setChartData] = useState<chartDataType[]>([]);

    useEffect(() => {
        const { empty_lecs, total_lecs, tt_score } = Score;
        setChartData([
            { name: "Empty Slots", value: empty_lecs, fill: "#e0f2fe" },
            {
                name: "Filled Slots",
                value: total_lecs - empty_lecs,
                fill: "#0ea5e9",
            },
        ]);
    }, [Score]);

    useEffect(() => {
        setScore({
            empty_lecs: 10,
            total_lecs: 100,
            tt_score: 90,
        });
    }, []);


    return (
        <div className="rounded-md shadow-md bg-white min-h-[40vh] md:min-h-0 h-full md:h-1/2 ~p-3/5 flex flex-col">
            <div className="flex flex-col items-center justify-center">
                <h2 className="~text-base/2xl font-bold text-primary-950 font-custom">
                    Timetable score
                </h2>
                <p className="~text-xs/sm text-gray-600 text-center">
                    Score based on your timetable in percentage
                </p>
            </div>
            <div className="h-full">
                <ResponsiveContainer width="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            strokeWidth={5}
                        >
                            <Label
                                value={`${Score.tt_score}%`}
                                position="center"
                                className="~text-base/2xl font-custom font-medium"
                                fill="#000"
                            />
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
