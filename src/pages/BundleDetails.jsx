import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { fetchBundleById } from "../store/slices/bundleSlice";
// ----    import Navbar from "../components/layout/Navbar";    ----
import { createOrder } from "../services/paymentService";
import apiClient from '../services/apiClient';

// import { useSelector } from "react-redux";



const BundleDetails = ({ openAuth }) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { singleBundle, loading } = useSelector(
        (state) => state.bundles
    );

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBundleById(id));
    }, [dispatch, id]);

    const handlePayment = async () => {

        // AUTH check 
        if (!token) {
            toast.error("Please login or register first");
            openAuth();     // open modal gloabally
            return;
        }

        try {
            const order = await createOrder(singleBundle._id);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,

                handler: async function (response) {
                    await apiClient.post("/payment/verify", response);
                    alert("Payment Successful");
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        }  catch (error) {
            console.error(error);
            toast.error("Payment failed. Try again.");
        }
    };

    if (loading || !singleBundle) return <p>Loading...</p>;

    return (
        <>
            {/* <Navbar /> */}

            <div className='p-6 max-w-4xl mx-auto' >

                <img
                    src={singleBundle.thumbnailUrl}
                    alt=""
                    className="w-full h-64 object-cover rounded"
                />

                <h1 className='text-3xl font-bold mt-4' >
                    {singleBundle.title}
                </h1>

                <p className='text-gray-600 mt-3' >
                    {singleBundle.description}
                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-4">
                    ₹{singleBundle.price}
                </h2>

                <button
                    onClick={handlePayment}
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
                    Buy Now
                </button>

            </div>
        </>
    )
}

export default BundleDetails