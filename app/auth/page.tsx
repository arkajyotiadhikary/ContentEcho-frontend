"use client"
import React, { useState } from 'react';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        <form className="space-y-6">
          {!isSignIn && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">{isSignIn ? 'Don\'t have an account?' : 'Already have an account?'} <button onClick={toggleAuthMode} className="text-indigo-500 hover:underline focus:outline-none">{isSignIn ? 'Sign Up' : 'Sign In'}</button></p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
