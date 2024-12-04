'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset errors

    try {
      const { data, error } = await supabase
        .from('users') // Assuming your table is called 'users'
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        setError('Invalid username or password');
        return;
      }

      router.push('/dashboard'); // Redirect to the dashboard on successful login
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex w-4/5 max-w-5xl rounded-lg shadow-lg">
        {/* Left Section with Illustration */}
        <div className="hidden w-1/2 bg-gray-50 md:flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src="/path-to-illustration.png" // Replace with your image path
              alt="Login Illustration"
              className="w-3/4 mx-auto"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">ZENITHIVE</h1>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="w-full p-8 bg-white md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Let's Sign You In
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Welcome back, <br /> You have been missed!
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:underline">
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
