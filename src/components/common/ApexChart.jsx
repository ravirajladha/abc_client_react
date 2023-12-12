import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ seriesData, optionsData, colorsData }) => {

  const defaultOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Started Videos", "Pending Videos"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const options = {
    ...defaultOptions,
    ...optionsData,
    colors: colorsData,
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={seriesData} type="donut" />
    </div>
  );
};

export default ApexChart;
