"use client";

import React from "react";

export default function RegisterPage() {
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Girma", college: "Silver Oak University" },
    { id: 2, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 3, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 4, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 5, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 6, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 7, name: "Yohannes Girma", college: "Silver Oak University" },
    { id: 8, name: "Yohannes Girma", college: "Silver Oak University" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
                  #
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
                  Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-700">
                  College Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    #{index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {user.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-700">
                    {user.college}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13h6m2 0a2 2 0 002-2m0 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m16 0a2 2 0 00-2 2m0 4H7m2 4h6"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



