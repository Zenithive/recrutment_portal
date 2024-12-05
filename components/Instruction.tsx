import React, { useState } from "react";

export default function InstructionComponent() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome John,
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Are you ready to take your exam
        </p>
        <ul className="text-left text-gray-700 mb-6 space-y-2">
          <li>&bull; The exam is 20 minutes long.</li>
          <li>&bull; If you leave the bar then the exam will be completed.</li>
          <li>&bull; The exam will open in a single desktop.</li>
          <li>&bull; The exam is 20 minutes long.</li>
          <li>&bull; If you leave the bar then the exam will be completed.</li>
          <li>&bull; The exam will open in a single desktop.</li>
        </ul>
        <div className="flex items-center justify-center mb-6">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="agreeTerms" className="ml-2 text-gray-700">
            Agreed to all terms
          </label>
        </div>
        <button
          className={`px-6 py-2 text-white rounded-lg font-medium ${
            agreed
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!agreed}
        >
          Take exam
        </button>
      </div>
    </div>
  );
}