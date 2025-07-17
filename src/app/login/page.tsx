'use client'
import { motion } from 'framer-motion'
import { LoaderCircle, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../_apis_/user_index.api';
import { toast } from 'react-toastify';

export default function LoginPage() {

 const router = useRouter();
 const [login,{isLoading}]= useLoginMutation()
   

const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    try {
        e.preventDefault()
         const target = e.target as HTMLFormElement
         const formdata= new FormData(target)
         const email = formdata.get("email")
         const password = formdata.get("password")
         const res=  await login({email,password}).unwrap()
        if(res.status===200){
           target.reset()
           toast.success("login successful")
          router.push("/")
           return
         }
         toast.error("check credentials")
        } catch (error) {
      toast.error("check credentials")
        console.log(error)
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-md p-8 w-full max-w-3xl border border-gray-300"
      >
        <h2 className="text-xl font-semibold text-[#0095D9] border-l-4 pl-2 border-[#0095D9] mb-6">
          LOG IN
        </h2>
        <form onSubmit={handleLogin}  className="space-y-4">
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
             <Mail/>
            </span>
            <input
              type="email"
              name='email'
              required
              placeholder="marvinprince232@gmail.com"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
              <Lock/>
            </span>
            <input
              type="password"
              name='password'
              required
              minLength={5}
              placeholder="••••••••"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <motion.button
          disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#0095D9] cursor-pointer text-white py-2 rounded-md font-semibold"
          >
   {isLoading ? (
  <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
) : (
  " Log In"
)}
</motion.button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-red-600 font-medium">
          <Link href="/forgot-password" className="text-xl cursor-pointer">Forgot Password?</Link>
          <Link href="/register" className="text-xl cursor-pointer">Register</Link>
        </div>
      </motion.div>
    </div>
  )
}
