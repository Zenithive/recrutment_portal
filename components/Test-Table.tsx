"use client";

import { useState } from "react";
import InviteModal from "./Intive-Modal";  // Import the InviteModal

type TestsTableProps = {
  tests: any[];
  onAddQuestionClick: (test: any) => void;
  onSelectTest: (test: any) => void;
};

const TestsTable: React.FC<TestsTableProps> = ({ tests, onAddQuestionClick, onSelectTest }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

  const handleInviteClick = (testId: number) => {
    setSelectedTestId(testId);
    setShowInviteModal(true);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-black">All Tests</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left text-black">Title</th>
            <th className="py-2 px-4 text-left text-black">Duration</th>
            <th className="py-2 px-4 text-left text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr
              key={test.id}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectTest(test)} // Set the selected test when the row is clicked
            >
              <td className="py-2 px-4 text-black">{test.title}</td>
              <td className="py-2 px-4 text-black">{test.duration} min</td>
              <td className="py-2 px-4 text-black">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when button is clicked
                    onAddQuestionClick(test); // Pass the selected test to the callback
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Add Question
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when button is clicked
                    handleInviteClick(test.testid); // Open the invite modal
                  }}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Invite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Invite Modal */}
      {showInviteModal && selectedTestId !== null && (
        <InviteModal
          testId={selectedTestId}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
};

export default TestsTable;
