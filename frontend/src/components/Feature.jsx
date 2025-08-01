const Feature = () => {
  return <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-48">
    <div className="text-center p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
      <div className="text-5xl text-[#009689] mb-5">🚗</div>
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Availability</h3>
      <p className="text-gray-600">Our cars are available whenever you need them.</p>
    </div>

    <div className="text-center p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
      <div className="text-5xl text-[#009689] mb-5">🛋️</div>
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Comfort</h3>
      <p className="text-gray-600">
        Our rentals come with optional security detail upon request for your peace of mind.
      </p>
    </div>

    <div className="text-center p-8 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
      <div className="text-5xl text-[#009689] mb-5">💰</div>
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Savings</h3>
      <p className="text-gray-600">Enjoy transparent pricing with no hidden charges.</p>
    </div>
  </section>
}

export default Feature
