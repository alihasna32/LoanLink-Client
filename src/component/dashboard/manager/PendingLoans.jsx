// PendingLoans.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Fetch pending loans for manager
  const { data: pendingLoans = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingLoans'],
    queryFn: async () => {
      const res = await axiosSecure.get('/loan-applications/pending');
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Approve loan
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/loan-application/approve/${id}`, {
        status: 'Approved',
        approvedAt: new Date(),
      });
      if (res.data.modifiedCount > 0) {
        toast.success('Loan Approved');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to approve loan');
    }
  };

  // Reject loan
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/loan-application/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success('Loan Rejected');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to reject loan');
    }
  };

  return (
    <div className="p-6 shadow-sm shadow-orange-200 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 font-bold mb-6">Pending Loan Applications</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-slate-700">
        <table className="table w-full">
          <thead className="bg-brand-main text-white">
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLoans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>
                <td>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{loan.firstName} {loan.lastName}</p>
                  <small className="text-gray-500 dark:text-gray-400">{loan.userEmail}</small>
                </td>
                <td className="text-gray-800 dark:text-gray-200">{loan.loanAmount} BDT</td>
                <td className="text-gray-800 dark:text-gray-200">{loan.createdAt}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => setSelectedLoan(loan)}
                    className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 dark:bg-gray-300 dark:text-slate-900 dark:hover:bg-gray-400 text-white shadow-md transition-all border-none"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(loan._id)}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:bg-gray-300 dark:text-slate-900 dark:hover:bg-gray-400 text-white shadow-md transition-all border-none"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(loan._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 dark:bg-gray-300 dark:text-slate-900 dark:hover:bg-gray-400 text-white shadow-md transition-all border-none"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedLoan && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-3">Loan Application Details</h3>
            <p><strong>Name:</strong> {selectedLoan.firstName} {selectedLoan.lastName}</p>
            <p><strong>Email:</strong> {selectedLoan.userEmail}</p>
            <p><strong>Amount:</strong> {selectedLoan.loanAmount} BDT</p>
            <p><strong>Loan Title:</strong> {selectedLoan.loanTitle}</p>
            <p><strong>Interest:</strong> {selectedLoan.interest}</p>
            <p><strong>Status:</strong> {selectedLoan.status}</p>
            <p><strong>Application Fee Status:</strong> {selectedLoan.applicationFeeStatus}</p>
            <p><strong>Applied At:</strong> {selectedLoan.createdAt}</p>
            <div className="modal-action">
              <button onClick={() => setSelectedLoan(null)} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingLoans;
