'use client';

import React, { useState } from "react";
import { FiHome, FiFileText, FiClipboard, FiUser } from "react-icons/fi"; // Import icons
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname and useRouter hooks

const Sidebar = () => {
  const [active, setActive] = useState<string>("Dashboard");
  const router = useRouter(); // Create router instance
  const pathname = usePathname(); // Get the current path

  // Don't render the Sidebar on the '/login' page
  if (pathname === "/login" || pathname === "/question") {
    return null;
  }

  // Menu items
  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={24} /> },
    { name: "Exams", icon: <FiClipboard size={24} /> },
    { name: "Register", icon: <FiUser size={24} /> },
    { name: "Reports", icon: <FiFileText size={24} /> },
    { name: "Create Question Paper", icon: <FiFileText size={24} /> }, // New menu item
  ];

  // Handle menu item click
  const handleClick = (itemName: string) => {
    setActive(itemName);

    // Redirect to '/add-question-paper' when the "Create Question Paper" item is clicked
    if (itemName === "Create Question Paper") {
      router.push("/add-question-paper");
    }
  };

  return (
    <div className="h-screen w-64 bg-white flex flex-col items-start pt-10 space-y-4 px-4">
      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={() => handleClick(item.name)} // Handle click with the new function
          className={`flex items-center w-full cursor-pointer p-2 rounded-lg ${
            active === item.name ? "bg-blue-500 text-white" : "text-gray-700"
          } hover:bg-blue-500 hover:text-white`}
        >
          <span className="mr-4">{item.icon}</span>
          <span className="text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
