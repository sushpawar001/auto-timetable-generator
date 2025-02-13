import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import userUserStore from "../utils/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardPage2() {
    const navigate = useNavigate();
    const setUserId = userUserStore((state) => state.setUserId);
    const userId = userUserStore((state) => state.userId);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/check-auth`,
                    { withCredentials: true }
                );
                if (response.data.status === "authenticated") {
                    setUserId(response.data.user_id);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.log("Check auth error: ", error);
                navigate("/login");
            }
        };
        checkAuth();
    }, [userId]);
    return (
        <div className="bg-primary-200">
            <div className="flex min-h-screen md:h-screen mx-auto">
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
