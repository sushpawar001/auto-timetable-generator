import axios from "axios";
import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface JsonResult {
    [key: string]: string | number | boolean | null;
}

interface TableData {
    subject: string;
    professor: string;
    department: string;
    college_year: string;
    subject_type: string;
    workload: number;
}

const defaultData: TableData[] = [
    {
        subject: "Business Communication �I (BC-I)",
        professor: "Ellen Ripley",
        department: "BAF",
        college_year: "FY",
        subject_type: "Theory",
        workload: 4,
    },
    {
        subject: "Business Envt.-I (Commerce-I)",
        professor: "Hermione Granger",
        department: "BAF",
        college_year: "FY",
        subject_type: "Theory",
        workload: 4,
    },
    {
        subject: "Business Economics-I (B.Eco-I)",
        professor: "Marty McFly",
        department: "BAF",
        college_year: "FY",
        subject_type: "Theory",
        workload: 4,
    },
];

const columnHelper = createColumnHelper<TableData>();

const columns = [
    columnHelper.accessor("subject", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "Subject",
    }),
    columnHelper.accessor("professor", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "Professor",
    }),
    columnHelper.accessor("department", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "Department",
    }),
    columnHelper.accessor("college_year", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "College Year",
    }),
    columnHelper.accessor("subject_type", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "Subject Type",
    }),
    columnHelper.accessor("workload", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: () => "Workload",
    }),
];
const ColHeaders = [
    "Subject",
    "Professor",
    "Department",
    "College Year",
    "Subject Type",
    "Workload",
];
export default function UploadDataPage() {
    const [jsonData, setJsonData] = useState<JsonResult[] | null>(null);
    const { readString } = usePapaParse();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target?.result as string;
                readString(csvData, {
                    header: true,
                    complete: (results) => {
                        setJsonData(results.data as JsonResult[]);
                    },
                });
            };
            reader.readAsText(file);
        }
    };

    const handleUpload = async () => {
        if (jsonData) {
            console.log("jsonData", jsonData);
            const response = await axios.post(
                `${apiUrl}/timetable/upload-csv`,
                jsonData
            );
            console.log(response.data);
        }
    };

    useEffect(() => {
        if (jsonData) {
            console.log("jsonData", jsonData);
            setData(jsonData as TableData[]);
        }
    }, [apiUrl, jsonData]);

    const [data, setData] = useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={`py-10 px-5 flex flex-col h-full justify-center`}>
            <div className="text-center mb-3">
                <h2 className="text-3xl font-bold mb-1">Upload Data</h2>
                <p className="text-lg">
                    Please upload data in .csv or .xlsx format
                </p>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-3/5 h-48 border-2 border-primary/90 border-dashed rounded-lg cursor-pointer bg-primary/20 hover:bg-primary/30"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">CSV, XLSX only</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".csv, .xlsx"
                        onChange={handleFileChange}
                    />
                </label>
                <button
                    className="bg-primary text-white p-2 mt-4 rounded-lg w-3/5"
                    onClick={handleUpload}
                >
                    Submit
                </button>
            </div>

            {jsonData ? (
                <div className="mt-4 pr-2 overflow-y-scroll">
                    <div className="bg-green-200 border border-slate-600 rounded-lg">
                        <table>
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id}>
                                                {" "}
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="border-b border-slate-600 p-0.5 text-base"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
