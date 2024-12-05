'use client'

import React, { useState } from "react";
import { FiHome, FiFileText, FiClipboard, FiUser } from "react-icons/fi"; // Import icons

const Sidebar = () => {
  const [active, setActive] = useState<string>("Register");

  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={24} /> },
    { name: "Exams", icon: <FiClipboard size={24} /> },
    { name: "Register", icon: <FiUser size={24} /> },
    { name: "Reports", icon: <FiFileText size={24} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white flex flex-col items-start pt-10 space-y-4 px-4">
      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={() => setActive(item.name)}
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