"use client";

import { login } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-[#1a1a1a] mb-4">
            Login
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a]"
              placeholder="Your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#333333]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a]"
              placeholder="Your password"
            />
          </div>

          <div className="mb-6">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              formAction={login}
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm text-[#666666]">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
