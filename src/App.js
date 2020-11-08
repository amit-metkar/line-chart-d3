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
        }}
        axisConfig={{
          xLabel: "Category",
          yLabel: "% Value",
        }}
        data={data}
        strokeWidth={4}
      />
    </div>
  );
}

export default App;
