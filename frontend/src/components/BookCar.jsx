import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BookCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success(`${data.carType} booked successfully!!!`)
  };

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-32">
      <div className="rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2 bg-white p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#009689]">Book your car</h2>

        <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="carType" className="mb-2 font-medium">
                Car type
              </label>
              <select
                id="carType"
                {...register("carType", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select car type
                </option>

                <option value="Thar">Thar</option>
                <option value="Nexon EV">Nexon EV</option>
                <option value="Brezza">Brezza</option>
                <option value="Creta">Creta</option>
                <option value="GLK">GLK</option>
                <option value="Swift">Swift</option>

              </select>
              {errors.carType && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="pickup" className="mb-2 font-medium">
                Pick-up location
              </label>
              <select
                id="pickup"
                {...register("pickup", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select pickup location
                </option>
                <option value="ktm">Kathmandu</option>
                <option value="pkr">Pokhara</option>
              </select>
              {errors.pickup && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dropoff" className="mb-2 font-medium">
                Drop-off location
              </label>
              <select
                id="dropoff"
                {...register("dropoff", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select drop location
                </option>
                <option value="ratonumber">Rato Number Store</option>
              </select>
              {errors.dropoff && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="flex flex-col">
              <label htmlFor="rentalDate" className="mb-2 font-medium">
                Rental date
              </label>
              <input
                type="date"
                id="rentalDate"
                {...register("rentalDate", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
              {errors.rentalDate && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="returnDate" className="mb-2 font-medium">
                Return date
              </label>
              <input
                type="date"
                id="returnDate"
                {...register("returnDate", { required: true })}
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
              {errors.returnDate && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full md:w-auto bg-[#009689] hover:bg-[#007a6d] text-white font-semibold py-3 px-8 rounded-md shadow-md transition-colors"
              >
                Book Car
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookCar;

