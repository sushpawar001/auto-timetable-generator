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
        name: "Subjects",
        path: "/subjects",
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
    // bg-zinc-900
    return (
        <div className="h-full bg-neutral-950 flex flex-col text-white text-xl gap-4 px-5 w-2/12 p-10 font-custom">
            <div className="mb-10 text-2xl p-1 pt-2.5 font-bold text-primary-100">
                <p>Timetable App</p>
            </div>
            {routes.map((route) => (
                <NavLink
                    key={route.name}
                    to={route.path}
                    className="flex items-center gap-3 hover:bg-primary rounded p-1 pl-2 duration-300"
                >
                    <span>{route.icon}</span>
                    <span>{route.name}</span>
                </NavLink>
            ))}
        </div>
    );
}
