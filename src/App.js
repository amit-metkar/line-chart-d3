import React from "react";
import LineChart from "./components/Chart";
import "./App.css";
import data from "./data";

function App() {
  return (
    <div className="App">
      <LineChart
        chartConfig={{
          title: "Percent Value vs Category",
          height: 300,
          line: {
            strokeWidth: 3,
            animationDuration: 1500,
          },
        }}
        axisConfig={{
          xLabel: "Category",
          yLabel: "% Value",
        }}
        data={data}
      />
    </div>
  );
}

export default App;
