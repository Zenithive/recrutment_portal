"use client";

import React, { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
import { createClient } from "@/utils/supabase/client";
import ResultCard from "@/components/ResultCard"; // Import your ResultCard component
import InstructionCard from "@/components/InstructionCard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Import useRouter 

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
  const router = useRouter();

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

  // Redirect to login page after showing results
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 3000); // Delay of 3 seconds to display the result

      return () => clearTimeout(timer);
    }
  }, [showResult, router]);

  // Retrieve timer state on component mount
  useEffect(() => {
    const savedTime = localStorage.getItem("timeRemaining");
    if (savedTime) {
      setTimeRemaining(parseInt(savedTime, 10));
    }
  }, []);


  const shuffleArray=(array: any[])=>{
    return array.sort(() => Math.random() - 0.5);
}

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

        const shuffleArrat = shuffleArray(formattedQuestions);
        shuffleArrat.forEach((a, index) => a.qNo = index+1)
  
        setQuestions(shuffleArrat);
        setSelectedAnswers(Array(data.length).fill(""));
      }
    };
  
    fetchQuestions();
  }, [testid]); // Re-run when testid is set

  // Timer logic with auto-submit
  useEffect(() => {
    if (!showInstructions && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const updatedTime = prevTime - 1;
          localStorage.setItem("timeRemaining", String(updatedTime)); // Save timer state to localStorage
          return updatedTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

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
    localStorage.setItem("timeRemaining", "0");
    document.cookie =
      "password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
    // Check if the username already exists in the results table
    const { data: existingResult, error: fetchError } = await supabase
      .from("results")
      .select("*")
      .eq("username", username)
      // .eq("testid", testid); // Include the testid as well, to ensure you're checking the specific test
  
    if (fetchError) {
      console.error("Error checking existing result:", fetchError.message);
      return;
    }
  
    if (existingResult && existingResult.length > 0) {
      alert("You have already submitted the test. Multiple submissions are not allowed.");
      return;
    }
  
    // Process the answers and calculate the result
    const answersWithDetails = selectedAnswers.map((selectedAnswer, index) => {
      const question = questions[index];
      return {
        questionId: question.id,
        selectedOption: selectedAnswer,
        correctOption: question.correctOption,
        isCorrect: selectedAnswer === question.correctOption,
      };
    });
  
    console.log("Submitted Answers:", answersWithDetails);
  
    const correctAnswers = answersWithDetails.filter(
      (answer) => answer.isCorrect
    ).length;
    const totalQuestions = questions.length;
    const result = `${correctAnswers}/${totalQuestions}`;
  
    // Store the result in the database
    const { error: insertError } = await supabase
      .from("results")
      .insert([
        {
          testid: testid,
          username: username,
          result: result,
        },
      ]);
  
    if (insertError) {
      console.error("Error storing result:", insertError.message);
      return;
    }
  
    console.log("Result stored successfully:", result);
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
            questionNumber={questions[currentQuestionIndex].qNo}
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
