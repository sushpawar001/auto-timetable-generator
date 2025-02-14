import axios from "axios";
import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LuUploadCloud, LuAlertCircle } from "react-icons/lu";

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

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function UploadDataComponent() {
    const [jsonData, setJsonData] = useState<JsonResult[] | null>(null);
    const { readString } = usePapaParse();
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [data, setData] = useState(() => []);

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
                        const requiredColumns = [
                            "subject",
                            "professor",
                            "department",
                            "college_year",
                            "subject_type",
                            "workload",
                        ];
                        const requiredColumnsExist = results.meta.fields.every(
                            (column) => requiredColumns.includes(column)
                        );
                        if (!requiredColumnsExist) {
                            toast.error(
                                "File must contain the following columns: " +
                                    requiredColumns.join(", ")
                            );
                            return;
                        }

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

            setIsFileSelected(true);
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
    }, [jsonData]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div
            className={`col-span-1 lg:col-span-2 py-5 flex flex-col h-full justify-center rounded-md shadow-md bg-white`}
        >
            <div className="mb-3 text-center">
                <h2 className="~text-base/2xl font-bold text-primary-950 font-custom mb-1.5">
                    Upload Data
                </h2>
                <p className="~text-xs/sm mb-0.5">
                    Please upload data in .csv or .xlsx format
                </p>
                <div className="flex items-center justify-center gap-1 text-center text-gray-600">
                    <LuAlertCircle className="text-sm" />
                    <p className="~text-xs/sm">
                        Uploading data will replace all existing data
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-4/5 h-48 border-2 border-dashed rounded-md cursor-pointer lg:w-2/3 border-primary/90 bg-primary/20 hover:bg-primary/30"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <LuUploadCloud className="w-8 h-8 mb-4" />
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
                    className={`${
                        isFileSelected
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
                    }  p-2 mt-4 rounded-md w-4/5 lg:w-2/3`}
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </div>
            {jsonData ? (
                <div className="h-full px-2 mt-4 overflow-y-auto">
                    <div className="h-20">
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id}
                                        className="divide-x divide-gray-300"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="p-1 ~px-1/2 text-center ~text-xs/sm font-bold bg-gray-500 text-white h-10 font-custom leading-tight"
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
                                    <tr
                                        key={row.id}
                                        className="hover:bg-primary-100"
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell, index) => (
                                                <td
                                                    key={cell.id}
                                                    className={`border border-gray-400 p-1 px-2 ~text-xs/sm ${
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
