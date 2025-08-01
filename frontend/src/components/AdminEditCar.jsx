import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const BookingDialog = ({ car, onClose, onSubmitCar }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  console.log(car)

  useEffect(() => {
    if (car) {
      reset({
        name: car.name || "",
        brand: car.brand || "",
        price: parseInt(car.price.replace(/Rs\.|,/g, ''), 10) || "",
        seats: car.seats || "",
        transmission: car.transmission || "",
        fuel: car.fuel || "",
        status: car.status || "AVAILABLE"
      });
    }
  }, [car, reset]);

  const onSubmit = (data) => {
    console.log("Updated car:", data);
    if (onSubmitCar) onSubmitCar(data);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Blurred background */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-white/30"
        onClick={onClose}
      />

      {/* Dialog content */}
      <div
        className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-md z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{car ? `Edit Car: ${car.name}` : "Add Car"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input {...register("name", { required: true })} placeholder="Car Name" className="w-full p-2 border rounded" />
          <input {...register("brand", { required: true })} placeholder="Brand" className="w-full p-2 border rounded" />
          <input type="number" {...register("price", { required: true })} placeholder="Price" className="w-full p-2 border rounded" />
          <input type="number" {...register("seats", { required: true })} placeholder="Seats" className="w-full p-2 border rounded" />
          <input {...register("transmission", { required: true })} placeholder="Transmission" className="w-full p-2 border rounded" />
          <input {...register("fuel", { required: true })} placeholder="Fuel" className="w-full p-2 border rounded" />

          <select {...register("status")} className="w-full p-2 border rounded">
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="RENTED">RENTED</option>
          </select>
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingDialog;

