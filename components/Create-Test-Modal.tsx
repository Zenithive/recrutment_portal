import React, { useState } from "react";

interface CreateTestModalProps {
  show: boolean;
  onClose: () => void;
  onCreateTest: (testData: { title: string; duration: number; instructions: string }) => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ show, onClose, onCreateTest }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || !instructions) {
      setError("All fields are required");
      return;
    }
    onCreateTest({ title, duration, instructions });
    setTitle("");
    setDuration(0);
    setInstructions("");
    setError("");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Create a New Test</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Test Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (Minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Duration"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Test Instructions"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Create Test
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestModal;
