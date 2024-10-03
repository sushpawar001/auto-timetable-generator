import { useMemo, useState, useEffect } from "react";
import { Column } from "@tanstack/react-table";
import { FaSearch } from "react-icons/fa";

export default function FilterInput({
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
