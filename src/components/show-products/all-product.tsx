"use client"
import React from 'react'
import { ProductTypes } from '../type'
import SingleProductCard from './single-product-card'

const AllProduct = ({allProducts,title}:{allProducts:ProductTypes[],title:string}) => {
  return (
    <div>
        <h1 className="capitalize text-xl my-7 font-semibold">{title}</h1>

        <>
           {
  allProducts && allProducts.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
   { allProducts.map(item => <SingleProductCard {...item} key={item._id} />)}
    </div>
  ) : (
    <p className="w-full text-gray-500">No products found</p>
  )
 }
   </>
    </div>
  )
}

export default AllProduct