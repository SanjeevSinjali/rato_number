import React from 'react';
import Hero from './Hero';
import BookCar from './BookCar';
import Feature from './Feature';

const Homepage = () => {
  return (
    <div className='w-dvw'>
      <Hero />
      <BookCar />
      <Feature />
    </div>
  );
};

export default Homepage;
