import AboutMain from "../assets/car-sales.png";

function About() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 my-32">
        <section className="flex flex-wrap md:flex-nowrap gap-20 max-w-[90rem] mx-auto items-center
                            text-center md:text-left">
          <img
            src={AboutMain}
            alt="car-renting"
            className="w-[50rem] h-[43rem] object-cover mx-auto md:mx-0"
          />

          {/* Text content */}
          <div className="flex flex-col text-gray-900">
            <h3 className="text-xl font-medium mb-4">About Company</h3>
            <h2 className="text-4xl leading-tight font-semibold">
              You start the engine and your adventure begins
            </h2>
            <p className="mt-8 mb-16 text-gray-600 leading-relaxed max-w-xl">
              Ratonumber is your trusted partner for hassle-free car rentals. We make renting cars easy, affordable, and reliable—so you can focus on your journey without worrying about the ride. Whether you need a compact car for city driving or a spacious SUV for a weekend getaway, Ratonumber has you covered with a wide selection of vehicles and exceptional customer service. Your adventure starts here!
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;

