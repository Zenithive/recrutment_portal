'use client';

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your Supabase client

// Initialize Supabase client
const supabase = createClient();

const AddQuestionPage: React.FC = () => {
  const [questionText, setQuestionText] = useState<string>('');
  const [optionA, setOptionA] = useState<string>('');
  const [optionB, setOptionB] = useState<string>('');
  const [optionC, setOptionC] = useState<string>('');
  const [optionD, setOptionD] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('A'); // Default correct answer
  const [correctAnswerText, setCorrectAnswerText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Insert new question into Supabase
    const { data, error } = await supabase.from('questionPaper1setA').insert([
      {
        question_text: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: correctAnswer,
        correct_answer_text: correctAnswerText,
      },
    ]);

    setIsLoading(false);

    if (error) {
      setErrorMessage("Error adding question: " + error.message);
    } else {
      setSuccessMessage("Question added successfully!");
      // Reset form fields after successful submission
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectAnswer('A');
      setCorrectAnswerText('');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-black mb-4">Add a New Question</h2>

      {/* Success or Error Message */}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="questionText" className="block text-black font-medium">Question Text</label>
          <textarea
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="optionA" className="block text-black font-medium">Option A</label>
          <input
            id="optionA"
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="optionB" className="block text-black font-medium">Option B</label>
          <input
            id="optionB"
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="optionC" className="block text-black font-medium">Option C</label>
          <input
            id="optionC"
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="optionD" className="block text-black font-medium">Option D</label>
          <input
            id="optionD"
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block text-black font-medium">Correct Answer</label>
          <select
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="correctAnswerText" className="block text-black font-medium">Correct Answer Text</label>
          <input
            id="correctAnswerText"
            type="text"
            value={correctAnswerText}
            onChange={(e) => setCorrectAnswerText(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 mt-4 text-white font-semibold rounded-lg ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestionPage;
