import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LuClock, LuCpu } from "react-icons/lu";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function GenerateTimetableCard() {
    const [algorithm, setAlgorithm] = useState("regular");
    const [isGenerating, setIsGenerating] = useState(false);

    const getTimetable = async () => {
        console.log(algorithm);
        setIsGenerating(true);
        if (algorithm === "regular") {
            const response = await axios.get(
                `${apiUrl}/timetable/generate_timetable`,
                { withCredentials: true }
            );
            console.log(response);
        } else {
            const response = await axios.get(
                `${apiUrl}/timetable/generate_ai_timetable`,
                { withCredentials: true }
            );
            console.log(response);
        }
        toast.success("Timetable generated successfully");
        setIsGenerating(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-md shadow-md min-h-[40vh] md:min-h-0 md:h-1/2">
            <div className="w-[90%]">
                <h2 className="~text-base/2xl font-bold text-primary-950 font-custom text-center">
                    Generate Timetable
                </h2>
                <p className="~text-xs/sm text-gray-600 ~mb-2/4 text-center">
                    Choose your preferred algorithm
                </p>

                <div className="space-y-2">
                    <div className="space-y-2">
                        <label
                            className={`flex items-center space-x-3 space-y-0 rounded-md border ~p-2/3 cursor-pointer hover:bg-gray-50 ${
                                algorithm === "regular"
                                    ? "bg-gray-50 border-gray-200"
                                    : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="algorithm"
                                value="regular"
                                checked={algorithm === "regular"}
                                onChange={() => setAlgorithm("regular")}
                                className="text-blue-600 form-radio"
                            />
                            <div className="flex-1 space-y-1">
                                <p className="font-medium leading-none flex items-center ~text-sm/base">
                                    Regular Algorithm
                                    <span className="relative ml-2 group">
                                        <LuClock className="w-4 h-4 text-gray-400" />
                                        <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-800 rounded-md opacity-0 left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
                                            Faster, more predictable results
                                        </span>
                                    </span>
                                </p>
                                <p className="~text-xs/sm text-gray-600">
                                    Optimized for speed and consistency
                                </p>
                            </div>
                        </label>
                        <label
                            className={`flex items-center space-x-3 space-y-0 rounded-md border ~p-2/3 cursor-pointer hover:bg-gray-50 ${
                                algorithm === "ai"
                                    ? "bg-gray-50 border-gray-200"
                                    : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="algorithm"
                                value="ai"
                                checked={algorithm === "ai"}
                                onChange={() => setAlgorithm("ai")}
                                className="text-blue-600 form-radio"
                            />
                            <div className="flex-1 space-y-1">
                                <p className="font-medium leading-none flex items-center ~text-sm/base">
                                    AI Algorithm
                                    <span className="relative ml-2 group">
                                        <LuCpu className="w-4 h-4 text-gray-400" />
                                        <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-800 rounded-md opacity-0 left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
                                            Slower, but may produce better
                                            results
                                        </span>
                                    </span>
                                </p>
                                <p className="~text-xs/sm text-gray-600">
                                    Uses AI for optimization
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="~mt-2/4 w-[90%]">
                <button
                    className={`w-full p-2 rounded-md flex items-center justify-center gap-2 ${
                        isGenerating
                            ? "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
                            : "bg-primary text-white"
                    }`}
                    onClick={getTimetable}
                >
                    {isGenerating ? (
                        <div className="flex items-center justify-center gap-3">
                            <p>AI is doing its magic</p>
                            <span className="loading loading-dots loading-md"></span>
                        </div>
                    ) : (
                        "Generate Timetables"
                    )}
                </button>
            </div>
        </div>
    );
}
