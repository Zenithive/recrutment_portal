"use client";

import React, { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
import { createClient } from "@/utils/supabase/client";
import ResultCard from "@/components/ResultCard"; // Import your ResultCard component
import InstructionCard from "@/components/InstructionCard";
import Cookies from "js-cookie";

// Initialize Supabase client
const supabase = createClient();

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false); // State to manage showing results
  const [showInstructions, setShowInstructions] = useState(true); // State to manage InstructionCard visibility
  const [timeRemaining, setTimeRemaining] = useState(1 * 60); // Timer (30 minutes in seconds)
  const [username, setUsername] = useState<string | null>(null); // Dynamic username from session
  const [testid, setTestid] = useState<number | null>(null); // Dynamic testid

  // console.log(`testid`, testid);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (typeof window !== "undefined") {
        const storedUsername = Cookies.get("username");
        const storedTestid = Cookies.get("test_id");
  
        setUsername(storedUsername || null);
        setTestid(storedTestid ? parseInt(storedTestid, 10) : null);
      }
    };
  
    fetchSessionData();
  }, []);



  useEffect(() => {
    const fetchQuestions = async () => {
      if (!testid) return; // Wait until testid is available
  
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("test_id", testid);
  
      if (error) {
        console.error("Error fetching questions:", error.message);
        return;
      }
  
      if (data) {
        const formattedQuestions = data.map((q: any, index: number) => ({
          id: q.id,
          questionNumber: index + 1,
          totalQuestions: data.length,
          question: q.question,
          imageSrc: q.image_src || "",
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          correctOption: q.correct_option_text,
        }));
  
        setQuestions(formattedQuestions);
        setSelectedAnswers(Array(data.length).fill(""));
      }
    };
  
    fetchQuestions();
  }, [testid]); // Re-run when testid is set

  // Timer logic with auto-submit
  useEffect(() => {
    if (!showInstructions && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    // Trigger auto-submit when time is up
    if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [showInstructions, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  const handleSubmit = async () => {
    // Clear password cookie
    document.cookie =
      "password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    const answersWithDetails = selectedAnswers.map((selectedAnswer, index) => {
      const question = questions[index];
      return {
        questionId: question.id, // Store the unique ID of the question
        selectedOption: selectedAnswer,
        correctOption: question.correctOption, // Store the correct option
        isCorrect: selectedAnswer === question.correctOption, // Compare selected and correct option
      };
    });

    console.log("Submitted Answers:", answersWithDetails);

    // Calculate the result (correct/total)
    const correctAnswers = answersWithDetails.filter(
      (answer) => answer.isCorrect
    ).length;
    const totalQuestions = questions.length;
    const result = `${correctAnswers}/${totalQuestions}`;

    // Store the result in Supabase
    const { error } = await supabase
      .from("results") // Your results table name
      .insert([
        {
          testid: testid,
          username: username,
          result: result,
        },
      ]);

    if (error) {
      console.error("Error storing result:", error.message);
    } else {
      console.log("Result stored successfully:", result);
    }

    setShowResult(true); // Show the result after submission
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (showResult) {
    return <ResultCard answers={selectedAnswers} questions={questions} />; // Display result
  }

  return (
    <>
      {showInstructions ? (
        <InstructionCard
          onOkay={() => setShowInstructions(false)} // Hide instructions on Okay button click
        />
      ) : (
        <div className="p-4 relative">
          <div className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
            Time Remaining: {formatTime(timeRemaining)}
          </div>
          <QuestionCard
            questionNumber={questions[currentQuestionIndex].questionNumber}
            totalQuestions={questions[currentQuestionIndex].totalQuestions}
            question={questions[currentQuestionIndex].question}
            imageSrc={questions[currentQuestionIndex].imageSrc}
            options={questions[currentQuestionIndex].options}
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
      )}
    </>
  );
};

export default QuestionPage;
