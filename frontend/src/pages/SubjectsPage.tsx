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
    Column,
} from "@tanstack/react-table";
import { FaSearch, FaEdit } from "react-icons/fa";
import { FaDeleteLeft, FaTrashCan } from "react-icons/fa6";
import ToolTip from "../components/ToolTip";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { Subject } from "../types/subjectType";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


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
                            <FaTrashCan className="w-4 h-4" />
                        </button>
                        <button
                            className="border border-primary-700 p-1 text-primary-700 rounded-md hover:bg-primary-600 hover:text-white duration-300"
                            value={cell.getValue()}
                            onClick={() => {
                                editSubject(cell.row.original._id);
                            }}
                        >
                            <FaEdit className="w-4 h-4" />
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
            <div className="flex flex-grow gap-3">
                <div className="bg-primary-700 rounded-md w-1/4 flex items-center p-1.5 shadow-md">
                    <h1 className="text-2xl font-bold pl-4 text-white font-custom">
                        Subjects
                    </h1>
                </div>
                <div className="border-2 border-primary-700 rounded-full flex items-center justify-center p-1.5 shadow-md text-center">
                    <h3 className="font-semibold text-primary-700 font-custom text-sm">
                        Total Subjects:{" "}
                        <span className="font-bold">{subjects.length}</span>
                    </h3>
                </div>
                <Filter column={table.getColumn("subject")!} />
                <Filter
                    column={table.getColumn("department")!}
                    filterVariant="select"
                    placeholder="Select Department"
                />
                <Filter
                    column={table.getColumn("college_year")!}
                    filterVariant="select"
                    placeholder="Select College Year"
                />
                <Filter
                    column={table.getColumn("subject_type")!}
                    filterVariant="select"
                    placeholder="Select Subject Type"
                />
                <div className="bg-secondary rounded-md flex justify-center items-center p-1 shadow-md aspect-square border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 duration-300 cursor-pointer hover:scale-105 relative group">
                    <FaDeleteLeft className="w-6 h-6" />
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
                    <FaTrashCan className="w-5 h-5 text-white" />
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
            <div className="p-5 h-[90%] bg-white rounded-md shadow-lg">
                <div className="h-full overflow-y-auto pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                    <div>
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => {
                                    return (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(
                                                (header) => {
                                                    return (
                                                        <th
                                                            key={header.id}
                                                            className="border border-slate-300 p-1 px-1.5 text-center font-bold bg-primary-700 text-white h-10 font-custom sticky -top-0.5"
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
                                                            className={`border border-primary-300 p-1 px-2 ${
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

function Filter({
    column,
    filterVariant = "",
    placeholder = "Select",
}: {
    column: Column<any, unknown>;
    filterVariant?: string;
    placeholder?: string;
}) {
    const columnFilterValue = column.getFilterValue();
    const sortedUniqueValues = useMemo(
        () =>
            Array.from(column.getFacetedUniqueValues().keys())
                .sort()
                .slice(0, 5000),
        [column.getFacetedUniqueValues(), filterVariant]
    );

    return filterVariant === "select" ? (
        <div className="bg-secondary rounded-md flex items-center p-1.5 shadow-md w-1/6">
            <select
                onChange={(e) => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
            >
                <option value="">{placeholder}</option>
                {sortedUniqueValues.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    ) : (
        <DebouncedInput
            onChange={(value) => column.setFilterValue(value)}
            type="text"
            value={(columnFilterValue ?? "") as string}
        />
    );
}

function DebouncedInput({
    value: initialValue,
    onChange,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, 300);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="bg-secondary rounded-md flex items-center p-1.5 shadow-md w-1/6">
            <div className="relative h-full w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-600">
                    <FaSearch className="w-4 h-4" />
                </div>
                <input
                    type="text"
                    name="password"
                    className="bg-primary-50 border border-gray-300 text-primary-950 text-sm rounded-md block w-full ps-10 p-2.5 h-full outline-none focus:ring-2 ring-primary placeholder:text-primary-950/40"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                />
            </div>
        </div>
    );
}
