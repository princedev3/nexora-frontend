"use client"
import React, { useState } from 'react'
import { useCreateProductMutation } from '../_apis_/user_index.api'
import { LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'
import { CldUploadWidget } from 'next-cloudinary';

const CreateProduct = () => {
  const [ createProduct,{isLoading}] = useCreateProductMutation()
  const [imageUrls, setImageUrls] = useState<string[]>([]);

 const handleUpload = (result: any) => {
  const newUrl = result?.info?.secure_url;
  if (newUrl) {
    setImageUrls((prev) => [...prev, newUrl]);
  }
};
  const handleCreateProduct = async(e:React.FormEvent<HTMLFormElement>)=>{
    try {
      e.preventDefault()
      const target = e.target as HTMLFormElement
      const formdata = new FormData(target)
      const price = formdata.get("price")
      const desc = formdata.get("desc")
      const category = formdata.get("category")
      const name = formdata.get("name")
      if(!price || !category || !desc || !name || !imageUrls.length){
        toast.error("please fill the form correctly")
        return
      }
     const res = await createProduct({name,category,desc,price,image:imageUrls}).unwrap()
     setImageUrls([])
     toast.success("product created")
     target.reset()
    } catch (error) {
      toast.error("something went wrong")
      console.log(error)
    }
  }

  return (
    <div className='p-5 md:p-10'>
      <h1 className="capitalize text-3xl mb-5">create product</h1>
      <form action="" onSubmit={handleCreateProduct} className="grid gap-y-5">
      <div className="grid gap-1">
        <label className='text-xl capitalize'>name</label>
        <input className='border border-gray-400 p-2 text-xl rounded-xl' type="text" required placeholder='name' name='name' />
      </div>
      <div className="grid gap-1">
        <label className='text-xl capitalize'>desc</label>
        <textarea  rows={3} className='resize-none border border-gray-400 p-2 text-xl rounded-xl'  required placeholder='desc' name='desc' />
      </div>
      <div className="grid gap-1">
        <label className='text-xl capitalize'>price</label>
        <input className='border border-gray-400 p-2 text-xl rounded-xl' type="number" required placeholder='price' name='price' />
      </div>
      <div className="grid gap-1">
        <label className='text-xl capitalize'>category</label>
      <select name="category" id="category" className="border border-gray-400 p-2 text-xl rounded-xl">
  <option value="" disabled>Select category</option>
  <option value="phones">phones</option>
  <option value="technology">technology</option>
  <option value="laptops">laptops</option>
  <option value="shoes">Shoes</option>
  <option value="accessories">Accessories</option>
</select>
      </div>
      <div className="grid gap-1">
        <label className='text-xl capitalize'>image</label>
    <CldUploadWidget
      options={{
          multiple: true, 
          maxFiles: 5,   
          sources: ["local", "unsplash"],
        }}
    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME} onSuccess={handleUpload} >
        {({ open }) => (
          <button
            onClick={() => open?.()}
            type="button"
            className="px-4 py-2 bg-[#0095D9] text-white rounded"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
          {imageUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">Uploaded Images:</p>
          <ul className="list-disc pl-5">
            {imageUrls.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      <motion.button
              type='submit'
              disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#0095D9] cursor-pointer text-white py-2 rounded-md font-semibold"
              >
       {isLoading ? (
      <LuLoaderCircle className="animate-spin h-5 w-5 mx-auto" />
    ) : (
      " create product"
    )}
    </motion.button>
      </form>
    </div>
  )
}

export default CreateProduct