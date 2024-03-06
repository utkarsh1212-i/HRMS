import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import { reset, register } from '../authSlice';
import Spinner from '../../Home/Spinner';

export const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const { username, email, password, password2 } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            //if user is already loggedin(user check)
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Password do not match");
        } else {
            const userData = {
                username,
                email,
                password,
            };
            dispatch(register(userData));
        }
    };
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-20 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name='username'
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name='email'
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name='password'
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        name='password2'
                        type="password"
                        placeholder="Confirm your password"
                        value={password2}
                        onChange={onChange}
                    />
                </div>
                <div className="flex items-center flex-col justify-around">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <a
                        href="/login"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        Already have an account? Log in
                    </a>
                </div>
            </form>
        </div>
    )
}
