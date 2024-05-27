import React, { useEffect, useState } from 'react';
import { Bar as BarChart } from 'react-chartjs-2';


const Bar = ({ labels, data, backgroundColor, borderColor, label }) => {
    const [chartData, setChartData] = useState({});
  
    useEffect(() => {
      setChartData({
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      });
    }, [labels, data, backgroundColor, borderColor, label]);
  
    return <BarChart data={chartData} />;
  };
  
  export default Bar;
  