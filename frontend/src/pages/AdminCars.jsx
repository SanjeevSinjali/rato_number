import { useEffect, useState } from "react";
import { api } from "../lib/api-client";
import { toast } from "react-toastify";
import { Car, Fuel, Armchair, Joystick } from "lucide-react";
import BookingDialog from "../components/AdminEditCar";
import AddCarDialog from "../components/AddCar";

const AdminCars = () => {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const fetchCars = async () => {
    try {
      const res = await api.get("/cars")
      // console.log("Cars: ", res.data)
      const formattedCars = res.data.map(car => ({
        ...car,
        price: `Rs.${car.price.toLocaleString()}`,
      }));
      setCars(formattedCars)
    } catch (e) {
      console.error("Error - AdminCars : ", e)
      toast.error("Error fetching cars!!")
    }
  }
  useEffect(() => {
    fetchCars()
  }, [])


  const handleUpdateCar = async (updatedData) => {
    if (!selectedCar) return;

    try {
      // Convert price to integer
      const priceInt = parseInt(updatedData.price, 10);

      const res = await api.put(`/cars/${selectedCar.id}`, {
        ...updatedData,
        price: priceInt
      });
      toast.success("Car updated successfully!");

      // Update local state
      setCars(prev =>
        prev.map(c => (c.id === selectedCar.id ? { ...res.data, price: `Rs.${res.data.price.toLocaleString()}` } : c))
      );

      setSelectedCar(null);
    } catch (e) {
      console.error("Failed to update car:", e);
      toast.error("Failed to update car!");
    }
  };
  return <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
    <div className="flex justify-end">
      <button
        onClick={() => setShowAddCar(true)}
        className="bg-[#009689] hover:bg-[#007a6d] text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300"
      >
        Add Car
      </button>
    </div>
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
                  <h4 className="text-2xl font-bold text-[#009689]">{car.price}</h4>
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

              <button
                onClick={() => setSelectedCar(car)}
                className="mt-2 bg-[#009689] hover:bg-[#007a6d] text-white font-semibold text-center py-3 rounded transition duration-300 shadow-md"
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
    {showAddCar && (
      <AddCarDialog
        onClose={() => setShowAddCar(false)}
        onSave={fetchCars}
      />
    )}
    {selectedCar && (
      <BookingDialog
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onSave={fetchCars}
        onSubmitCar={handleUpdateCar}
      />
    )}
  </div >
}

export default AdminCars

