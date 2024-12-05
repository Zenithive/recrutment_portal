import React from "react";
import { FaEdit } from "react-icons/fa";

export default function ExamPage() {
  // Sample data
  const exams = [
    { id: 1, name: "John Girma", result: "25/40", resultColor: "text-green-500", time: "6:05:32" },
    { id: 2, name: "John Girma", result: "12/40", resultColor: "text-red-500", time: "10:30:54" },
    { id: 3, name: "John Girma", result: "25/40", resultColor: "text-green-500", time: "1:30:22" },
    { id: 4, name: "John Girma", result: "25/40", resultColor: "text-green-500", time: "00:30:56" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Exam</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <span className="text-lg font-medium">+ Create Exam</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left text-gray-700 font-semibold px-6 py-4 border-b">Name</th>
              <th className="text-left text-gray-700 font-semibold px-6 py-4 border-b">Result</th>
              <th className="text-left text-gray-700 font-semibold px-6 py-4 border-b">Time remains</th>
              <th className="text-center text-gray-700 font-semibold px-6 py-4 border-b">Edit</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-gray-800">#{index + 1} {exam.name}</td>
                <td className={`px-6 py-4 border-b ${exam.resultColor}`}>{exam.result}</td>
                <td className="px-6 py-4 border-b text-gray-800">{exam.time}</td>
                <td className="px-6 py-4 border-b text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


