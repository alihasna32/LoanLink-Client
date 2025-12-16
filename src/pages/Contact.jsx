import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookSquare, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-hot-toast";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-30 ">
      <div className="w-10/12 shadow-sm shadow-orange-200 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-2xl">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have any questions or need assistance? Our team is ready to help you.
            Fill out the form or reach out directly using the contact details below.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 ">
              <FaMapMarkerAlt className="text-orange-600 text-xl" />
              <span className="text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 ">
              <FaPhone className="text-orange-600 text-xl" />
              <span className="text-gray-700 dark:text-gray-300">+880 1421 777 639</span>
            </div>
            <div className="flex items-center gap-3 ">
              <FaEnvelope className="text-orange-600 text-xl" />
              <span className="text-gray-700 dark:text-gray-300">support@loanlink.com</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <a href="https://x.com" className="hover:scale-110 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition">
              <img src="https://i.ibb.co.com/WC1HVbx/download.png" alt="" className="w-5" />
            </a>

            <a href="https://www.facebook.com" className="hover:scale-110 text-blue-600 bg-white rounded-full shadow-md transition">
              <FaFacebookSquare size={32} />
            </a>
            <a href="https://www.instagram.com" className="hover:scale-110 text-pink-600 bg-white rounded-full shadow-md transition">
              <FaInstagramSquare size={32} />
            </a>

            <a href="https://www.linkedin.com" className="hover:scale-110 text-blue-700 bg-white rounded-full shadow-md transition">

              <FaLinkedinIn size={32} />
            </a>

          </div>
        </div>


        <div className="bg-gray-50 dark:bg-slate-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-slate-700">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full btn-brand py-3 rounded-md font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
