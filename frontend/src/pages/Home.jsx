import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import BookCar from '../components/BookCar';
import Feature from '../components/Feature';
import { api } from "../lib/api-client";

const Homepage = () => {
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
    <div className='w-dvw'>
      <Hero />
      <BookCar cars={cars} setCars={setCars} />
      <Feature />
    </div>
  );
};

export default Homepage;

