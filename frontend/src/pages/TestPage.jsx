
export default function TestPage() {
    return (
        <div className="container mx-auto p-4 rounded-t-3xl">
            <div className="overflow-y-auto max-h-96 pr-2 rounded-t-3xl">
                <table className="min-w-full border-collapse table-fixed rounded-t-3xl">
                    <thead className="bg-gray-200 sticky top-0 rounded-t-3xl">
                        <tr>
                            <th className="w-1/4 px-4 py-2">Header 1</th>
                            <th className="w-1/4 px-4 py-2">Header 2</th>
                            <th className="w-1/4 px-4 py-2">Header 3</th>
                            <th className="w-1/4 px-4 py-2">Header 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">
                                    Row {index + 1} Cell 1
                                </td>
                                <td className="border px-4 py-2">
                                    Row {index + 1} Cell 2
                                </td>
                                <td className="border px-4 py-2">
                                    Row {index + 1} Cell 3
                                </td>
                                <td className="border px-4 py-2">
                                    Row {index + 1} Cell 4
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
