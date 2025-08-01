import React, { useEffect, useState } from 'react';
import { api } from '../lib/api-client';
import dayjs from 'dayjs';

const RentedCars = ({ user, setUser }) => {
  const [myCars, setMyCars] = useState([])

  const fetchMyRents = async () => {
    try {
      const res = await api.get("/myrents");
      setMyCars(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchMyRents()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f3f2] px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#009689] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Car Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Brand</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Price (per day)</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Rent Start</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Rent End</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Total Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {myCars.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No rented cars found.
                </td>
              </tr>
            )}
            {myCars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4">
                  <img
                    src={`http://localhost:3030${car.image}`}
                    alt={car.carName}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-semibold">{car.carName}</td>
                <td className="px-6 py-4">{car.carBrand}</td>
                <td className="px-6 py-4">Rs.{car.carPrice.toLocaleString()}</td>
                <td className="px-6 py-4">{dayjs(car.rentStartDate).format('DD MMM YYYY')}</td>
                <td className="px-6 py-4">{dayjs(car.rentEndDate).format('DD MMM YYYY')}</td>
                <td className="px-6 py-4 font-semibold">Rs.{parseFloat(car.totalPrice).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${car.status === 'RENTED' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}
                  >
                    {car.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentedCars;


