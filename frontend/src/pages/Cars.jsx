import { Link } from "react-router-dom";
import { Car, Star, Fuel, Armchair, Joystick } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../lib/api-client";

const CarModel = () => {
  const [cars, setCars] = useState([])
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/cars");
        console.log(res.data)
        setCars(res.data)
      } catch (e) {
        console.log("fetchCars: ", e)
      }
    }
    fetchCars()
  }, [])

  return (
    <section className="py-20">
      <h1 className="mx-auto text-2xl text-center my-8 font-bold">Vehicles</h1>
      <div className="max-w-7xl mx-auto px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, idx) => {
          const isRented = car.status === "RENTED";

          return (
            <div
              key={idx}
              className="border border-gray-300 rounded-md shadow-md flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="relative border border-gray-300 rounded-md shadow-md flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-lg">
                <img
                  src={`http://localhost:3030${car.image}`}
                  alt={car.name}
                  className={`w-full h-72 object-cover `}
                />

                {isRented && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white font-bold px-3 py-1 rounded shadow-md">
                    RENTED
                  </span>
                )}

                <div className="p-6 flex flex-col gap-4">
                  {/* rest of your card content */}
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-xl font-semibold text-[#009689]">{car.name}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-2xl font-bold text-[#009689]">Rs.{car.price}</h4>
                    <p className="text-sm text-gray-500">per day</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-600 border-b border-gray-300 pb-4">
                  <span className="flex items-center gap-1 text-[#009689]">
                    <Car size={18} /> {car.brand}
                  </span>
                  <span className="flex justify-end items-center gap-1 text-[#009689]">
                    {car.seats} <Armchair size={18} />
                  </span>
                  <span className="flex items-center gap-1 text-[#009689]">
                    <Joystick size={18} /> {car.transmission}
                  </span>
                  <span className="flex justify-end items-center gap-1 text-[#009689]">
                    {car.fuel} <Fuel size={18} />
                  </span>
                </div>

                <Link
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                  className={`mt-2 font-semibold text-center py-3 rounded transition duration-300 shadow-md ${isRented
                    ? "bg-red-500 cursor-not-allowed text-white"
                    : "bg-[#009689] hover:bg-[#007a6d] text-white"
                    }`}
                  onClick={(e) => isRented && e.preventDefault()}
                >
                  {isRented ? "Not Available" : "Book Ride"}
                </Link>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default CarModel;

