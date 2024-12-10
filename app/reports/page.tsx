"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Make sure to import your supabase client

// Initialize Supabase client
const supabase = createClient();

const Dashboard: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // State to store the results
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state

  // Fetch results from Supabase
  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("results") // Query the 'results' table
        .select("username, testid, result"); // Select specific fields

      if (error) {
        console.error("Error fetching results:", error.message);
      } else {
        setResults(data); // Store the fetched data in the state
      }

      setLoading(false); // Stop loading once data is fetched
    };

    fetchResults();
  }, []); // Run once when the component mounts

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-black mb-4">This is the results section</h1>

      {loading ? (
        <p className="text-black">Loading results...</p> // Display loading message until data is fetched
      ) : (
        <div>
          {results.length > 0 ? (
            <div className="max-h-[800px] overflow-y-auto"> {/* Scrollable container */}
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-black">Username</th>
                    <th className="border border-black p-2 text-black">Test ID</th>
                    <th className="border border-black p-2 text-black">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2 text-black">{result.username}</td>
                      <td className="border border-black p-2 text-black">{result.testid}</td>
                      <td className="border border-black p-2 text-black">{result.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-black">No results found.</p> // If no results are found
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
