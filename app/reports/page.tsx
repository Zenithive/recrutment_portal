"use client"
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* <h1 style={{ color: "black" }}>This is the dashboard for admin</h1> */}
      
      {loading ? (
        <p>Loading results...</p> // Display loading message until data is fetched
      ) : (
        <div>
          {results.length > 0 ? (
            <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px", color: "black" }}>Username</th>
                  <th style={{ border: "1px solid black", padding: "8px", color: "black" }}>Test ID</th>
                  <th style={{ border: "1px solid black", padding: "8px", color: "black" }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px", color: "black" }}>{result.username}</td>
                    <td style={{ border: "1px solid black", padding: "8px", color: "black" }}>{result.testid}</td>
                    <td style={{ border: "1px solid black", padding: "8px", color: "black" }}>{result.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p> // If no results are found
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
