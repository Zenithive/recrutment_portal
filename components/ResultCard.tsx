'use client';

import React from "react";

interface ResultCardProps {
  answers: string[];
  questions: any[];
}

const ResultCard: React.FC<ResultCardProps> = ({ answers, questions }) => {
  const correctAnswersCount = answers.filter((answer, index) => answer === questions[index].correctOption).length;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-black">Your Results</h2>
      <div className="mt-4">
        <p className="font-bold text-lg text-black">You got {correctAnswersCount} out of {questions.length} correct!</p>

        {answers.map((answer, index) => {
          const question = questions[index];
          const isCorrect = answer === question.correctOption;
          return (
            <div key={question.id} className="p-2 mb-2 border rounded-lg">
              {/* <div className="font-bold">{question.question}</div> */}
              <div className="font-bold text-black">{question.question}</div>

              <div className="text-sm text-gray-500">Your answer: {answer}</div>
              <div className={`text-sm ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "Correct" : `Incorrect, Correct Answer: ${question.correctOption}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;
