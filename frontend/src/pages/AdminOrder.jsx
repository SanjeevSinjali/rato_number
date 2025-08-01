import { useEffect, useState } from "react"
import CarOrderPage from "../components/CarOrder"
import { api } from "../lib/api-client"

const AdminOrder = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchCars = async () => {
      try {

        const res = await api.get("/rent/rentedAll");
        console.log(res.data)
        setCars(res.data)
      } catch (e) {
        console.log("Error :", e)
      }
    }
    fetchCars()

  }, [])
  return <div className="flex  flex-col w-full gap-4">
    <CarOrderPage cars={cars} setCar={setCars} />
  </div>
}

export default AdminOrder
