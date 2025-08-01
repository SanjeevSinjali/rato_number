import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#f8f8f8] py-40">
        <div className="bg-[#009689] my-8 py-12 relative border-t-4 border-[#007a6d]">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Book a car by getting in touch with us
            </h2>
            <div className="flex justify-center items-center gap-4">
              <Phone width={40} height={40} />
              <h3 className="text-2xl font-semibold">(977) 980000000000</h3>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              grid text-left text-[#010103] gap-32
              justify-center
              max-[1100px]:grid-cols-2
              max-[650px]:grid-cols-1
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            "
          >
            <ul className="list-none max-[650px]:text-center">
              <li className="mb-6">
                <img src="" alt="Company Logo" className="w-[28rem]" />
              </li>
              <li className="text-base text-gray-500 leading-[1.7] mb-12">
                We offers a big range of vehicles for all your driving needs.
                We have the perfect car to meet your needs.
              </li>
              <li className="text-base font-medium mb-4">
                <p className="inline-flex items-center gap-2">
                  <Phone /> (+977) 980000000000
                </p>
              </li>
              <li className="text-base font-medium mb-4">
                <a
                  href="mailto:help@ratonumber.com"
                  className="inline-flex items-center gap-2 text-inherit hover:text-[#009689] transition-colors"
                >
                  <Mail /> help@ratonumber.com
                </a>
              </li>
            </ul>

            <ul className="list-none max-[650px]:text-center">
              <li className="text-xl font-bold uppercase font-sans mb-4 cursor-default">
                Company
              </li>

              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/vehicles", label: "Vehicle" },
              ].map((link, i) => (
                <li key={i} className="text-base mb-4">
                  <Link
                    to={link.to}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-[#010103] hover:text-[#ff4d30] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="list-none max-[650px]:text-center">
              <li className="text-xl font-bold uppercase font-sans mb-4 cursor-default">
                Working Hours
              </li>
              <li className="text-base font-semibold mb-2">Mon - Fri:</li>
              <li className="text-base mb-8">05:00AM - 01:00AM</li>
              <li className="text-base font-semibold mb-2 mt-10">Sat - Sun:</li>
              <li className="text-base">24 Hours</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

