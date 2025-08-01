import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../lib/api-client";

const BookCar = ({ cars }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [selectedCar, setSelectedCar] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  const rentalDate = watch("rentalDate");
  const returnDate = watch("returnDate");
  const carType = watch("carType");
  const pickupLocation = watch("pickup");
  const dropLocation = watch("dropoff");

  const onSubmit = (data) => {
    const car = cars.find(c => c.name === data.carType);
    if (!car) return;

    // Calculate days
    const start = new Date(data.rentalDate);
    const end = new Date(data.returnDate);
    const diffTime = end - start;
    if (diffTime < 0) {
      toast.error("Return date cannot be before rental date");
      return;
    }

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const total = car.price * days;

    setSelectedCar({ ...car, days, pickupLocation: data.pickup, dropLocation: data.dropoff });
    setTotalPrice(total);
    setShowConfirm(true);
  };

  const confirmBooking = async () => {

    try {
      const bookingData = {
        carId: selectedCar.id,
        rentStartDate: watch("rentalDate"),
        rentEndDate: watch("returnDate"),
        totalPrice,
        pickupLocation: selectedCar.pickupLocation,
        dropLocation: selectedCar.dropLocation,
      };

      await api.post("/rentCar", bookingData)

      toast.success(
        `${selectedCar.name} booked successfully for ${selectedCar.days} days! `
      );
      setShowConfirm(false);

      // Clear form inputs
      reset();

      // Optionally clear selected car and total price
      setSelectedCar(null);
      setTotalPrice(0);

    } catch (e) {
      console.log(e)
      if (e.response.status == 401) {
        toast.error(
          "Login to Rent!!!"
        );
      }
      else if (e.response?.data?.error == "Car is not available for rent") {
        toast.error("Car is already rented!!")
      }
      else {
        toast.error(
          `${selectedCar.name} booked failed!! `
        );
      }
    }
  };

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-32">
      <div className="rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2 bg-white p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#009689]">Book your car</h2>

        <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Car Type */}
            <div className="flex flex-col">
              <label htmlFor="carType" className="mb-2 font-medium">Car type</label>
              <select
                id="carType"
                {...register("carType", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>Select car type</option>
                {cars.filter(car => car.status === "AVAILABLE").map(car => (
                  <option key={car.id} value={car.name}>{car.name}</option>
                ))}
              </select>
              {errors.carType && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            {/* Rental Date */}
            <div className="flex flex-col">
              <label htmlFor="rentalDate" className="mb-2 font-medium">Rental date</label>
              <input
                type="date"
                id="rentalDate"
                {...register("rentalDate", {
                  required: true,
                  validate: value => value >= today || "Rental date cannot be in the past"
                })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                min={today}
              />
              {errors.rentalDate && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            {/* Return Date */}
            <div className="flex flex-col">
              <label htmlFor="returnDate" className="mb-2 font-medium">Return date</label>
              <input
                type="date"
                id="returnDate"
                {...register("returnDate", {
                  required: "Return date is required",
                  validate: value => {
                    const rental = watch("rentalDate");
                    if (!rental) return true; // don't validate if rental date not selected
                    return value > rental || "Return date must be after rental date";
                  }
                })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                min={today}
              />
              {errors.returnDate && (
                <span className="text-red-500 text-sm">
                  {errors.returnDate.message}
                </span>
              )}
            </div>


          </div>

          {/* Pickup & Drop-off */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col">
              <label htmlFor="pickup" className="mb-2 font-medium">Pick-up location</label>
              <select
                id="pickup"
                {...register("pickup", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>Select pickup location</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
              </select>
              {errors.pickup && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dropoff" className="mb-2 font-medium">Drop-off location</label>
              <select
                id="dropoff"
                {...register("dropoff", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>Select drop-off location</option>
                <option value="Rato Number Store">Rato Number Store</option>
              </select>
              {errors.dropoff && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-[#009689] hover:bg-[#007a6d] text-white font-semibold py-3 px-8 rounded-md shadow-md transition-colors"
            >
              Book Car
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && selectedCar && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Booking</h2>
            <p><strong>Car:</strong> {selectedCar.name}</p>
            <p><strong>Days:</strong> {selectedCar.days}</p>
            <p><strong>Total Price:</strong> ₹{totalPrice.toLocaleString()}</p>
            <p><strong>Pick-up:</strong> {selectedCar.pickupLocation}</p>
            <p><strong>Drop-off:</strong> {selectedCar.dropLocation}</p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookCar;

