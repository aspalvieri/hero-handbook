import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4
      xl:col-start-5 lg:col-start-4 md:col-start-3"
    >
      <div className="md:p-6 p-4">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            Page Not Found
        </h1>
        <div className="mt-4 mb-6">The page you have requested was not found.</div>
        <Link to="/" className="w-full text-white bg-heroblue-500 hover:bg-heroblue-600
          font-medium text-sm px-5 py-2.5 text-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound;
