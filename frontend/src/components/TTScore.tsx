import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Label } from "recharts";
import axios from "axios";

type chartDataType = {
    name: string;
    value: number;
    fill: string;
};

type TTScoreProps = {
    Score: {
        empty_lecs: number;
        total_lecs: number;
        tt_score: number;
    };
};

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function TTScore({ Score }: TTScoreProps) {
    const { empty_lecs, total_lecs, tt_score } = Score;
    const [chartData, setChartData] = useState<chartDataType[]>([]);

    useEffect(() => {
        setChartData([
            { name: "Empty Slots", value: empty_lecs, fill: "#e0f2fe" },
            {
                name: "Filled Slots",
                value: total_lecs - empty_lecs,
                fill: "#0ea5e9",
            },
        ]);
    }, [empty_lecs, total_lecs, tt_score]);

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
                                value={`${tt_score}%`}
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
