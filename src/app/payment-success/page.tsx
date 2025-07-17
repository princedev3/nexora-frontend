"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link';
import { useCartStore } from '@/features/productSlice';
import { toast } from 'react-toastify';

const page = () => {
    const searchParams = useSearchParams()
      const{clearCart} = useCartStore()
    const payment_intent = searchParams.get("payment_intent")
   useEffect(()=>{
          if (!payment_intent) return; 
        const updateOrder = async()=>{
          const res=  await fetch(`https://nexora-backend-phgo.onrender.com/api/success?paymentIntent=${payment_intent}`,{
             method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
           })

           if(res.status===200){
            toast.success("payment confirmed")
         clearCart()
           }
        }
        updateOrder()
    },[payment_intent])
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
      >
        <FaRegCheckCircle  className="text-[#0095D9] mx-auto w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. A confirmation email has been sent to your inbox.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="bg-[#0095D9] hover:bg-[#5d8ca2] text-white py-2 rounded-full font-semibold transition"
          >
            Go to Home
          </Link>
          <Link
            href="/orders"
            className="border border-[#097bb0] text-[#0095D9] py-2 rounded-full font-medium hover:bg-green-50 transition"
          >
            View Your Orders
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default page