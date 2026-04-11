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

import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';



const BundleDetails = ({ openAuth }) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { singleBundle, loading } = useSelector(
        (state) => state.bundles
    );

    const { token, user } = useSelector((state) => state.auth);

    // const isPurchased = user?.purchasedBundles?.includes(id);
    const isPurchased = user?.purchasedBundles?.some(
        (b) => b.toString() === id
    );

    const navigate = useNavigate();

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
            const res = await createOrder(singleBundle._id);

            // ----    razorpay not woring debugging    ----
            console.log("Sending bundleId: ", singleBundle._id);

            const order = res.order;

            // ------    Console for debugging razorpay / payment fail    -----
            console.log("ORDER:", order)    // Debug

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,

                // ------    Not sure about this   ----
                name: "NotesMint",
                description: singleBundle.title,

                handler: async function (response) {
                    // await apiClient.post("/payment/verify", response);
                    // const res = await apiClient.post("/payment/verify", {
                    await apiClient.post("/payment/verify", {
                        ...response,
                        bundleId: singleBundle._id,     // Important Fix
                    });

                    // Fetch updated user 
                    const userRes = await apiClient.get("/auth/me");

                    // update Redux 
                    dispatch(setCredentials({
                        user: userRes.data.user,
                        token
                    }))

                    // alert("Payment Successful");
                    toast.success("Payment Successful");
                },

                theme: {
                    color: "#16A34A",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
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

                {/* <button
                    onClick={handlePayment}
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
                    Buy Now
                </button> */}

                {isPurchased ? (
                    <button
                        onClick={() => navigate("/my-purchases")}
                        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Go to My Purchases
                    </button>
                ) : (
                    <button
                        onClick={handlePayment}
                        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Buy Now
                    </button>
                )}

            </div>
        </>
    )
}

export default BundleDetails