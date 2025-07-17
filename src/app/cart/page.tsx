"use client"
import EmptyCart from '@/components/navbar/empty-cart'
import { useCartStore } from '@/features/productSlice'
import Image from 'next/image'
import React, { useState } from 'react'
import {motion} from "framer-motion"
import { useSelector } from 'react-redux'
import { UserTypes } from '@/components/type'
import { loadStripe } from '@stripe/stripe-js'
import { convertToSubcurrency } from '@/func/actions'
import { shippingCost } from '@/constants/data'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from '@/components/CheckoutPage'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const CartPage = () => {
  const{products,totalItems,incrementQuantity, decrementQuantity,removeFromCart,totalPrice,clearCart} = useCartStore()
  const user = useSelector((state:{user:UserTypes} ) => state.user)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openCheckout, setOpenCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState("");
    

  const handleCreateIntent = async()=>{
    const totalCost = totalPrice+shippingCost
        fetch("https://nexora-backend-phgo.onrender.com/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: convertToSubcurrency(totalCost),
        note,
        product: products, 
        email,
        address,
        name,
        phoneNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }

   if (!products.length) {
    return (
     <EmptyCart/>
    )
  }

  return (
      <>
          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: "flat" },
              }}
            >
              <CheckoutPage
                clientSecret={clientSecret}
                amount={totalPrice+shippingCost}
              />
            </Elements>
          ):
    <div className='p-6'>
     <h1 className="text-center mb-4 text-xl font-semibold text-[#0095D9] my-6 overflow-x-hidden">
        Checkout (<span className="text-[#0095D9]">{totalItems} items</span>){" "}
      </h1>
      <div className="grid md:grid-cols-2 gap-2">
      <div className="flex-start flex flex-col gap-5">
       {
        products.map(item=>(
          <div className='shadow flex justify-between'>
          <div key={item.id} className="flex gap-2">
             <Image className='object-cover' src={item.image} width={120} height={120} alt={item.name} />
             <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold capitalize">{item.name} </span>
                <span className="text-lg">QTY: {item.quantity} </span>
                <span className="text-lg">{item.category} </span>
                <span className="text-lg">$ {item.price} </span>
                <span onClick={()=>removeFromCart(item)} className="text-red-500 cursor-pointer capitalize">remove</span>
             </div>
          </div>
          <div className="flex flex-col">
            <span onClick={()=>incrementQuantity(item.id)} className='text-xl font-semibold cursor-pointer'>+</span>
            <span onClick={()=> decrementQuantity(item.id)} className='text-xl font-semibold cursor-pointer'>-</span>
          </div>
          </div>
        ))
       }
      </div>

        {
              openCheckout === false ?
      <div className="flex-start">
          <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className=" rounded-lg px-3 self-start grid gap-y-5">
            <h1 className="text-lg font-semibold text-[#0095D9]">
              Billing Details
            </h1>
          
            <>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Name <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="text"
                  name='name'
                  defaultValue={name}
                  onChange={e=>setName(e.target.value)}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Email <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="email"
                  name='email'
                      onChange={e=>setEmail(e.target.value)}
                 defaultValue={email}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Address <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="text"
                      onChange={e=>setAddress(e.target.value)}
                  name='address'
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Phone <span className="text-red-600">*</span>
                </div>
                <input
                    onChange={e=>setPhoneNumber(e.target.value)}
                  type="number"
                 name='phone'
                  placeholder="35853157776"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">Note</div>
                <input
                  type="text"
                  name="note"
                      onChange={e=>setNote(e.target.value)}
                  placeholder="Note"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
            </>
            <motion.button
               disabled={!phoneNumber || !email ||!name || !address }
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCheckout(true)}
              className={`bg-[#0095D9] font-semibold w-full rounded-[30px] pointer-events-auto text-white text-lg cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-teal-600/80`}
            >
              Proceed to checkout
            </motion.button>
          </motion.div>
      </div>:
      <div>
        <div className="border border-gray-300 rounded-lg p-3 text-[19px] self-start grid gap-y-3">
            <h1 className="text-xl font-semibold text-[#0095D9]">
              Order Summary
            </h1>
            <div className="grid grid-flow-col  justify-between text-gray-700 items-center">
              <span className="w-full">Total Item</span>
              <span className="">{totalItems} </span>
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Shipping & handling</span>
              <span className="w-full">€ 10</span>
              
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Estimated Tax</span>
              <span className="">vax (inclusive) </span>
            </div>

            <div className="">
              <div className="grid grid-flow-col justify-between items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Product price
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">€{totalPrice}</span>{" "}
              
                </span>
              </div>
              <div className="grid grid-flow-col justify-between  items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Total{" "}
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">$ {totalPrice + shippingCost}</span>{" "}
                </span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateIntent}
              className={`bg-[#0095D9] font-semibold w-full rounded-[30px] pointer-events-auto text-white text-lg cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-teal-600/80`}
            >
              make payment
            </motion.button>
          </div>
      </div>
            }
      </div>
    </div>
        }

      </>
  )
}

export default CartPage