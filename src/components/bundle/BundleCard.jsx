import React from 'react'
import { Link } from "react-router-dom";

const BundleCard = ({ bundle }) => {
    console.log(bundle);
    return (
        <div className='border rounded-lg shadow-md p-4 hover:shadow-lg transition' >

            <img 
                src={bundle.thumbnailUrl}
                alt={bundle.title}
                className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3" > 
                {bundle.title}
            </h2>

            <p className="text-gray-600 text-sm mt-2" >
                {bundle.description}
            </p>

            <div className="flex justify-between items-center mt-4" >
                <span className="text-green-600 font-bold" >
                    ₹{bundle.price}
                </span>

                <Link
                    to={`/bundle/${bundle._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    View
                </Link>
            </div>

        </div>
    )
}

export default BundleCard