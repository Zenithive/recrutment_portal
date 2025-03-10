'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image"; // Import the Image component from Next.js
import Login from "@/app/Login.png"; // Correctly import the image
import Cookies from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(""); // Reset errors

  //   try {
  //     // Check if user exists with correct credentials
  //     const { data, error } = await supabase
  //       .from("users") // Assuming your table is called 'users'
  //       .select("*")
  //       .eq("username", username)
  //       .eq("password", password)
  //       .single();

  //     if (error || !data) {
  //       setError("Invalid username or password");
  //       return;
  //     }

     
      
  //     // If the user is logged in (islogin: true), prevent redirection
  //     if (data.islogin) {
  //       setError("You are already logged in, and started the test.");
  //       return;
  //     }

  //     // If the username and password match and islogin is false, update islogin to true
  //     const { error: updateError } = await supabase
  //       .from("users")
  //       .update({ islogin: true })
  //       .eq("username", username);

  //     if (updateError) {
  //       setError("Something went wrong while updating login status.");
  //       return;
  //     }

  //     // Store username and usertype in session storage
  //     sessionStorage.setItem("username", data.username);
  //     sessionStorage.setItem("usertype", data.usertype);
  //     sessionStorage.setItem("test_id", data.test_id);

  //     // Redirect to the question page after successful login and update
  //     router.push("/question");

  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setError("Something went wrong, please try again.");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset errors
  
    try {
      // Check if user exists with correct credentials
      const { data, error } = await supabase
        .from("users") // Assuming your table is called 'users'
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();
  
      if (error || !data) {
        setError("Invalid username or password");
        return;
      }
  
      // If the usertype is "admin", skip the `islogin` check
      if (data.usertype === "admin") {
        // Store data in cookies
        Cookies.set("username", data.username, { expires: 5 / 24 }); // Cookie expires in 1 day
        Cookies.set("usertype", data.usertype, { expires: 5 / 24 });
        Cookies.set("password", data.password, { expires: 5 / 24 });
  
        // Redirect to the admin dashboard
        // router.push("/dashboard-for-admin");
        router.push("/dashboard-for-admin");
        return;
      }
  
      // For non-admin users, check if the user is already logged in (islogin: true)
      if (data.islogin) {
        setError("You are already logged in and started the test.");
        return;
      }
  
      // If the username and password match and islogin is false, update islogin to true
      const { error: updateError } = await supabase
        .from("users")
        .update({ islogin: true })
        .eq("username", username);
  
      if (updateError) {
        setError("Something went wrong while updating login status.");
        return;
      }
  
      // Store data in cookies for non-admin users
      Cookies.set("username", data.username, { expires: 5 / 24 });
      Cookies.set("usertype", data.usertype, { expires: 5 / 24 });
      Cookies.set("test_id", data.test_id, { expires: 5 / 24 });
  
      // Redirect to the question page for non-admin users
      router.push("/question");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex w-full max-w-screen-xl h-[70vh] rounded-lg shadow-lg">
        {/* Left Section with Illustration */}
        <div className="hidden w-1/2 h-full bg-white md:flex items-center justify-center p-8 rounded-tl-lg rounded-bl-lg">
          <div className="text-center">
            <Image src={Login} alt="Login Icon" width={400} height={400} />
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="w-full p-8 bg-white md:w-1/2 rounded-lg shadow-lg mx-auto h-full">
          <h2 className="text-4xl font-bold text-center text-gray-800">
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
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <a href="#" className="text-indigo-600 hover:underline">
              {/* Forgot Password? */}
            </a>
          </div>
          <div className="mt-4 text-sm text-center text-gray-600">
            <a href="#" className="font-medium text-indigo-600 hover:underline">
              {/* Register Now */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
