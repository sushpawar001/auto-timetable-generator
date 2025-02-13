import axios from "axios";
import { useEffect, useState } from "react";

export interface UserType {
    status: string;
    user_id: string;
    email: string;
    subjects_count: number;
}

export default function HomePage() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/get-user`,
                { withCredentials: true }
            );
            console.log(response);
            setUser(response.data);
        };
        fetchUser();
    }, []);

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="w-full flex gap-3">
                <div className="bg-secondary rounded-md w-full flex items-center p-1.5 shadow-md">
                    <h1 className="~text-base/xl font-bold pl-2 text-primary-950 font-custom">
                        Profile
                    </h1>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3">
                <div className="bg-secondary rounded-md p-2.5 shadow-md h-1/2">
                
                    <p className="~text-xs/sm font-medium">
                        User ID: {user?.user_id}
                    </p>
                    <p className="~text-xs/sm text-gray-600 mt-0.5">
                        Email: {user?.email}
                    </p>
                    <p className="~text-xs/sm text-gray-600 mt-0.5">
                        Total Subjects: {user?.subjects_count}
                    </p>
                </div>
            </div>
        </div>
    );
}
