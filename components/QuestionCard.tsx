import React from "react";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  imageSrc: string;
  options: string[];
  timer: string;
  selectedOption: string; // Add this prop
  onOptionSelect: (selectedOption: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  question,
  imageSrc,
  options,
  timer,
  selectedOption, // Receive this prop
  onOptionSelect,
}) => {
  return (
    <div
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
      style={{ userSelect: "none" }} // Disable copying for the entire card
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-600">History Quiz</h2>
        <div className="text-gray-600 font-medium">Timer: {timer}</div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">
            Question {questionNumber}/{totalQuestions}
          </p>
          <p className="mt-1 text-lg font-medium text-gray-600">{question}</p>
        </div>

        {/* Example image section, if needed */}
        {/* <div className="flex gap-4 items-center">
          <img
            src={imageSrc}
            alt="Question Related"
            className="w-24 h-24 object-cover rounded-lg border"
          />
        </div> */}

        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option-${index}`}
                name="options"
                value={option}
                className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                checked={selectedOption === option} // Pre-select the chosen option
                onChange={() => onOptionSelect(option)}
              />
              <label
                htmlFor={`option-${index}`}
                className="ml-2 text-gray-700 text-sm"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
