import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'

import { useNavigate } from "react-router-dom";
import { login , reset } from '../authSlice';
import Spinner from '../../Home/Spinner';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        if(isSuccess || user){
            navigate('/');
        }

        dispatch(reset());
    } , [user,isError,isSuccess,message,navigate,dispatch]);


    
    const onChange = (e) => {
         setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]  : e.target.value
         }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { 
            email,  
            password
          };

          dispatch(login(userData));
        // Handle form submission (e.g., login request)
    };

    if(isLoading){
        return <Spinner />
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-20 pt-6 pb-8 mb-4">
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
                <div className="mb-6">
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
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                <div className='mt-4'>
                    <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}
