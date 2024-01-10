import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js/auto";

Chart.register(CategoryScale);

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },

  Normal: {
    min: 100,
    max: 200,
  },

  Expensive: {
    min: 200,
    max: 1000000,
  },
};

const bookingChart = (props) => {
  const chartData = { labels: [], datasets: [] };
  let values = [];

  const colors = {
    Cheap: "rgba(75,192,192,0.5)",
    Normal: "rgba(255,99,132,0.5)",
    Expensive: "rgba(54,162,235,0.5)",
  };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      label: bucket,
      backgroundColor: colors[bucket],
      borderColor: colors[bucket],
      borderWidth: 1,
      hoverBackgroundColor: colors[bucket],
      hoverBorderColor: colors[bucket],
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <Bar
      data={chartData}
      height={400}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20, 
          },
        },
      }}
    />
  );
};

export default bookingChart;
