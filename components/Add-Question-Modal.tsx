import React, { useState } from "react";
import * as XLSX from "xlsx";

interface AddQuestionModalProps {
  show: boolean;
  onClose: () => void;
  onAddQuestion: (questionData: {
    question: string;
    options: string[];
    correctOption: number;
  }[]) => void; // Modified to accept an array of questions
  test: any; // Add this to allow passing the selected test
} 

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  show,
  onClose,
  onAddQuestion,
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState<number>(-1);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleAddSingleQuestion = () => {
    if (!question || correctOption === -1) {
      setError("Please fill in the question and select the correct option.");
      return;
    }

    onAddQuestion([{ question, options, correctOption }]);
    handleCloseModal();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFileError("Please upload a valid file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const parsedQuestions = rows.slice(1).map((row) => ({
        question: row[0],
        options: row.slice(1, 5),
        correctOption: row[5],
      }));

      onAddQuestion(parsedQuestions);
      handleCloseModal();
    };

    reader.readAsBinaryString(file);
  };

  const handleCloseModal = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(-1);
    setError("");
    setFileError("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Add Question</h2>

        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter Question"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              value={opt}
              onChange={(e) =>
                setOptions((prev) =>
                  prev.map((opt, i) => (i === index ? e.target.value : opt))
                )
              }
              className="mt-1 p-2 w-full border rounded-md mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correct Option</label>
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value={-1}>Select Correct Option</option>
            {options.map((opt, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Questions File</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {fileError && <p className="text-red-500">{fileError}</p>}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddSingleQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Add Question
          </button>
          <button
            onClick={handleCloseModal}
            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
