import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import BookCar from '../components/BookCar';
import Feature from '../components/Feature';

const Homepage = () => {
  // const [cars, setCars] = useState([])
  return (
    <div className='w-dvw'>
      <Hero />
      <BookCar />
      <Feature />
    </div>
  );
};

export default Homepage;

