'use client'
import React, { useState } from "react";
import QuestionCard from "@/components/QuestionCard";

const QuestionPage: React.FC = () => {
  // Example data for multiple questions
  const questions = [
    {
      questionNumber: 1,
      totalQuestions: 5,
      question: "What is the capital of France?",
      imageSrc: "/path/to/image1.jpg",
      options: ["Paris", "London", "Berlin", "Madrid"],
      timer: "00:10:00",
    },
    {
      questionNumber: 2,
      totalQuestions: 5,
      question: "Who painted the Mona Lisa?",
      imageSrc: "/path/to/image2.jpg",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
      timer: "00:09:50",
    },
    {
      questionNumber: 3,
      totalQuestions: 5,
      question: "Which planet is known as the Red Planet?",
      imageSrc: "/path/to/image3.jpg",
      options: ["Mars", "Jupiter", "Saturn", "Venus"],
      timer: "00:09:30",
    },
    {
      questionNumber: 4,
      totalQuestions: 5,
      question: "What is the largest mammal on Earth?",
      imageSrc: "/path/to/image4.jpg",
      options: ["Blue Whale", "Elephant", "Giraffe", "Polar Bear"],
      timer: "00:09:15",
    },
    {
      questionNumber: 5,
      totalQuestions: 5,
      question: "In which year did the Titanic sink?",
      imageSrc: "/path/to/image5.jpg",
      options: ["1912", "1915", "1920", "1908"],
      timer: "00:09:00",
    },
  ];

  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to store selected answers
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("") // Initialize with empty strings
  );

  // Event handler for when an option is selected
  const handleOptionSelect = (selectedOption: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedAnswers);
  };

  // Event handler for navigating to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Event handler for navigating to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Event handler for submitting all answers
  const handleSubmit = () => {
    console.log("Submitted Answers:", selectedAnswers);
    alert(`Your answers: ${JSON.stringify(selectedAnswers)}`);
  };

  return (
    <div className="p-4">
      <QuestionCard
        questionNumber={questions[currentQuestionIndex].questionNumber}
        totalQuestions={questions[currentQuestionIndex].totalQuestions}
        question={questions[currentQuestionIndex].question}
        imageSrc={questions[currentQuestionIndex].imageSrc}
        options={questions[currentQuestionIndex].options}
        timer={questions[currentQuestionIndex].timer}
        selectedOption={selectedAnswers[currentQuestionIndex]} // Pass the selected option
        onOptionSelect={handleOptionSelect}
      />
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0} // Disable if it's the first question
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
