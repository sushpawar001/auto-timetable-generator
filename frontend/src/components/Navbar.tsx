import {
    FaBookReader,
    FaChalkboardTeacher,
    FaCloudUploadAlt,
    FaHome,
} from "react-icons/fa";
import { FaGear, FaRightFromBracket } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const routes = [
    {
        name: "Home",
        path: "/",
        icon: <FaHome />,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <IoPersonCircle />,
    },
    {
        name: "TimeTable",
        path: "/timetable",
        icon: <RiCalendarScheduleFill />,
    },
    {
        name: "Upload Data",
        path: "/upload-data",
        icon: <FaCloudUploadAlt />,
    },
    {
        name: "Teachers",
        path: "/teachers",
        icon: <FaChalkboardTeacher />,
    },
    {
        name: "Streams",
        path: "/streams",
        icon: <FaBookReader />,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <FaGear />,
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <FaRightFromBracket />,
    },
];

export default function Navbar() {
    return (
        <div className="h-full w-2/12 rounded-2xl bg-black flex flex-col justify-center text-white text-xl gap-4 pl-5">
            <div className="mb-10">
                <p>Logo here</p>
            </div>
            {routes.map((route) => (
                <NavLink
                    key={route.name}
                    to={route.path}
                    className="flex items-center gap-3 hover:text-primary"
                >
                    <span>{route.icon}</span>
                    <span>{route.name}</span>
                </NavLink>
            ))}
        </div>
    );
}
