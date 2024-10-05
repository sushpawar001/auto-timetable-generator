import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    flexRender,
    getFilteredRowModel,
    ColumnFiltersState,
    getFacetedRowModel,
    getFacetedUniqueValues,
} from "@tanstack/react-table";
import { LuPenSquare, LuTrash2, LuRotateCcw } from "react-icons/lu";

import ToolTip from "../components/ToolTip";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { Subject } from "../types/subjectType";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FilterInput from "../components/FilterInput";

const columnHelper = createColumnHelper<Subject>();

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const navigate = useNavigate();
    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row._id, {
                id: "ID",
                cell: (info) => info.getValue().slice(-4),
                header: "ID",
            }),
            columnHelper.accessor("subject", {
                header: () => "Subject",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("professor", {
                header: "Professor",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("department", {
                header: "Department",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("college_year", {
                header: "College Year",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("subject_type", {
                header: "Subject Type",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("workload", {
                header: "Workload",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_id", {
                header: "Action",
                cell: ({ cell }) => (
                    <div className="flex justify-center items-center  text-sm gap-2">
                        <button
                            className="border border-red-500 p-1 text-red-500 rounded-md hover:bg-red-600 hover:text-white duration-300"
                            onClick={() => {
                                console.log(cell.row.original._id);
                                deleteSubject(cell.row.original._id);
                            }}
                        >
                            <LuTrash2 className="w-4 h-4" />
                        </button>
                        <button
                            className="border border-primary-700 p-1 text-primary-700 rounded-md hover:bg-primary-600 hover:text-white duration-300"
                            value={cell.getValue()}
                            onClick={() => {
                                editSubject(cell.row.original._id);
                            }}
                        >
                            <LuPenSquare className="w-4 h-4" />
                        </button>
                    </div>
                ),
            }),
        ],
        []
    );
    const table = useReactTable({
        data: subjects,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            columnFilters,
        },
    });

    useEffect(() => {
        const getSubjects = async () => {
            const response = await axios.get(
                "http://localhost:8000/subjects/get",
                { withCredentials: true }
            );
            console.log(response.data);
            setSubjects(response.data.data);
        };
        getSubjects();
    }, []);

    const deleteSubject = async (id: string) => {
        console.log(id);
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/subjects/delete/${id}`,
                { withCredentials: true }
            );
            if (response.status === 200) {
                setSubjects((subjects) =>
                    subjects.filter((subject) => subject._id !== id)
                );
                toast.success("Subject deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Error deleting data: " + error);
        }
    };

    const deleteAllData = async () => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/subjects/delete-all`,
                { withCredentials: true }
            );
            if (response.status === 200) {
                setSubjects([]);
                toast.success("All subjects deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Error deleting data: " + error);
        }
    };

    const editSubject = (id: string) => {
        navigate(`/subjects/edit/${id}`);
    };

    return (
        <div className="h-full gap-3 flex flex-col">
            <div className="flex flex-grow gap-2.5">
                <div className="bg-white rounded-md w-1/4 flex items-center p-1.5 shadow-md">
                    <h1 className="text-2xl font-bold pl-4 text-primary-950 font-custom">
                        Subjects
                    </h1>
                </div>
                <div className="bg-white rounded-md flex items-center justify-center p-1.5 shadow-md text-center">
                    <h3 className="text-sm">
                        Total Subjects:{" "}
                        <span className="font-bold">{subjects.length}</span>
                    </h3>
                </div>
                <FilterInput column={table.getColumn("subject")!} />
                <FilterInput
                    column={table.getColumn("department")!}
                    filterVariant="select"
                    placeholder="Select Department"
                />
                <FilterInput
                    column={table.getColumn("college_year")!}
                    filterVariant="select"
                    placeholder="Select College Year"
                />
                <FilterInput
                    column={table.getColumn("subject_type")!}
                    filterVariant="select"
                    placeholder="Select Subject Type"
                />
                <div className="bg-secondary rounded-md flex justify-center items-center p-1 shadow-md aspect-square border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 duration-300 cursor-pointer hover:scale-105 relative group">
                    <LuRotateCcw className="w-6 h-6" />
                    <ToolTip
                        content={
                            <span className="text-sm">Clear All Filters</span>
                        }
                    />
                </div>
                <div
                    className="bg-red-500 rounded-md flex flex-col justify-center items-center p-1 shadow-md aspect-square text-sm hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-105 group relative text-center"
                    onClick={() => {
                        const modal = document.getElementById(
                            "my_modal_1"
                        ) as HTMLDialogElement | null;
                        modal?.showModal();
                    }}
                >
                    <LuTrash2 className="w-6 h-6 text-white" />
                    <ToolTip
                        content={
                            <span className="text-sm">
                                Delete
                                <br />
                                All Subjects
                            </span>
                        }
                    />
                </div>
            </div>
            <div className="p-5 h-full bg-white rounded-md shadow-lg overflow-y-auto">
                <div className="h-full overflow-y-auto pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                    <div>
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => {
                                    return (
                                        <tr
                                            key={headerGroup.id}
                                            className="divide-x divide-gray-300"
                                        >
                                            {headerGroup.headers.map(
                                                (header) => {
                                                    return (
                                                        <th
                                                            key={header.id}
                                                            className="p-1 px-1.5 text-center font-bold bg-gray-500 text-white h-10 font-custom"
                                                        >
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header
                                                                          .column
                                                                          .columnDef
                                                                          .header,
                                                                      header.getContext()
                                                                  )}
                                                        </th>
                                                    );
                                                }
                                            )}
                                        </tr>
                                    );
                                })}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-primary-100"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell, index) => {
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className={`border border-gray-400 p-1 px-2 ${
                                                                index ===
                                                                row.getVisibleCells()
                                                                    .length -
                                                                    1
                                                                    ? ""
                                                                    : "hover:border-primary-600 hover:border-2"
                                                            }`}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal deleteFunction={deleteAllData} />
        </div>
    );
}
