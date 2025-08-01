import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const carsData = [
  {
    id: 1,
    name: "Thar",
    brand: "Mahindra",
    price: "₹22,999",
    seats: 4,
    transmission: "Manual",
    fuel: "Diesel",
    status: "RENTED",
  },
  {
    id: 2,
    name: "Nexon EV",
    brand: "Tata",
    price: "₹15,499",
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    status: "RENTED",
  },
  {
    id: 3,
    name: "Brezza",
    brand: "Maruti Suzuki",
    price: "₹18,499",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    status: "AVAILABLE",
  },
  {
    id: 4,
    name: "Creta",
    brand: "Hyundai",
    price: "₹10,299",
    seats: 5,
    transmission: "Manual",
    fuel: "Diesel",
    status: "AVAILABLE",
  },
];

const columnHelper = createColumnHelper();

const CarOrderPage = () => {
  const [data, setData] = useState(carsData);
  const [editCar, setEditCar] = useState(null); // Car being edited
  const [deleteCar, setDeleteCar] = useState(null); // Car to delete

  const table = useReactTable({
    data,
    columns: [
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("brand", { header: "Brand" }),
      columnHelper.accessor("price", { header: "Price" }),
      columnHelper.accessor("seats", { header: "Seats" }),
      columnHelper.accessor("transmission", { header: "Transmission" }),
      columnHelper.accessor("fuel", { header: "Fuel" }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "RENTED"
                ? "text-red-600 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => setEditCar(row.original)}
              className="p-1 rounded border border-gray-300 hover:bg-gray-100"
              aria-label={`Edit ${row.original.name}`}
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setDeleteCar(row.original)}
              className="p-1 rounded border border-gray-300 hover:bg-gray-100 text-red-600"
              aria-label={`Delete ${row.original.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: editCar?.status || "AVAILABLE",
    },
  });

  // Reset form whn editCar changes
  React.useEffect(() => {
    reset({
      status: editCar?.status || "AVAILABLE",
    });
  }, [editCar, reset]);

  const onSubmitEdit = (formData) => {
    setData((oldData) =>
      oldData.map((car) =>
        car.id === editCar.id ? { ...car, status: formData.status } : car
      )
    );
    setEditCar(null); // close modal
  };

  const confirmDelete = () => {
    setData((oldData) => oldData.filter((car) => car.id !== deleteCar.id));
    setDeleteCar(null); // close modal
  };

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Car Orders</h1>

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
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
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

      {editCar && (
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditCar(null);
          }}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2
              id="modalTitle"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Edit Status - {editCar.name}
            </h2>

            <form onSubmit={handleSubmit(onSubmitEdit)} className="mt-4">
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                {...register("status", { required: true })}
                className="w-full rounded border border-gray-300 p-2"
              >
                <option value="PENDING">PENDING</option>
                <option value="RENTED">RENTED</option>
                <option value="AVAILABLE">AVAILABLE</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">Status is required</p>
              )}

              <footer className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  onClick={() => setEditCar(null)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Save
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {deleteCar && (
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitleDelete"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteCar(null);
          }}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2
              id="modalTitleDelete"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Confirm Deletion
            </h2>

            <p className="mt-4 text-gray-700">
              Are you sure you want to delete{" "}
              <strong>{deleteCar.name}</strong>?
            </p>

            <footer className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                onClick={() => setDeleteCar(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarOrderPage;

