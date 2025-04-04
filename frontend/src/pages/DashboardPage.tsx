import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
    return (
        <div className="bg-primary-200">
            <div className="flex h-screen mx-auto">
                <Navbar />
                <div className="h-full w-full md:w-10/12 rounded-2xl ~p-4/8">
                    <div className="h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
