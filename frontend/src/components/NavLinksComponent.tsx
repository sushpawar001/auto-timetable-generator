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
    LuBuilding2,
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
        name: "Departments",
        path: "/departments",
        icon: <LuBuilding2 />,
    },
];

export default function NavLinksComponent() {
    return (
        <nav className="space-y-3 md:~space-y-1/2">
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
    );
}
