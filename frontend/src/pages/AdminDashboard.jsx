import { useState } from 'react';
import RentedCarsTable from '../components/RentedCarsTable';

const dummyData = [
  {
    id: 1,
    title: "Total Rented",
    value: 15,
    percent: 67.81,
    isIncrease: true,
  },
  {
    id: 2,
    title: "Total Profit",
    value: "Rs. 67296",
    percent: 12.34,
    isIncrease: true,
  },
];

const rented_cars = [
  {
    name: "Thar",
    brand: "Mahindra",
    price: "₹22,999",
    transmission: "Manual",
    fuel: "Diesel",
    seats: 4,
    rentalDate: "2025-08-01",
    returnDate: "2025-08-02",
    status: "RENTED",
  },
  {
    name: "Nexon EV",
    brand: "Tata",
    price: "₹15,499",
    transmission: "Automatic",
    seats: 5,
    fuel: "Electric",
    rentalDate: "2025-07-15",
    returnDate: "2025-07-19",
    status: "RENTED",
  },
  {
    name: "Brezza",
    brand: "Maruti Suzuki",
    price: "₹18,499",
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    rentalDate: "2025-07-10",
    returnDate: "2025-07-17",
    status: "RENTED",
  },
  {
    name: "Creta",
    brand: "Hyundai",
    price: "₹10,299",
    transmission: "Manual",
    seats: 5,
    fuel: "Diesel",
    rentalDate: "2025-07-12",
    returnDate: "2025-07-20",
    status: "RENTED",
  },
  {
    name: "GLK",
    brand: "Mercedes-Benz",
    price: "₹36,599",
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
    rentalDate: null,
    returnDate: null,
    status: "AVAILABLE",
  },
  {
    name: "Swift",
    brand: "Maruti Suzuki",
    price: "₹1,599",
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol",
    rentalDate: null,
    returnDate: null,
    status: "AVAILABLE",
  },
];


const AdminDashboard = () => {
  const [stats, setStats] = useState(dummyData);

  return (
    <div className="flex  flex-col w-full gap-4">

      <div className="flex w-full gap-4">
        {stats.map(({ id, title, value, percent, isIncrease }) => {
          const percentColor = isIncrease ? "text-green-600" : "text-red-600";
          const bgColor = isIncrease ? "bg-green-100" : "bg-red-100";
          const iconPath = isIncrease
            ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6";

          return (
            <article
              key={id}
              className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 w-1/2"
            >
              <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-medium text-gray-900">{value}</p>
              </div>

              <div className={`inline-flex gap-2 rounded-sm p-1 ${bgColor} ${percentColor}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={iconPath}
                  />
                </svg>
                <span className="text-xs font-medium">{percent}%</span>
              </div>
            </article>
          );
        })}
      </div>

      <RentedCarsTable cars={rented_cars} />
    </div >
  );
};

export default AdminDashboard;

