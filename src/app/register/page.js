"use client";

import { signup } from "./actions";

export default function RegisterPage() {
  return (
    <form action={signup}>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Register</h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 mt-1 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
