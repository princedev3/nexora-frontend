"use client"
import { useGetSingleProductsQuery } from '@/app/_apis_/user_index.api'
import Loader from '@/components/navbar/loader'
import AllProduct from '@/components/show-products/all-product'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import {motion} from "framer-motion"
import { useCartStore } from '@/features/productSlice'

const SingleProduct = () => {
  const [selectedImage,setSelectedImage]= useState(0)
   const {addToCart} =useCartStore()
  const {id} =useParams()
  const {data,isLoading} = useGetSingleProductsQuery(id)

  if(isLoading){
    return <Loader/>
  }
  if(data===undefined){
    return <p className="w-full text-gray-500">No products found</p>
  }
  return ( 
    <div className='p-5 grid gap-6'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="grid gap-y-5 self-start">
        <div className="relative h-[320px] rounded-2xl overflow-hidden">
         <Image src={data?.product?.image[selectedImage]} alt={data?.product?.name} fill className='object-cover' />
        </div>
        <div className="grid grid-flow-col auto-cols-max justify-center items-center gap-3 mx-auto">
          {
            data?.product?.image.map((each:string,index:number)=>(
              <div onClick={() => setSelectedImage(index)} key={each} className={`${selectedImage===index?"bg-black":"bg-black/60"} cursor-pointer w-4 h-4 rounded-full`} />
            ))
          }
        </div>
      </div>

        <div className="flex flex-col gap-y-2 self-start">
          <p className="text-2xl">{data?.product?.name}</p>
          <p className="text-xl">${data?.product?.price}</p>
          <p className="text-xl">{data?.product?.desc}</p>
                <motion.button
                onClick={()=>{
                  addToCart({
                     id:data?.product?._id,category:data?.product?.category,image:data?.product?.image[0],name:data?.product?.name,price:data?.product?.price,initialQuantity:1,quantity:1
                  })
                }}
                        type='submit'
                        disabled={isLoading}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full bg-[#0095D9] cursor-pointer text-white py-2 rounded-md font-semibold"
                        >
                Add to Cart
              </motion.button>
        </div>
      </div>
      <div className="">
          <AllProduct allProducts={data?.relatedProducts} title='Similiar Products' />
      </div>
    </div>
  )
}

export default SingleProduct