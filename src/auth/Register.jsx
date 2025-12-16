import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { imageUpload, saveOrUpdateUser } from '../../../LoanLive-Server/New folder/utilis'
import useAuth from '../../../LoanLive-Server/New folder/hooks/useAuth'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { name, image, email, password, role } = data
    const imageFile = image[0]

    // Password Validation
    if (!/[A-Z]/.test(password)) return toast.error('Password must contain an Uppercase letter')
    if (!/[a-z]/.test(password)) return toast.error('Password must contain a Lowercase letter')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')

    try {
      const imageURL = await imageUpload(imageFile)
      const result = await createUser(email, password)
      await saveOrUpdateUser({ name, email, image: imageURL, role })
      await updateUserProfile(name, imageURL)

      toast.success('Signup Successful')
      navigate(from, { replace: true })
      console.log(result)
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL || null,
        role: "borrower"

      })
      toast.success('Signup Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-30">
      <div className="w-full max-w-xl rounded-xl shadow-xl shadow-orange-200 p-6 sm:p-10 transition-colors duration-300 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold dark:text-white">Register</h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mt-2 font-semibold">Welcome to Loanlink</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">Role</label>
            <select
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full py-3 border border-dashed border-orange-400 rounded cursor-pointer dark:text-gray-300"
              {...register('image')}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">Email Address</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">Password</label>
            <input
              type="password"
              placeholder="******"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full btn-brand py-3 rounded-md text-lg">
            {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Continue'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">Register with social accounts</p>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 border border-gray-200 dark:border-slate-600 py-3 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <FcGoogle size={30} />
          <p className="font-medium dark:text-white">Continue with Google</p>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:text-orange-700 dark:text-orange-500 hover:underline font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
