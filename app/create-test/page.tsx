// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { createClient } from "@/utils/supabase/client";

// const TestsPage = () => {
//   const [tests, setTests] = useState<any[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState<number>(0);
//   const [instructions, setInstructions] = useState("");
//   const [error, setError] = useState("");
//   const supabase = createClient();

//   // Fetch all tests from the database
//   const fetchTests = async () => {
//     const { data, error } = await supabase
//       .from("testes")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       setError("Failed to fetch tests.");
//     } else {
//       setTests(data);
//     }
//   };

//   useEffect(() => {
//     fetchTests();
//   }, []);

//   // Handle form submission to create a test
//   const handleCreateTest = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !duration || !instructions) {
//       setError("All fields are required");
//       return;
//     }

//     const { data, error } = await supabase
//       .from("testes")
//       .insert([{ title, duration, instructions }]);

//     if (error) {
//       setError("Failed to create test.");
//     } else {
//       // Close the modal and refresh the tests list
//       setShowModal(false);
//       setTitle("");
//       setDuration(0);
//       setInstructions("");
//       fetchTests();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Create Test
//         </button>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//               <h2 className="text-xl font-semibold mb-4 text-black">Create a New Test</h2>

//               {error && <p className="text-red-500">{error}</p>}
//               <form onSubmit={handleCreateTest}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="title"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="mt-1 p-2 w-full border rounded-md"
//                     placeholder="Test Title"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="duration"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Duration (Minutes)
//                   </label>
//                   <input
//                     type="number"
//                     id="duration"
//                     value={duration}
//                     onChange={(e) => setDuration(Number(e.target.value))}
//                     className="mt-1 p-2 w-full border rounded-md"
//                     placeholder="Duration"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="instructions"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Instructions
//                   </label>
//                   <textarea
//                     id="instructions"
//                     value={instructions}
//                     onChange={(e) => setInstructions(e.target.value)}
//                     className="mt-1 p-2 w-full border rounded-md"
//                     placeholder="Test Instructions"
//                   />
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-600 text-white rounded-md"
//                   >
//                     Create Test
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Display created tests */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4 text-black">All Tests</h2>
//           <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-2 px-4 text-left text-black">Title</th>
//                 <th className="py-2 px-4 text-left text-black">Duration</th>
//                 <th className="py-2 px-4 text-left text-black">Instructions</th>
//                 <th className="py-2 px-4 text-left text-black">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tests.map((test) => (
//                 <tr key={test.testid}>
//                   <td className="py-2 px-4 text-black">{test.title}</td>
//                   <td className="py-2 px-4 text-black">
//                     {test.duration} minutes
//                   </td>
//                   <td className="py-2 px-4 text-black">{test.instructions}</td>
//                   <td className="py-2 px-4 text-black">
//                     {new Date(test.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestsPage;



"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";

const TestsPage = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState<number>(-1);
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
  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || !instructions) {
      setError("All fields are required");
      return;
    }

    const { data, error } = await supabase
      .from("testes")
      .insert([{ title, duration, instructions }]);

    if (error) {
      setError("Failed to create test.");
    } else {
      // Close the modal and refresh the tests list
      setShowTestModal(false);
      setTitle("");
      setDuration(0);
      setInstructions("");
      fetchTests();
    }
  };

  // Handle adding a question
  const handleAddQuestion = async (testId: number) => {
    if (!question || correctOption === -1) {
      setError("Please fill in the question and select the correct option.");
      return;
    }

    const newQuestion = {
      question,
      options,
      correctOption,
      testId,
    };

    const { data, error } = await supabase
      .from("questions") // Assuming a 'questions' table
      .insert([newQuestion]);

    if (error) {
      setError("Failed to add question.");
    } else {
      setShowQuestionModal(false);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption(-1);
      fetchTests(); // Refresh the tests
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

        {/* Test Modal */}
        {showTestModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-semibold mb-4 text-black">Create a New Test</h2>

              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleCreateTest}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Test Title"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Duration"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="instructions"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Instructions
                  </label>
                  <textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Test Instructions"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Create Test
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTestModal(false)}
                    className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Questions Modal */}
        {showQuestionModal && (
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
              <div className="flex justify-end">
                <button
                  onClick={() => handleAddQuestion(tests[0]?.testid)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Add Question
                </button>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display created tests */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">All Tests</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-black">Title</th>
                <th className="py-2 px-4 text-left text-black">Duration</th>
                <th className="py-2 px-4 text-left text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-b border-gray-300">
                  <td className="py-2 px-4">{test.title}</td>
                  <td className="py-2 px-4">{test.duration} min</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setShowQuestionModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Add Question
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestsPage;
