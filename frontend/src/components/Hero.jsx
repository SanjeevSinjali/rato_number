import { Link } from "react-router-dom"
import homecar from "../assets/home-car.png"
import { CircleCheck } from "lucide-react"

const Hero = () => {
  return <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 my-32">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
        <div>
          <div class="max-w-lg md:max-w-none">
            <h1 className="mb-4">Plan Your Perfect Getaway</h1>
            <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Drive Your <span className="text-[#009689]">Dream</span> – Without Limits
            </h2>

            <p class="mt-4 text-gray-500">
              Explore top-rated car rentals at unbeatable prices.
            </p>
          </div>
          <div className="mt-4">
            <Link
              to="/vehicles"
              className="p-3 flex rounded-lg border-2 w-max text-white bg-[#009689]"
            >
              Book Ride &nbsp; <CircleCheck />
            </Link>
          </div>
        </div>
        <div>
          <img
            src={homecar}
            class="rounded"
            alt="car"
          />
        </div>
      </div>
    </div>
  </section>

}

export default Hero
