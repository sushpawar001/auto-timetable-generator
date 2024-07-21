import axios from "axios";
import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target?.result as string;
                readString(csvData, {
                    header: true,
                    complete: (results) => {
                        // setJsonData(results.data as JsonResult[]);
                        const filteredData = results.data.filter((row) =>
                            Object.values(row).some(
                                (value) => value !== null && value !== ""
                            )
                        );
                        setJsonData(filteredData as JsonResult[]);
                    },
                });
            };
            reader.readAsText(file);
        }
    };

    const handleUpload = async () => {
        if (jsonData) {
            try {
                const response = await axios.post(
                    `${apiUrl}/subjects/upload-csv`,
                    jsonData,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    console.log("Data uploaded successfully");
                    toast.success("Data uploaded successfully!");
                    navigate("/subjects");
                } else {
                    console.error(
                        "Error uploading data: ",
                        response.statusText
                    );
                    toast.error("Error uploading data: " + response.statusText);
                }
            } catch (error) {
                console.error("Error uploading data: ", error);
            }
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
        <div
            className={`py-10 px-5 flex flex-col h-full justify-center rounded-2xl shadow-lg bg-white`}
        >
            <div className="text-center mb-3">
                <h2 className="text-3xl font-bold mb-1.5 font-custom text-primary-950">
                    Upload Data
                </h2>
                <p className="">Please upload data in .csv or .xlsx format</p>
                <p className="">
                    Note: Uploading data will delete all existing data
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
                <div className="mt-4 h-full overflow-y-auto pr-2">
                    <div>
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="border border-slate-300 p-1 text-center font-bold bg-primary-700 text-white h-10 font-custom"
                                            >
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
                                        {row
                                            .getVisibleCells()
                                            .map((cell, index) => (
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
                                                        cell.column.columnDef
                                                            .cell,
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
