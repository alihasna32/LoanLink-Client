import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import useAuth from '../../../LoanLive-Server/New folder/hooks/useAuth'
import { saveOrUpdateUser } from '../../../LoanLive-Server/New folder/utilis'

const Login = () => {
  const { signIn, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { email, password } = data
    try {
      const { user } = await signIn(email, password)
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      toast.success('Login Successful')
      navigate(from, { replace: true })
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

      })

      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-30">
      <div className="w-full max-w-xl rounded-xl shadow-xl shadow-orange-200 p-6 sm:p-10 transition-colors duration-300 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">Login</h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mt-2 font-semibold">Welcome back to Loanlink</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-gray-200">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address.',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full btn-brand py-3 rounded-md text-lg transition-all duration-300"
            >
              {loading ? <CgSpinnerTwoAlt className="animate-spin m-auto" /> : 'Login'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">Or continue with</p>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 border border-gray-200 dark:border-slate-600 py-3 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <FcGoogle size={28} />
          <p className="font-medium dark:text-white">Continue with Google</p>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          "Don't have an account?"{' '}
          <Link to="/register" className="text-orange-600 hover:text-orange-700 dark:text-orange-500 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
