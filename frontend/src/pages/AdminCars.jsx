import CarTable from "../components/AllCars"

const AdminCars = () => {


  const initialCars = [
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
      status: "RENTED",
    },
    {
      id: 4,
      name: "Creta",
      brand: "Hyundai",
      price: "₹10,299",
      seats: 5,
      transmission: "Manual",
      fuel: "Diesel",
      status: "RENTED",
    },
    {
      id: 5,
      name: "GLK",
      brand: "Mercedes-Benz",
      price: "₹36,599",
      seats: 5,
      transmission: "Automatic",
      fuel: "Diesel",
      status: "AVAILABLE",
    },
    {
      id: 6,
      name: "Swift",
      brand: "Maruti Suzuki",
      price: "₹1,599",
      seats: 5,
      transmission: "Manual",
      fuel: "Petrol",
      status: "AVAILABLE",
    },
  ];

  return <div className="flex  flex-col w-full gap-4">
    <CarTable cars={initialCars} />
  </div>

}

export default AdminCars

