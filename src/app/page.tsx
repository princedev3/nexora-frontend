"use client"
import { categories } from "@/constants/data";
import {motion} from "framer-motion"
import { useAllProductsQuery, useCategoryProductsQuery } from "./_apis_/user_index.api";
import AllProduct from "@/components/show-products/all-product";
import { useState } from "react";
import Loader from "@/components/navbar/loader";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name);
  const {data:allProducts,isLoading}= useAllProductsQuery(null)
  const {data:categoryProduct,isLoading:catLoading}= useCategoryProductsQuery(selectedCategory.toLocaleLowerCase())
  if(isLoading || catLoading){
    return <Loader/>
  }

  return (
<div className="p-5 grid gap-y-10">
  <AllProduct allProducts={allProducts}  title='Our Products'/>
  <div className="grid gap-5">
  <h1 className="text-3xl font-semibold text-center">Categories</h1>
  <div className="grid [grid-template-columns:repeat(auto-fit,400px)] gap-7 justify-center">
  {
    categories.map(item => (
      <motion.button
      onClick={() => setSelectedCategory(item.name)}
      whileHover={{ scale: 1.01}}
      whileTap={{ scale: 0.97 }}
      style={{
        backgroundImage:  `url(${item.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className="text-lg h-40  relative overflow-hidden cursor-pointer  px-4 py-2 rounded text-white w-full"
      key={item.name}
      >
        <div className="absolute bg-black/20 left-0 top-0 w-full h-full z-0"/>
        {item.name}
      </motion.button>  
    ))
  }
</div>
  <AllProduct allProducts={categoryProduct} title='Explore our Category' />
</div>
</div>
  );
}
