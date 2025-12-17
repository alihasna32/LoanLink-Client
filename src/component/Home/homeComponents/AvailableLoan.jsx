import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Link } from 'react-router';

const AvailableLoan = () => {
  const axiosPublic = useAxiosPublic();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ['allLoans'],
    queryFn: async () => {
      const res = await axiosPublic.get('available-loans');
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const loanList = Array.isArray(loans) ? loans : [];

  return (
    <div className="pt-20 ">
      <div className="w-10/12 mx-auto max-w-7xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 inline-block">
          Available Loans
        </h2>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-8">

          {loanList.map((loan) => (
            <div data-aos="fade-up"
              key={loan._id}
              className="bg-white dark:bg-slate-800 shadow-md transition-transform duration-300 rounded-lg overflow-hidden flex flex-col border border-orange-100 dark:border-slate-700"
            >
              {/* Image */}
              <img
                src={loan.image}
                alt={loan.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-2">
                  {loan.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {loan.shortDesc}
                </p>

                {/* Max Limit */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    Max Limit: ${loan.maxLimit}
                  </span>

                  {/* View Details */}
                  <Link
                    to={`/all-loans/${loan._id}`}
                    className="btn-brand px-4 py-2 rounded-md text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AvailableLoan;
