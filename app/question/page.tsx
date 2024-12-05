'use client';

import React, { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
import { createClient } from '@/utils/supabase/client'

// Initialize Supabase client
const supabase = createClient();

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  // Fetch questions from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questionPaper1setA") // Your Supabase table name
        .select("*");
      if (error) {
        console.error("Error fetching questions:", error.message);
      } else if (data) {
        // Format questions to match the expected structure
        const formattedQuestions = data.map((q: any, index: number) => ({
          questionNumber: index + 1,
          totalQuestions: data.length,
          question: q.question_text,
          imageSrc: "", // Add image handling if needed
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          timer: "00:10:00", // Add timer logic if applicable
        }));
        setQuestions(formattedQuestions);
        setSelectedAnswers(Array(data.length).fill("")); // Initialize answers
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (selectedOption: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", selectedAnswers);
    alert(`Your answers: ${JSON.stringify(selectedAnswers)}`);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="p-4">
      <QuestionCard
        questionNumber={questions[currentQuestionIndex].questionNumber}
        totalQuestions={questions[currentQuestionIndex].totalQuestions}
        question={questions[currentQuestionIndex].question}
        imageSrc={questions[currentQuestionIndex].imageSrc}
        options={questions[currentQuestionIndex].options}
        timer={questions[currentQuestionIndex].timer}
        selectedOption={selectedAnswers[currentQuestionIndex]}
        onOptionSelect={handleOptionSelect}
      />
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
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
