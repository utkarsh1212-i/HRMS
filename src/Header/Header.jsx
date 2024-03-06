import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="bg-white-800">
            <header className="header">
                <div className="logo">
                    <Link to="/">DashBoard</Link>
                    <ul>
                        <Link to="/login">
                            <FaSignInAlt />
                            Login
                        </Link>

                        <Link to="/register">
                            <FaUser />
                            Register
                        </Link>
                    </ul>
                </div>
            </header>
        </nav>

    )
}
