import React from "react";

interface InstructionCardProps {
  onOkay: () => void;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ onOkay }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Test Instructions
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>The paper duration is <span className="font-semibold">30 minutes</span>.</li>
        <li>If you minimize the page, you will receive a <span className="font-semibold">final warning</span>.</li>
        <li>Do not close this page or you will <span className="font-semibold">lose access</span>.</li>
        <li>Cheating is strictly prohibited and will lead to disqualification.</li>
        <li>The test is worth <span className="font-semibold">40 marks</span>.</li>
      </ul>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onOkay}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
);

export default InstructionCard;
