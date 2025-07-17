"use client"
import React from 'react'
import { useGetAllOrdersQuery } from '../_apis_/user_index.api'
import { useSelector } from 'react-redux'
import { UserTypes } from '@/components/type'
import Loader from '@/components/navbar/loader'

const OrderPage = () => {

 

    const user = useSelector((state:{user:UserTypes} ) => state.user)
    const {data,isLoading}= useGetAllOrdersQuery(user?.email )
    if(isLoading){
        return <Loader/>
    }
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-3 px-4 text-left">Order Date</th>
            <th className="py-3 px-4 text-left">Product(s)</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className=''>
          {data?.allOrders.map((order) => (
            <tr key={order._id} className="border-t text-lg">
              <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4">
                {order.product.map((p, i) => (
                  <span key={i} className="block">
                    • {p.name}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4">${order.amount/100}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "PAID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderPage