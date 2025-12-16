// ApprovedLoans.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedLoans = [], isLoading } = useQuery({
    queryKey: ["approvedLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("loan-applications/approved");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 shadow-sm shadow-orange-200 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 font-bold mb-6">Approved Loan Applications</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-slate-700">
        <table className="table w-full">
          <thead className="bg-brand-main text-white">
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved At</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {approvedLoans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>

                <td>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {loan.firstName} {loan.lastName}
                  </p>
                  <small className="text-gray-500 dark:text-gray-400">{loan.userEmail}</small>
                </td>

                <td className="text-gray-800 dark:text-gray-200">{loan.loanAmount} BDT</td>

                <td className="text-gray-800 dark:text-gray-200">
                  {loan.approvedAt
                    ? new Date(loan.approvedAt).toLocaleString()
                    : "N/A"}
                </td>

                <td className="text-orange-600 font-bold">{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedLoans;
