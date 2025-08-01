import React, { useState } from "react";
import { toast } from "react-toastify";
import { MailOpen, MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      name: name,
      email: email,
      message: message,
    };
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      toast.warning("Empty Fields!");
      return false;
    }
    toast.success("Sent successfully!!")

  };

  return <section className="bg-[url('/src/images/banners/bg-contact.png')] bg-no-repeat bg-center bg-auto py-40 px-8">
    <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 lg:grid-cols-2 text-black">
      <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
        <h2 className="text-4xl font-bold leading-snug mb-6">Need additional information?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          A multifaceted professional skilled in multiple fields of research, development as well as a learning specialist. Over 15 years of experience.
        </p>
        <p className="flex items-center justify-center lg:justify-start gap-2 mb-2">
          <Phone /> (+977) 980000000000
        </p>
        <p className="flex items-center justify-center lg:justify-start gap-2 mb-2">
          <Mail /> help@ratonumber.com
        </p>
        <p className="flex items-center justify-center lg:justify-start gap-2">
          <MapPin /> Kathmandu, Nepal
        </p>
      </div>

      <div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-base font-semibold mb-4">
            Full Name <b className="text-orange-500">*</b>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='E.g: "Joe Shmoe"'
            className="bg-gray-100 p-5 text-base outline-none border-none mb-10"
          />

          <label className="text-base font-semibold mb-4">
            Email <b className="text-orange-500">*</b>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="youremail@example.com"
            className="bg-gray-100 p-5 text-base outline-none border-none mb-10"
          />

          <label className="text-base font-semibold mb-4">
            Tell us about it <b className="text-orange-500">*</b>
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Write Here.."
            className="bg-gray-100 p-5 h-72 text-base outline-none border-none mb-10"
          ></textarea>

          <button
            type="submit"
            className="cursor-pointer bg-[#009689] text-white text-lg font-semibold py-4 px-8 rounded-sm border-2 border-[#009689] shadow-[0_10px_15px_rgb(255_83_48/35%)] transition-all hover:bg-[#009689] hover:shadow-[0_10px_15px_rgb(255_83_48/60%)] flex items-center justify-center gap-2"
          >
            <MailOpen /> Send Message
          </button>
        </form>
      </div>
    </div>

  </section>


}
export default Contact
