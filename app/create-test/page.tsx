"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import AddQuestionModal from "@/components/Add-Question-Modal";
import CreateTestModal from "@/components/Create-Test-Modal";
import TestsTable from "@/components/Test-Table";

const TestsPage = () => {
  const [tests, setTests] = useState<any[]>([]);
  // console.log(`tests from table`, tests.testid);
  // console.log(`tests from table`, tests);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  // console.log(`selectedTest123`, selectedTest);
  const [error, setError] = useState("");
  const supabase = createClient();

  // Fetch all tests from the database
  const fetchTests = async () => {
    const { data, error } = await supabase
      .from("testes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to fetch tests.");
    } else {
      setTests(data);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Handle form submission to create a test
  const handleCreateTest = async (testData: {
    title: string;
    duration: number;
    instructions: string;
  }) => {
    const { data, error } = await supabase.from("testes").insert([testData]);

    if (error) {
      setError("Failed to create test.");
    } else {
      setShowTestModal(false);
      fetchTests();
    }
  };

  const handleAddQuestion = async (questionData: {
    question: string;
    options: string[];
    correctOption: number;
  }) => {
    const { question, options, correctOption } = questionData;
  
    if (!selectedTest) {
      setError("No test selected.");
      return;
    }
    // console.log("Selected Test:", selectedTest); // Log the entire selectedTest object

    // Get the correct option text
    const correctOptionText = options[correctOption];
  
    // Log the test_id to ensure it is correct
    console.log("test_id being passed:", selectedTest.id);
  
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          question: question,
          option_a: options[0],
          option_b: options[1],
          option_c: options[2],
          option_d: options[3],
          correct_option: ['A', 'B', 'C', 'D'][correctOption],  // Store the correct option as A, B, C, or D
          correct_option_text: correctOptionText,
          test_id: selectedTest.testid, // Use the `selectedTest.id` passed from the parent component
        }]);
  
      if (error) {
        throw error;
      }
  
      // console.log('Question added:', data);
      setShowQuestionModal(false);  // Close the modal
      fetchTests();  // Refresh the tests
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => setShowTestModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Create Test
        </button>

        <CreateTestModal
          show={showTestModal}
          onClose={() => setShowTestModal(false)}
          onCreateTest={handleCreateTest}
        />

        <AddQuestionModal
          show={showQuestionModal}
          onClose={() => setShowQuestionModal(false)}
          onAddQuestion={handleAddQuestion}
          test={selectedTest}
        />

        {/* Use the TestsTable component */}
        <TestsTable
          tests={tests}
          onAddQuestionClick={(test: any) => {
            console.log("Selected Test:", test);
            setSelectedTest(test);
            setShowQuestionModal(true);
          }}
          onSelectTest={(test: any) => {
            console.log("Test selected:", test); // Log when a test is selected
            setSelectedTest(test);
          }}
        />
      </div>
    </div>
  );
};

export default TestsPage;
