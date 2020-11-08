import * as d3 from "d3";
import classnames from "classnames";

function drawAxis(config) {
  const { margin, width, height, drawXGridLines = true, drawYGridLines = false, xLabel, yLabel, axisClass, gridClass, svgRef, xScale, yScale } = config;

  const svg = d3.select(svgRef.current).select("g");

  if (drawYGridLines)
    svg
      .append("g")
      .attr("class", classnames(["grid grid-y", gridClass]))
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));

  if (drawXGridLines)
    svg
      .append("g")
      .attr("class", classnames(["grid grid-x", gridClass]))
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

  svg
    .append("g")
    .attr("class", classnames(["axis axis-x", axisClass]))
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("g")
    .attr("class", classnames(["axis axis-y", axisClass]))
    .call(d3.axisLeft(yScale).tickFormat((value) => `${value}%`));

  if (xLabel)
    svg
      .append("text")
      .attr("class", "axis-label axis-label-x")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.top / 2)
      .text(xLabel);

  if (yLabel)
    svg
      .append("text")
      .attr("class", "axis-label axis-label-y")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -margin.left / 2)
      .attr("transform", "rotate(-90)")
      .text(yLabel);
}

export default drawAxis;
