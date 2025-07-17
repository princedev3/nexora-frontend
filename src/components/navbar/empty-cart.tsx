"use client";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="w-full h-[400px] bg-white shadow-lg rounded-2xl my-8 flex items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center">
       
        <div className="relative w-[120px] h-[120px] rounded-full bg-teal-50 shadow-inner flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#0095D9"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#0095D9"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-md p-1 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#0095D9"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#0095D9"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
</div>

        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-semibold text-gray-800">Your cart is empty</h1>
        <p className="text-md text-gray-500 text-center max-w-md">
          Browse our categories and discover our best deals on trendy shades and more.
        </p>

        {/* Button */}
        <button className="relative overflow-hidden bg-[#0095D9] px-6 py-3 hover:bg-[#6398b0] text-white text-lg font-medium rounded-full group transition-all duration-300">
          <Link href="/" className="relative z-10">
            Start Shopping
          </Link>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></span>
        </button>
      </div>
    </div>
  );
}
