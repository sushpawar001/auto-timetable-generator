'use client'

import React, { useState } from 'react'
import Papa from 'papaparse'

export default function CSVUploaderCard() {
  const [csvData, setCSVData] = useState<string[][]>([])
  const [fileName, setFileName] = useState<string>('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      Papa.parse(file, {
        complete: (result) => {
          setCSVData(result.data as string[][])
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">CSV File Uploader</h1>
          <div className="mb-6">
            <label
              htmlFor="csv-upload"
              className="flex flex-col justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="mt-2 text-base font-medium text-gray-600">
                {fileName ? fileName : "Drop CSV file here, or click to browse"}
              </span>
              <input id="csv-upload" type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
            </label>
          </div>
          {csvData.length > 0 && (
            <div className="overflow-x-auto bg-white rounded-lg shadow-inner overflow-y-auto relative" style={{ maxHeight: "400px" }}>
              <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                <thead>
                  <tr className="text-left">
                    {csvData[0].map((header, index) => (
                      <th key={index} className="bg-gray-50 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {csvData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border-dashed border-t border-gray-200 px-6 py-4 text-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}