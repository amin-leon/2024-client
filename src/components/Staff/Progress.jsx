import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function IssuesInProgress() {
  const [progressIssues, setProgressIssues] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/issue/all-issues');
        const filteredIssues = response.data.filter((issue) => issue.status !== 'new');
        setProgressIssues(filteredIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
  
    fetchIssues();
  }, []);

  // Filter issues based on selected year and month
  const filteredIssues = progressIssues.filter((issue) => {
    const issueDate = new Date(issue.createdAt);
    return issueDate.getFullYear() === selectedYear && issueDate.getMonth() + 1 === selectedMonth;
  });

  // Calculate category occurrence
  const categoryCounts = filteredIssues.reduce((acc, issue) => {
    acc[issue.category] = acc[issue.category] ? acc[issue.category] + 1 : 1;
    return acc;
  }, {});

  // Calculate total number of issues
  const totalIssues = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

  // Calculate percentages
  const percentageData = Object.keys(categoryCounts).map((category) => {
    const percentage = ((categoryCounts[category] / totalIssues) * 100).toFixed(2);
    return { category, percentage };
  });

  // Sort categories by occurrence
  const sortedCategories = percentageData.sort((a, b) => b.percentage - a.percentage);

  const data = {
    labels: sortedCategories.map((item) => item.category),
    datasets: [
      {
        label: 'Category Statistics',
        data: sortedCategories.map((item) => item.percentage),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Submitted Issues's Statistics</h2>
      <div className="flex justify-center mb-4">
        <select
          className="border p-2 w-[100px] rounded-md mx-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          {/* Add options for other years if needed */}
        </select>
        <select
          className="border p-2 rounded-md mx-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default IssuesInProgress;
