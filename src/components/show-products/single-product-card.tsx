"use client"
import Image from 'next/image'
import React from 'react'
import {motion} from "framer-motion"
import { ProductTypes } from '../type'
import Link from "next/link";
import { useCartStore } from '@/features/productSlice'

const SingleProductCard = ({_id,category,desc,image,name,price}:ProductTypes) => {
  const {addToCart} =useCartStore()
 
  return (
     <Link href={`/product/${_id}`}  className="h-[350px] min-w-[260px] shadow-lg rounded-2xl  relative">
      <div className="h-[200px] relative w-full  flex rounded-2xl items-center justify-center z-0">
          <Image src={image[0]} fill alt={name}  className="w-[200px] !z-0 h-[200px] object-cover rounded-2xl"/>
      </div>
      <div className="p-2 flex flex-col items-center">
         <div className="capitalize mt-2 text-xl font-semibold">{name}</div>       
         <div className="capitalize mt-2 text-xl font-semibold">$ {price}</div>       
         <motion.button
          onClick={(e) => {
              e.stopPropagation(); 
              e.preventDefault();  
              addToCart({
                id:_id,category,image:image[0],name,price,initialQuantity:1,quantity:1
              })
            }}
        whileTap={{ scale: 0.95 }}
        className={`bg-black w-full mt-2 rounded-[20px] pointer-events-auto text-white font-medium cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-black/50`}
      >
        Add to cart
      </motion.button>
          </div> 
     </Link>
  )
}

export default SingleProductCard