import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";


const columnHelper = createColumnHelper();

const formatDate = (isoString) => isoString.split("T")[0]; // Only YYYY-MM-DD

const CarOrderPage = ({ cars, setCar }) => {

  const table = useReactTable({
    data: cars,
    columns: [
      columnHelper.accessor("name", { header: "Car Name" }),
      columnHelper.accessor("totalPrice", { header: "Total Price" }),
      columnHelper.accessor("bookedBy", { header: "Booked By" }),
      columnHelper.accessor("rentStartDate", {
        header: "Start Date",
        cell: (info) => (
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
            {formatDate(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("rentEndDate", {
        header: "End Date",
        cell: (info) => (
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            {formatDate(info.getValue())}
          </span>
        ),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Rented Cars</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarOrderPage;

