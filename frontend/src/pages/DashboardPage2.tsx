import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardPage2() {
    return (
        <div className="bg-primary-200">
            <div className="flex h-screen mx-auto">
                <Navbar />
                <MobileNav>
                    <div className="h-full w-full rounded-2xl ~p-4/8">
                        <div className="h-full">
                            <Outlet />
                        </div>
                    </div>
                </MobileNav>
            </div>
        </div>
    );
}
