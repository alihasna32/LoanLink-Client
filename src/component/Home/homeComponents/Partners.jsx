import React from 'react';
import Marquee from 'react-fast-marquee';

const partners = [
  { id: 1, name: "Bank A", logo: "https://i.ibb.co/hJtJ2LSJ/a.jpg" },
  { id: 2, name: "NGO B", logo: "https://i.ibb.co/PGxkvRWn/n.png" },
  { id: 3, name: "Microfinance C", logo: "https://i.ibb.co/8tLhWD3/m.png" },
  { id: 4, name: "Bank D", logo: "https://i.ibb.co/h14CdTWH/d.png" },
  { id: 5, name: "Bank E", logo: "https://i.ibb.co/YBMyXwfQ/e.jpg" },
  { id: 6, name: "NGO F", logo: "https://i.ibb.co/pv5zBpXC/f.jpg" },
  { id: 7, name: "Microfinance G", logo: "https://i.ibb.co/TDHXR758/g.jpg" },
  { id: 8, name: "Bank H", logo: "https://i.ibb.co/R43FXJ6s/h.jpg" },
];

const Partners = () => {
  return (
    <section className="py-16 w-10/12 max-w-7xl shadow-sm shadow-orange-200 bg-white dark:bg-slate-900 mx-auto rounded-xl 2xl:rounded-3xl border border-gray-100 dark:border-slate-700">
      <div className="mx-auto text-center px-4">

        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold mb-4 2xl:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
          Trusted By Leading Organizations
        </h2>


        <p className="mb-10 2xl:mb-16 max-w-3xl 2xl:max-w-4xl mx-auto text-gray-600 dark:text-gray-300 2xl:text-lg">
          We collaborate with banks, NGOs, and microfinance institutions to make loans accessible, transparent, and trustworthy for everyone.
          Join our network of partners to expand financial opportunities.
        </p>

        <Marquee gradient={false} speed={80} pauseOnHover={true}>
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center bg-white p-6 2xl:p-8 m-4 2xl:m-6 rounded-2xl shadow-lg border border-gray-100 dark:border-orange-100/20 transition-transform transform hover:scale-110"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-24 w-24 2xl:h-32 2xl:w-32 object-contain rounded-full"
              />
            </div>
          ))}
        </Marquee>


        <p className="mt-12 font-semibold text-lg text-gray-700 dark:text-gray-200">
          Become a trusted partner with LoanLink today!
        </p>
      </div>
    </section>
  );
};

export default Partners;
