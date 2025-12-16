import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../shared/LoadingSpinner";
import ConfettiEffect from "../shared/ConfettiEffect";

const LoanApplicationForm = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedLoanId, setSelectedLoanId] = useState(id || null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nidPassport: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });

  const { data: allLoans } = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", selectedLoanId],
    enabled: !!selectedLoanId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${selectedLoanId}`);
      return res.data;
    },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");
    if (!loan) return toast.error("Please select a loan first");

    const payload = {
      userEmail: user.email,
      loanId: loan._id,
      loanTitle: loan.title,
      interest: loan.interest,
      status: "Pending",
      applicationFee: "Unpaid",
      ...formData,
    };

    try {
      await axiosSecure.post("/loan-application", payload);

      setShowConfetti(true);


      setTimeout(() => {
        setShowConfetti(false);
        navigate("/dashboard/my-loans");
      }, 8000);

      toast.success("Loan Application Submitted Successfully");
    } catch (err) {
      console.log(err);

      toast.error("Failed to submit application");
    }
  };

  const loanForm = Array.isArray(allLoans) ? allLoans : [];

  return (
    <div className="py-30 w-10/12 mx-auto max-w-4xl">
      {showConfetti && <ConfettiEffect />}
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-8 text-center">
        Loan Application Form
      </h2>

      {!id && (
        <div className="mb-6">
          <label className="font-semibold text-gray-700 dark:text-gray-200">Select Loan Type</label>
          <select
            onChange={(e) => setSelectedLoanId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
          >
            <option value="">-- Select --</option>
            {loanForm?.map((loan) => (
              <option key={loan._id} value={loan._id}>
                {loan.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLoanId && isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="shadow-xl p-8 rounded-xl space-y-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-200">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-slate-800 dark:border-slate-700 cursor-not-allowed dark:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-200">Loan Title</label>
              <input
                type="text"
                value={loan?.title || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-slate-800 dark:border-slate-700 cursor-not-allowed dark:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-gray-700 dark:text-gray-200">Interest Rate</label>
              <input
                type="text"
                value={loan?.interest || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-slate-800 dark:border-slate-700 cursor-not-allowed dark:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Contact Number</label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">NID / Passport Number</label>
              <input
                name="nidPassport"
                value={formData.nidPassport}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Income Source</label>
              <input
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Monthly Income</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Loan Amount</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Reason for Loan</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 dark:text-gray-200">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 dark:text-gray-200">Extra Notes</label>
            <textarea
              name="extraNotes"
              value={formData.extraNotes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200"
            />
          </div>

          <button
            type="submit"
            className="btn btn-brand w-full"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default LoanApplicationForm;
