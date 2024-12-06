'use client'
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Assuming you have this utility to create the Supabase client

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  // Function to generate a random password
  const generateRandomPassword = (length: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset errors
    setSuccess(false);

    if (!username) {
      setError("Username is required");
      return;
    }

    const password = generateRandomPassword(12); // Generate a 12-character random password

    try {
      // Insert the new user into the 'users' table
      const { data, error } = await supabase.from("users").insert([
        {
          username,
          password,
          islogin: false,
          usertype: "student",
        },
      ]);

      if (error) {
        setError("Something went wrong while creating the user.");
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create User</h2>
        <p className="text-center text-gray-600 mb-4">Enter a username, the rest will be auto-generated</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">User created successfully!</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}



