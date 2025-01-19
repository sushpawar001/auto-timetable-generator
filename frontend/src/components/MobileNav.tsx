import React, { ReactNode } from "react";
import NavLinksComponent from "./NavLinksComponent";
import { LuLogOut } from "react-icons/lu";

export default function MobileNav({ children }: { children: ReactNode }) {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col w-full">
                {/* Navbar */}
                <div className="navbar bg-white shadow-md w-full md:hidden">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    {/* <div className="mx-2 flex-1 px-2">Navbar Title</div> */}
                    <div className="mx-2 flex-1 px-2 ~text-lg/2xl font-bold">
                        <p>Timetable App</p>
                    </div>
                    <div className="hidden flex-none lg:block">
                        <NavLinksComponent />
                    </div>
                </div>
                <div className="w-full h-screen">{children}</div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu bg-white min-h-full w-1/2 p-4">
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
            </div>
        </div>
    );
}
