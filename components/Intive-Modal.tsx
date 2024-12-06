"use client";

type InviteModalProps = {
  testId: number;
  onClose: () => void;
};

const InviteModal: React.FC<InviteModalProps> = ({ testId, onClose }) => {
  // console.log(`testId`, testId);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-black">Invite Modal</h2>
        <p className="text-black">This is the invite modal for Test ID: {testId}</p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
