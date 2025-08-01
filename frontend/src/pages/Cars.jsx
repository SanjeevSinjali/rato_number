import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Car, Star, Fuel, Armchair, Joystick } from "lucide-react";
import Benz from "../assets/benz.png"
import Breeza from "../assets/breeza-ms.png"
import Creta from "../assets/creta.png"
import Swift from "../assets/swiftcc.png"
import TataNexon from "../assets/tata-nexon.png"
import Thar from "../assets/thar.png"

const cars = [
  {
    name: "Thar",
    brand: "Mahindra",
    price: "₹22,999",
    seats: 4,
    transmission: "Manual",
    fuel: "Diesel",
    image: Thar,
  },
  {
    name: "Nexon EV",
    brand: "Tata",
    price: "₹15,499",
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    image: TataNexon,
  },
  {
    name: "Brezza",
    brand: "Maruti Suzuki",
    price: "₹18,499",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    image: Breeza,
  },
  {
    name: "Creta",
    brand: "Hyundai",
    price: "₹10,299",
    seats: 5,
    transmission: "Manual",
    fuel: "Diesel",
    image: Creta,
  },
  {
    name: "GLK",
    brand: "Mercedes-Benz",
    price: "₹36,599",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    image: Benz,
  },
  {
    name: "Swift",
    brand: "Maruti Suzuki",
    price: "₹1,599",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    image: Swift,
  },
];

const CarModel = () => {
  return (
    <section className="py-20">
      <h1 className="mx-auto text-2xl text-center my-8 font-bold">Vehicles</h1>
      <div className="max-w-7xl mx-auto px-4 grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-md shadow-md flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-lg"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-xl font-semibold text-[#009689]">{car.name}</p>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} width={15} height={15} />
                    ))}
                  </div>
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

              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-2 bg-[#009689] hover:bg-[#007a6d] text-white font-semibold text-center py-3 rounded transition duration-300 shadow-md"
              >
                Book Ride
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarModel;

