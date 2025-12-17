import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: "What is the eligibility criteria for a loan?",
    answer: "You must be 18+, have a valid ID, and meet the minimum income requirements."
  },
  {
    id: 2,
    question: "How long does loan approval take?",
    answer: "Most loans are approved within 24-48 hours after submitting all required documents."
  },
  {
    id: 3,
    question: "Can I repay the loan early?",
    answer: "Yes, early repayment is allowed without any penalty in most cases."
  },
  {
    id: 4,
    question: "What is the maximum loan amount I can apply for?",
    answer: "The maximum loan limit depends on your eligibility and type of loan. It ranges from $500 to $150,000."
  },
  {
    id: 5,
    question: "How do I track my EMI payments?",
    answer: "You can track your EMI schedule and payment history in your LoanLink dashboard after logging in."
  },
  {
    id: 6,
    question: "Are there any hidden fees or charges?",
    answer: "No, LoanLink ensures full transparency. All fees, interest rates, and charges are clearly mentioned before approval."
  },
  {
    id: 7,
    question: "Which documents do I need to submit?",
    answer: "Typically, you need a valid ID, proof of income, bank account details, and any other documents requested for verification."
  },
  {
    id: 8,
    question: "Is it safe to apply online?",
    answer: "Absolutely. LoanLink uses secure encryption and authentication to protect your personal and financial data."
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-16">
      <div className="w-10/12 max-w-7xl mx-auto rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 md:p-10 shadow-xl border border-gray-100 dark:border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 inline-block">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Find answers to the most common questions about LoanLink's microloan services.
          </p>
          <div className="space-y-4">
            {faqs.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl shadow-sm p-5 cursor-pointer transition-all duration-300 border ${isOpen
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  onClick={() => toggle(faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold text-lg transition-colors ${isOpen ? 'text-orange-600 dark:text-orange-500' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                      {faq.question}
                    </h3>
                    {isOpen ? (
                      <FaChevronUp className="text-orange-600 dark:text-orange-500" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-in-out text-sm text-gray-600 dark:text-gray-300 overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
