import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../lib/api-client";
import { toast } from "react-toastify";

const AddCarDialog = ({ onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("brand", data.brand);
      // remove Rs. and commas from price
      const priceInt = parseInt(data.price.replace(/Rs\.|,/g, ""), 10);
      formData.append("price", priceInt);
      formData.append("seats", data.seats);
      formData.append("transmission", data.transmission);
      formData.append("fuel", data.fuel);
      formData.append("status", data.status);
      if (imageFile) formData.append("image", imageFile);

      console.log(formData)
      await api.post("/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Car added successfully!");
      reset();
      setImageFile(null);
      onClose();
      onSave();
    } catch (e) {
      console.error(e);
      toast.error("Failed to add car!");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              {...register("brand", { required: "Brand is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.brand && <p className="text-red-600 text-sm">{errors.brand.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (Rs.)</label>
            <input
              {...register("price", { required: "Price is required" })}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 22999"
            />
            {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Seats</label>
            <input
              type="number"
              {...register("seats", { required: "Seats are required", min: 1 })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.seats && <p className="text-red-600 text-sm">{errors.seats.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Transmission</label>
            <input
              {...register("transmission", { required: "Transmission is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.transmission && <p className="text-red-600 text-sm">{errors.transmission.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Fuel</label>
            <input
              {...register("fuel", { required: "Fuel type is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.fuel && <p className="text-red-600 text-sm">{errors.fuel.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select {...register("status")} className="w-full border px-3 py-2 rounded">
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="RENTED">RENTED</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarDialog;

