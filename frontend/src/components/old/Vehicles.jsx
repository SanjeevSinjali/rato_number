import { useState } from "react"

const Vehicles = () => {

  // const [vehicles, setVehicles] = useState([])

  const vehicles = [[
    {
      "brand": "Hyundai",
      "model": "Grand i10 Nios",
      "variant": "",
      "color": "",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 40,
      "image": "hyundai grand i10 Nios.jpg"
    },
    {
      "brand": "Kia",
      "model": "Sonet",
      "variant": "HTK+",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 55,
      "image": "kia sonet HTK+ red.jpg"
    },
    {
      "brand": "Maruti",
      "model": "Suzuki",
      "variant": "",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 35,
      "image": "maruti suziki red.jpg"
    },
    {
      "brand": "Suzuki",
      "model": "Swift",
      "variant": "VXI",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 38,
      "image": "suzuki swift VXI red.jpg"
    },
    {
      "brand": "Toyota",
      "model": "Hilux",
      "variant": "",
      "color": "Red",
      "fuel_type": "Diesel",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 70,
      "image": "toyota hilux red.jpg"
    },
    {
      "brand": "Hyundai",
      "model": "Venue",
      "variant": "",
      "color": "Black",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 50,
      "image": "hyundai venue black.jpg"
    },
    {
      "brand": "Mahindra",
      "model": "Scorpio",
      "variant": "",
      "color": "Black",
      "fuel_type": "Diesel",
      "transmission": "Manual",
      "seats": 7,
      "price_per_day": 65,
      "image": "Mahindra Scorpio black.jpg"
    },
    {
      "brand": "Nissan",
      "model": "Magnite",
      "variant": "",
      "color": "Black",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 48,
      "image": "nissan magnite black.jpg"
    },
    {
      "brand": "Tata",
      "model": "Nexon",
      "variant": "",
      "color": "Dark Green",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 45,
      "image": "tata nexon dark green.jpg"
    },
    {
      "brand": "Toyota",
      "model": "Yaris",
      "variant": "G CVT",
      "color": "Dark Brown",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 52,
      "image": "toyota yaris g CVT dark brown.jpg"
    },
    {
      "brand": "Hyundai",
      "model": "Venue",
      "variant": "",
      "color": "White",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 50,
      "image": "hyundai venue white.jpg"
    },
    {
      "brand": "Mahindra",
      "model": "Scorpio",
      "variant": "",
      "color": "White",
      "fuel_type": "Diesel",
      "transmission": "Manual",
      "seats": 7,
      "price_per_day": 65,
      "image": "mahindra scorpio white.jpg"
    },
    {
      "brand": "Nissan",
      "model": "Magnite",
      "variant": "",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 48,
      "image": "nissan magnite red.jpg"
    },
    {
      "brand": "Tata",
      "model": "Nexon",
      "variant": "",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 45,
      "image": "tata nexon red.jpg"
    },
    {
      "brand": "Toyota",
      "model": "Yaris",
      "variant": "G CVT",
      "color": "Red",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 52,
      "image": "toyota yaris g CVTred.jpg"
    },
    {
      "brand": "Kia",
      "model": "Sonet",
      "variant": "HTK+",
      "color": "Blue",
      "fuel_type": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "price_per_day": 55,
      "image": "kia sonet HTK+ blue.jpg"
    },
    {
      "brand": "Maruti",
      "model": "Suzuki",
      "variant": "",
      "color": "Blue",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 35,
      "image": "maruti suziki blue.jpg"
    },
    {
      "brand": "Suzuki",
      "model": "Swift",
      "variant": "VXI",
      "color": "Blue",
      "fuel_type": "Petrol",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 38,
      "image": "suzuki swift VXI blue.jpg"
    },
    {
      "brand": "Toyota",
      "model": "Hilux",
      "variant": "",
      "color": "Black",
      "fuel_type": "Diesel",
      "transmission": "Manual",
      "seats": 5,
      "price_per_day": 70,
      "image": "toyota hilux black.jpg"
    }
  ]

  ]

  return (
    <div>
      {/* Header Navigation */}
      <header className="header container">
        <div className="logo">RatoNumber</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <Link to="/login" className="login-button">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <span>hello world</span>
    </div>
  )
}

export default Vehicles
