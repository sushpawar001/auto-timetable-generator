import { NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import NavLinksComponent from "./NavLinksComponent";

export default function Navbar() {
    // bg-zinc-900
    return (
        <div className="h-full bg-white hidden md:flex flex-col text-neutral-950 ~px-1.5/5 w-2/12 ~p-5/10 font-custom shadow-md">
            <div className="~mb-5/10 ~text-lg/2xl p-1 pt-2.5 font-bold">
                <p>Timetable App</p>
            </div>
            <NavLinksComponent />
            <button className="bg-white border-primary border rounded p-1.5 text-primary w-full flex mt-auto space-x-3 items-center justify-center hover:bg-primary hover:text-white duration-500">
                <span className="~text-base/xl">
                    <LuLogOut />
                </span>
                <span className="~text-sm/lg">Logout</span>
            </button>
        </div>
    );
}
