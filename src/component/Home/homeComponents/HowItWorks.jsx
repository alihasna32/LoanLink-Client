import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaRegFileAlt,
  FaUserCheck,
  FaSearch,
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaSyncAlt,
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    icon: <FaRegFileAlt size={22} />,
    title: 'Apply Online',
    desc:
      'Fill out a simple online form with your basic details, requested loan amount, monthly income, and required documents.',
  },
  {
    id: 2,
    icon: <FaUserCheck size={22} />,
    title: 'Initial Review',
    desc:
      'Our team quickly reviews your submitted application and checks for basic eligibility and required documents.',
  },
  {
    id: 3,
    icon: <FaSearch size={22} />,
    title: 'Verification',
    desc:
      'Your identity and uploaded documents are verified. If needed, we may contact you for additional information.',
  },
  {
    id: 4,
    icon: <FaCheckCircle size={22} />,
    title: 'Approval',
    desc:
      'Once verification is complete, your loan request is approved, and you will be notified along with EMI details.',
  },
  {
    id: 5,
    icon: <FaMoneyCheckAlt size={22} />,
    title: 'Disbursement',
    desc:
      'After approval, the loan amount is transferred to your provided bank/mobile account as per the agreed terms.',
  },
  {
    id: 6,
    icon: <FaSyncAlt size={22} />,
    title: 'Repayment',
    desc:
      'Repay your loan in easy EMIs through online payment, auto-debit, or manual payment options.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="w-10/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 inline-block">
              How It Works
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              The LoanLink process is simple, transparent, and fast — from application to approval and disbursement.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical Central Line (Desktop) / Left Line (Mobile) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500 via-orange-500 to-transparent opacity-30"></div>
          </div>
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-20 md:pl-0 pr-0 md:text-right group">
                  <div className={`p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${index % 2 === 0 ? 'md:mr-auto md:text-left md:border-l-0 md:border-r-4' : 'md:ml-auto'}`}>
                    <div className="flex items-center gap-3 mb-3 md:hidden">
                      <span className="text-xs font-bold text-orange-500 tracking-wider uppercase">Step {step.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Node / Icon */}
                <div className="absolute left-8 md:static md:left-auto flex-shrink-0 w-16 h-16 rounded-full bg-brand-main p-1 shadow-lg z-10 transform -translate-x-1/2 md:translate-x-0 flex items-center justify-center">
                  <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                    {step.icon}
                  </div>
                </div>

                {/* Spacer Side (for Desktop zig-zag balance) */}
                <div className="hidden md:block w-1/2 pl-12">
                  <span className="text-sm font-bold text-orange-500 tracking-wider uppercase opacity-50">Step 0{step.id}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20  max-w-7xl mx-auto"
        >
          <div className="bg-brand-main rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full ml-[-20px] mt-[-20px] blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-black/10 rounded-full mr-[-30px] mb-[-30px] blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Submit your loan request online in minutes. We verify and update you quickly so you can focus on what matters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/loan-application"
                  className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all transform"
                >
                  Apply Now
                </Link>
                <Link
                  to="/all-loans"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Explore Loans
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
