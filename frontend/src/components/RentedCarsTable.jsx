import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", { header: "Car" }),
  columnHelper.accessor("brand", { header: "Brand" }),
  columnHelper.accessor("price", { header: "Price" }),
  columnHelper.accessor("seats", { header: "Seats" }),
  columnHelper.accessor("transmission", { header: "Transmission" }),
  columnHelper.accessor("fuel", { header: "Fuel" }),
  columnHelper.accessor("rentalDate", { header: "Rental Date" }),
  columnHelper.accessor("returnDate", { header: "Return Date" }),
];

const RentedCarsTable = ({ cars }) => {

  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-10 overflow-x-auto rounded-lg border border-[#009689] bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold text-[#009689]">
        Recently Rented Cars
      </h2>
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#009689] text-xs font-semibold uppercase text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-4 py-2" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-[#009689]/10 transition">
              {row.getVisibleCells().map((cell) => (
                <td className="px-4 py-2 text-gray-700" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default RentedCarsTable;

