import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="bg-primary flex justify-center items-center h-screen p-5 md:p-0">
            <Outlet />
        </div>
    );
}
