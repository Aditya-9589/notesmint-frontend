
// import React, { useState } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/slices/authSlice';
import AuthModal from "../modal/AuthModal";


const Navbar = ({ openAuth }) => {

    // const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="relative">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 shadow-md bg-white">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo/notesmint_logo.png" className="h-7 sm:h-8" alt="logo-image" />
                    <span className="text-lg sm:text-xl font-bold text-green-600">NotesMint</span>
                </Link>

                {/* Desktop Links — hidden on mobile */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link to="/">Home</Link>
                    <Link to="/bundles">Bundles</Link>

                    {/* Hide "My Purchases" if not logged in */}
                    {/* <Link to="/my-purchases">My Purchases</Link> */}
                    {token && <Link to="/my-purchases">My Purchases</Link>}

                </div>

                {/* Desktop AUTH SECTION — hidden on mobile */}
                <div className="hidden md:block">
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

                {/* Hamburger Button — visible on mobile only */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
                    <div className="flex flex-col px-4 py-3 gap-3 font-medium">
                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/bundles" onClick={() => setMenuOpen(false)}>Bundles</Link>

                        {token && (
                            <Link to="/my-purchases" onClick={() => setMenuOpen(false)}>
                                My Purchases
                            </Link>
                        )}

                        <hr className="border-gray-200" />

                        {token ? (
                            <div className="flex items-center justify-between">
                                <span className="font-medium">
                                    {user?.name || "User"}
                                </span>
                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        setMenuOpen(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    openAuth();
                                    setMenuOpen(false);
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded w-full"
                            >
                                Login / Register
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* ✅ MODAL */}
            {/* <AuthModal isOpen={open} onClose={() => setOpen(false)} /> */}
        </div>
    );
}

export default Navbar