import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import useRole from "../hooks/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [role, roleLoading] = useRole();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${id}`);
      return res.data;
    },
  });

  if (isLoading || roleLoading) return <LoadingSpinner />;

  const handleApply = () => {
    if (!user) {
      toast.error("You must login first!");
      return navigate("/login");
    }
    if (role === "admin" || role === "manager") {
      return toast.error("Admins & Managers cannot apply for loans!");
    }
    navigate(`/loan-application/${loan._id}`);
  };


  const numericInterest = parseFloat(loan.interest) || 0;
  const numericMaxLimit = parseFloat(loan.maxLimit) || 0;


  const emiPlans = loan.emiPlans?.map(plan => ({
    duration: parseInt(plan.duration) || 1,
    monthlyPayment:
      plan.monthlyPayment ??
      Math.round((numericMaxLimit * numericInterest) / 100 / (parseInt(plan.duration) || 1))
  })) || [];

  return (
    <div className="w-11/12 md:w-9/12 mx-auto py-30 max-w-5xl">
      <img
        src={loan.image}
        alt={loan.title}
        className="w-1/2 mx-auto h-72 object-cover rounded-xl shadow-lg border-4 border-white dark:border-slate-700"
      />

      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mt-6">{loan.title}</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h3 className=" text-sm text-gray-500 dark:text-gray-400">Category</h3>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{loan.category}</p>
        </div>

        <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h3 className=" text-sm text-gray-500 dark:text-gray-400">Interest Rate</h3>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{loan.interest}%</p>
        </div>

        <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h3 className=" text-sm text-gray-500 dark:text-gray-400">Max Limit</h3>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">${loan.maxLimit}</p>
        </div>
      </div>

      <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {loan.shortDesc}
      </p>

      {emiPlans.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
            Available EMI Plans
          </h2>
          <ul className="space-y-3">
            {emiPlans.map((plan, index) => (
              <li
                key={index}
                className="p-4 shadow-sm border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg flex justify-between"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">{plan.duration} months</span>
                <span className="text-orange-600 font-semibold">
                  ${plan.monthlyPayment} / month
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {user && role !== "admin" && role !== "manager" && (
        <div className="mt-10">
          <button
            onClick={handleApply}
            className="btn btn-brand w-full md:w-auto px-8 py-3 text-lg"
          >
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanDetails;
