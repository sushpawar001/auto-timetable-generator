import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
    return (
        <div className="bg-primary">
            <div className="flex h-screen gap-5 py-10 px-5 max-w-screen-xl mx-auto">
                <Navbar />
                <div className="h-full w-10/12">
                    <div className="h-full rounded-2xl bg-secondary shadow-lg">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
