'use client';

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your supabase client
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

// Initialize Supabase client
const supabase = createClient();

// Register the necessary chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // State to store the results
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [averageResult, setAverageResult] = useState<number>(0); // Store average result
  const [userCount, setUserCount] = useState<number>(0); // Store user count

  // Fetch results from Supabase
  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("results") // Query the 'results' table
        .select("username, result"); // Select specific fields

      if (error) {
        console.error("Error fetching results:", error.message);
      } else {
        setResults(data); // Store the fetched data in the state

        // Calculate user count and average result
        setUserCount(data.length);
        const totalResult = data.reduce((acc, curr) => acc + parseFloat(curr.result.split('/')[0]), 0); // Assuming result is in format 'correct/total'
        const average = totalResult / data.length;
        setAverageResult(average);
      }

      setLoading(false); // Stop loading once data is fetched
    };

    fetchResults();
  }, []); // Run once when the component mounts

  // Chart data
  const chartData = {
    labels: ['Users'], // You can use dynamic labels here based on time or other factors
    datasets: [
      {
        label: 'Number of Users',
        data: [userCount],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      },
      {
        label: 'Average Result',
        data: [averageResult],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "black" }}>Dashboard for Admin</h1>
      
      {loading ? (
        <p>Loading results...</p> // Display loading message until data is fetched
      ) : (
        <div>
          {results.length > 0 ? (
            <>
              <div style={{ marginBottom: '20px' }}>
              <h3 className="text-black">Total Users: {userCount}</h3>
              <h3 className="text-black">Average Result: {averageResult.toFixed(2)}</h3>
              </div>
              
              <Line data={chartData} options={{ responsive: true }} />
            </>
          ) : (
            <p>No results found.</p> // If no results are found
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
