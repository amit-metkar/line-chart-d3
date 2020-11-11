import * as d3 from "d3";
import classnames from "classnames";
import { miniChartHeight } from "../components/Chart/constants";
// import drawLine from "../components/Chart/drawLine";
// import { miniChartHeight } from "../components/Chart/constants";

function drawAxis(config) {
  const { margin, width, height, data, drawXGridLines = true, drawYGridLines = false, xLabel, yLabel, axisClass, gridClass, svgRef, xScale, yScale, line } = config;

  const svg = d3.select(svgRef.current).select("g.chart");

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

  const xa = svg
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
      .attr("y", height + margin.top / 2 + miniChartHeight + 5)
      // .attr("y", height + margin.top / 2)
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

  // xa.append("g").attr("transform", `translate(0, ${miniChartHeight})`).attr("class", "mini-chart");

  // const yMinValue = d3.min(data, (d) => d.value);
  // const yMaxValue = d3.max(data, (d) => d.value);
  // let _yScale = d3
  //   .scaleLinear()
  //   .range([miniChartHeight - 15, 0])
  //   .domain([yMinValue, yMaxValue]);

  // drawLine({
  //   svgRef,
  //   data,
  //   xScale,
  //   yScale: _yScale,
  //   line: {
  //     ...line,
  //     strokeWidth: 2,
  //     className: "mini-chart",
  //   },
  //   selector: "g.mini-chart",
  // });
}

export default drawAxis;
