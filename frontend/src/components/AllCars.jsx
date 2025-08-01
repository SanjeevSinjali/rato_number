import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),
  columnHelper.accessor("price", {
    header: "Price",
  }),
  columnHelper.accessor("seats", {
    header: "Seats",
  }),
  columnHelper.accessor("transmission", {
    header: "Transmission",
  }),
  columnHelper.accessor("fuel", {
    header: "Fuel",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={`opacity-75 inline-block px-4 py-2 rounded text-white font-semibold ${status === "RENTED" ? "bg-red-600" : "bg-green-600"
            }`}
        >
          {status}
        </span>
      );
    },
  }),
];

const CarTable = ({ cars }) => {
  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddCar = () => {
    const newCar = {
      name: "New Car",
      brand: "BrandX",
      price: "$9999",
      seats: 4,
      transmission: "Automatic",
      fuel: "Petrol",
      status: "AVAILABLE",
    };
  };

  return (
    <div className="p-4">
      <button
        className="mb-4 bg-[#009689] hover:bg-[#007d74] text-white font-bold py-2 px-4 rounded"
      >
        Add Car
      </button>


      <div className="rounded-xl border border-[#009689] overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#009689] text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm">
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

export default CarTable;

