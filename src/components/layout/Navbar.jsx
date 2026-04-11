
// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/slices/authSlice';
import AuthModal from "../modal/AuthModal";


const Navbar = ({ openAuth }) => {

    // const [open, setOpen] = useState(false);

    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <img src="/logo/notesmint_logo.png" className="h-8" alt="logo-image" />
                <span className="text-xl font-bold text-green-600">NotesMint</span>
            </Link>

            {/* Links */}
            <div className="flex gap-6 font-medium">
                <Link to="/">Home</Link>
                <Link to="/bundles">Bundles</Link>

                {/* Hide "My Purchases" if not logged in */}
                {/* <Link to="/my-purchases">My Purchases</Link> */}
                {token && <Link to="/my-purchases">My Purchases</Link>}

            </div>

            {/* ✅ AUTH SECTION */}
            <div>
                {token ? (
                    <div className="flex items-center gap-4">
                        <span className="font-medium">
                            {user?.name || "User"}
                        </span>

                        <button
                            onClick={() => dispatch(logout())}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        // onClick={() => setOpen(true)}
                        onClick={openAuth}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Login / Register
                    </button>
                )}
            </div>

            {/* ✅ MODAL */}
            {/* <AuthModal isOpen={open} onClose={() => setOpen(false)} /> */}
        </div>
    );
}

export default Navbar