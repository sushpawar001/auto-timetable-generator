import { NavLink } from "react-router-dom";
import {
    LuCalendarDays,
    LuHome,
    LuLogOut,
    LuSettings,
    LuUpload,
    LuUser,
    LuUsers,
    LuBookMarked,
} from "react-icons/lu";

const routes = [
    {
        name: "Home",
        path: "/",
        icon: <LuHome />,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <LuUser />,
    },
    {
        name: "TimeTable",
        path: "/timetable",
        icon: <LuCalendarDays />,
    },
    {
        name: "Upload Data",
        path: "/upload-data",
        icon: <LuUpload />,
    },
    {
        name: "Professors",
        path: "/professors",
        icon: <LuUsers />,
    },
    {
        name: "Subjects",
        path: "/subjects",
        icon: <LuBookMarked />,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <LuSettings />,
    },
];

export default function Navbar() {
    // bg-zinc-900
    return (
        <div className="h-full bg-white flex flex-col text-neutral-950 ~px-1.5/5 w-2/12 ~p-5/10 font-custom shadow-md">
            <div className="~mb-5/10 ~text-lg/2xl p-1 pt-2.5 font-bold">
                <p>Timetable App</p>
            </div>
            <nav className="~space-y-1/2">
                {routes.map((route) => (
                    <NavLink
                        key={route.name}
                        to={route.path}
                        className="flex ~space-x-1.5/3 hover:bg-primary-100 rounded ~p-1/1.5 pl-2 duration-300 items-center text-gray-800"
                    >
                        <span className="~text-base/xl">{route.icon}</span>
                        <span className="~text-sm/lg">{route.name}</span>
                    </NavLink>
                ))}
            </nav>
            <button className="bg-white border-primary border rounded p-1.5 text-primary w-full flex mt-auto space-x-3 items-center justify-center hover:bg-primary hover:text-white duration-500">
                <span className="~text-base/xl">
                    <LuLogOut />
                </span>
                <span className="~text-sm/lg">Logout</span>
            </button>
        </div>
    );
}
