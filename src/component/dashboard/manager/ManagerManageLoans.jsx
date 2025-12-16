import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import toast from 'react-hot-toast';

const ManagerManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all loans
  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter loans by search text
  const filteredLoans = loans.filter((loan) =>
    loan.title.toLowerCase().includes(searchText.toLowerCase()) ||
    loan.category.toLowerCase().includes(searchText.toLowerCase())
  );

  // Delete loan
  const handleDelete = async () => {
    try {
      const res = await axiosSecure.delete(`/delete-loan/${deleteId}`);
      if (res.data.deletedCount > 0) {
        toast.success("Loan deleted successfully");
        setDeleteId(null);
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete loan");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 font-bold mb-4">Manage Loans</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by title or category..."
        className="input input-bordered w-full max-w-md mb-4 focus:outline-none focus:border-orange-500"
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-slate-700">
        <table className="table w-full">
          <thead className="bg-brand-main text-white">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img
                    src={loan.image}
                    alt=""
                    className="w-16 h-16 rounded object-cover border border-gray-200"
                  />
                </td>
                <td className="font-medium text-gray-800 dark:text-gray-200">{loan.title}</td>
                <td className="text-gray-600 dark:text-gray-300">{loan.interest}%</td>
                <td>
                  <span className="badge badge-ghost bg-orange-50 text-orange-600 border-none">{loan.category}</span>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/update-loan/${loan._id}`)
                    }
                    className="btn btn-sm btn-warning text-white"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setDeleteId(loan._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this loan?</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Confirm Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManagerManageLoans;