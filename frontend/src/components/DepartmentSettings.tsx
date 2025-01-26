import React, { useEffect, useState } from "react";
import { DepartmentSettingsType } from "../types/departmentType";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-hot-toast";

type DepartmentSettingsProps = {
    departmentSettings: DepartmentSettingsType;
};
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function DepartmentSettings({
    departmentSettings,
}: DepartmentSettingsProps) {
    const [department, setDepartment] = useState(departmentSettings.department);
    const [startTime, setStartTime] = useState(departmentSettings.start_time);
    const [endTime, setEndTime] = useState(departmentSettings.end_time);
    const [minutesLecture, setMinutesLecture] = useState(
        departmentSettings.minutes_lecture
    );
    const [practicalSlots, setPracticalSlots] = useState(
        departmentSettings.practical_slots
    );

    const [practicalSlotsOptions, setPracticalSlotsOptions] = useState<any[]>(
        []
    );

    useEffect(() => {
        setDepartment(departmentSettings.department);
        setStartTime(departmentSettings.start_time);
        setEndTime(departmentSettings.end_time);
        setMinutesLecture(departmentSettings.minutes_lecture);
        setPracticalSlots(departmentSettings.practical_slots);
    }, [departmentSettings]);

    useEffect(() => {
        const getPractSlots = () => {
            const [startHour, startMinute] = startTime.split(":").map(Number);
            const [endHour, endMinute] = endTime.split(":").map(Number);

            const start = new Date();
            start.setHours(startHour, startMinute, 0, 0);

            const end = new Date();
            end.setHours(endHour, endMinute, 0, 0);

            const totalMinutes = (end.getTime() - start.getTime()) / 60000;
            const practicalSlots = Math.floor(totalMinutes / minutesLecture);
            setPracticalSlotsOptions(
                Array.from({ length: practicalSlots }, (_, i) => ({
                    value: i.toString(),
                    label: i + 1,
                }))
            );
        };
        getPractSlots();
    }, [startTime, endTime, minutesLecture, practicalSlots]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            department_id: departmentSettings._id,
            department: department,
            start_time: startTime,
            end_time: endTime,
            minutes_lecture: minutesLecture,
            practical_slots: practicalSlots,
            user_id: departmentSettings.user_id,
        };
        try {
            const response = await axios.post(
                `${apiUrl}/departments/update`,
                data,
                {
                    withCredentials: true,
                }
            );
            toast.success("Department settings updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update department settings");
        }
    };

    return (
        <form
            className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl p-5 my-auto"
            onSubmit={handleSubmit}
        >
            <h3 className="text-lg font-semibold">
                {department} Department Settings
            </h3>
            <div className="grid gap-4 w-full md:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Start Time
                    </label>
                    <input
                        type="time"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        End Time
                    </label>
                    <input
                        type="time"
                        placeholder="End Time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Minutes per Lecture
                    </label>
                    <input
                        type="number"
                        placeholder="Minutes per Lecture"
                        value={minutesLecture}
                        onChange={(e) =>
                            setMinutesLecture(parseInt(e.target.value))
                        }
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Practical Slots
                    </label>
                    <Select
                        options={practicalSlotsOptions}
                        value={practicalSlots.map((slot) => ({
                            value: slot,
                            label: (parseInt(slot) + 1).toString(),
                        }))}
                        isMulti
                        classNames={{
                            control: (state) =>
                                "input input-bordered !rounded-lg",
                        }}
                        onChange={(e) =>
                            setPracticalSlots(e.map((item) => item.value))
                        }
                    />
                    <p className="text-xs text-gray-500">
                        Select lectures that can be used for practicals
                    </p>
                </div>
            </div>
            <div className="w-full space-y-2 flex flex-col items-center justify-center">
                <button
                    type="submit"
                    className="bg-primary text-white p-2 rounded-md w-full"
                >
                    Save Settings
                </button>
                <p className="text-xs text-gray-500 text-center">
                    With current settings, you can have{" "}
                    {practicalSlotsOptions.length} lectures
                </p>
            </div>
        </form>
    );
}
