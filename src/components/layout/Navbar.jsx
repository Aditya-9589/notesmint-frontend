import React from 'react'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center px-6 py-4 shadow-md bg-white' >

            {/* Logo  */}
            <Link to="/" className="flex items-center gap-2" >
                <img src="/logo/notesmint_logo.png" className="h-8" alt="logo-image" />
                <span className='text-xl font-bold text-green-600' >NotesMint</span>
            </Link>

            {/* Links */}
            <div className="flex gap-6 font-medium">
                <Link to="/">Home</Link>
                <Link to="/bundles">Bundles</Link>
                <Link to="/my-purchases">My Purchases</Link>
            </div>

            {/* Auth */}
            <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">
                Login
            </Link>

        </div>
    )
}

export default Navbar