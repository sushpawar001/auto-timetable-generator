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
import { FaSearch } from "react-icons/fa";
import { FaDeleteLeft, FaTrashCan  } from "react-icons/fa6";

interface Subject {
    _id: string;
    subject: string;
    professor: string;
    department: string;
    college_year: string;
    subject_type: string;
    workload: number;
    user_id: string;
}

const columnHelper = createColumnHelper<Subject>();

const columns = [
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
];

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: subjects,
        columns: columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        debugHeaders: true,
        debugColumns: true,
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

    return (
        <div className="h-full gap-3 flex flex-col">
            <div className="flex flex-grow gap-3">
                <div className="bg-primary-700 rounded-md w-1/4 flex items-center p-1.5 shadow-md">
                    <h1 className="text-2xl font-bold pl-4 text-white font-custom">
                        Subjects
                    </h1>
                </div>
                <Filter column={table.getColumn("subject")!} />
                <Filter
                    column={table.getColumn("department")!}
                    filterVariant="select"
                />
                <Filter
                    column={table.getColumn("college_year")!}
                    filterVariant="select"
                />
                <Filter
                    column={table.getColumn("subject_type")!}
                    filterVariant="select"
                />
                <div className="bg-secondary rounded-md flex justify-center items-center p-1 shadow-md aspect-square border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 duration-300 cursor-pointer hover:scale-105">
                    <FaDeleteLeft className="w-6 h-6" />
                </div>
                <div className="bg-red-500 rounded-md flex flex-col justify-center items-center p-1 shadow-md aspect-square text-sm hover:bg-red-600 hover:text-white duration-300 cursor-pointer hover:scale-105">
                    <FaTrashCan className="w-5 h-5 text-white" />
                </div>
            </div>
            <div className="p-5 h-[90%] bg-white rounded-md shadow-lg">
                <div className="h-full overflow-y-auto pr-2">
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
                                                            className="border border-slate-300 p-1 px-1.5 text-center font-bold bg-primary-700 text-white h-10 font-custom"
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
                                                .map((cell) => {
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className="border border-primary-300 p-1 px-2 hover:border-primary-600 hover:border-2"
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
        </div>
    );
}

function Filter({
    column,
    filterVariant = "",
}: {
    column: Column<any, unknown>;
    filterVariant?: string;
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
                <option value="">All</option>
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
