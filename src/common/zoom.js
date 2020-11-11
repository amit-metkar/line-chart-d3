import * as d3 from "d3";
import { miniChartHeight } from "../components/Chart/constants";

function drawZoom(config) {
  const { margin, width, height, data, svgRef, xScale, yScale } = config;

  const brushed = () => {};
  const zoomed = () => {};

  const chartGrp = d3.select(svgRef.current).select("g.chart");

  const yMinValue = d3.min(data, (d) => d.value);
  const yMaxValue = d3.max(data, (d) => d.value);

  const xMinValue = d3.min(data, (d) => d.category);
  const xMaxValue = d3.max(data, (d) => d.category);

  let xScale2 = d3.scaleLinear().domain([xMinValue, xMaxValue]).range([0, width]);
  let yScale2 = d3.scaleLinear().range([miniChartHeight, 0]).domain([yMinValue, yMaxValue]);

  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, miniChartHeight],
    ])
    .on("brush end", brushed);

  const zoom = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", zoomed);

  const line2 = d3
    .line()
    .x((d) => xScale2(d.category))
    .y((d) => yScale2(d.value));

  const clip = chartGrp.append("defs").append("svg:clipPath").attr("id", "clip").append("svg:rect").attr("width", width).attr("height", height).attr("x", 0).attr("y", 0);

  const context = chartGrp
    .append("g")
    .attr("class", "context")
    .attr("transform", `translate(0,${height + margin.top})`);
  context.append("path").datum(data).attr("fill", "none").attr("stroke-width", 2).attr("class", "mini-chart path").attr("d", line2);
  context.append("g").attr("class", "brush").call(brush).call(brush.move, xScale2.range());
  chartGrp
    .append("rect")
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);
}

export default drawZoom;
