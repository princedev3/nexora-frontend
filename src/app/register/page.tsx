'use client'
import { motion } from 'framer-motion'
import { LoaderCircle, Lock, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import Link from "next/link"
import { useRegisterMutation } from '../_apis_/user_index.api'
import { useRouter } from 'next/navigation'
import {toast } from 'react-toastify';

export default function RegisterPage() {
 const [register,{isLoading,isSuccess}]=  useRegisterMutation()
 const router = useRouter()

const handleRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
    try {
        e.preventDefault()
        const target = e.target as HTMLFormElement
         const formdata= new FormData(target)
         const email = formdata.get("email")
         const name = formdata.get("name")
         const password = formdata.get("password")
         const res=  await register({email,name,password}).unwrap()
       if(res.status===200){
        target.reset()
        toast.success("registeration successful")
        router.push("/login")
        return
      }
      toast.error("check credentials")
    } catch (error) {
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
        <h2 className="text-xl uppercase font-semibold text-[#0095D9] border-l-4 pl-2 border-[#0095D9] mb-6">
          register
        </h2>
        <form onSubmit={handleRegister}  className="space-y-4">
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
            <User />
            </span>
            <input
            required
              type="name"
              name="name"
              placeholder="John Doe"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
            <Mail/>
            </span>
            <input
            required
              type="email"
              name="email"
              placeholder="marvinprince232@gmail.com"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
             <Lock />
            </span>
            <input
              type="password"
              required
              name="password"
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
  "Register"
)}
  </motion.button>
        </form>
        <div className="flex justify-end mt-4 text-sm text-red-600 font-medium">
          <Link href="/login" className="text-xl cursor-pointer  justify-end">Login</Link>
        </div>
      </motion.div>
    </div>
  )
}
