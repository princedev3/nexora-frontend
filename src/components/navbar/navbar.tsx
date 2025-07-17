"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import { logout } from '@/features/userSlice';
import { useRouter } from 'next/navigation';
import { UserTypes } from '../type';
import { useCartStore } from '@/features/productSlice';

const Navbar = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const[open,setOpen]=useState(false)
    const user = useSelector((state:{user:UserTypes} ) => state.user)
    
  const cartQuantity = useCartStore((state) => state.totalItems);
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogut = ()=>{
      dispatch(logout())
      router.push("/login")
    }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div className='h-24 bg-gray-200 flex items-center px-8 justify-between'>
        <Link href={"/"} className='text-2xl font-semibold cursor-pointer'>Nexora</Link>
        <div className="relative flex items-center gap-3">
          <Link href={"/cart"} className="relative cursor-pointer">
            <IoCartOutline className='w-7 h-7 cursor-pointer'/>
            {
              cartQuantity >0 && 
            <span className="absolute font-semibold text-lg -top-3 -right-3 text-white bg-[#0095D9] h-6 w-6 rounded-full flex items-center justify-center">  {cartQuantity}</span>
            }
          </Link>
            <div onClick={()=>setOpen(!open)} className="flex items-center justify-center cursor-pointer">
            <h1 className="text-lg capitalize">actions</h1>
            <IoMdArrowDropdown  className='w-7 h-7'/>
            </div>
            <div ref={dropdownRef} className={`${!open?"hidden":""}  absolute -bottom-[125px] z-10 w-[140px] right-0 bg-gray-200 rounded-2xl p-2 shadow-2xl flex flex-col gap-3`} >
                {
                  user?
                  <>
                  <Link href={"/orders"}  onClick={()=>setOpen(false)} className="text-lg capitalize">order</Link>
                  <span  onClick={handleLogut} className="text-lg cursor-pointer capitalize">Logout</span>
                  {
                    user && user.isAdmin===true  && 
                  <Link href={"/create-product"}  onClick={()=>setOpen(false)} className="text-lg capitalize">create-product</Link>
                  }
                  </>
                  :
                  <>
                <Link href={"/register"} onClick={()=>setOpen(false)} className="text-lg capitalize">register</Link>
                <Link href={"/login"} onClick={()=>setOpen(false)} className="text-lg capitalize">Login</Link>
                  </>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar