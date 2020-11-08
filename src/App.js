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
          line: {
            strokeWidth: 3,
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
