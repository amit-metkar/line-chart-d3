import * as d3 from "d3";
import classNames from "classnames";

const drawLine = (config) => {
  const {
    svgRef,
    xScale,
    yScale,
    data,
    line: { strokeWidth },
    lineClassName,
  } = config;

  const svg = d3.select(svgRef.current).select("g");

  const line = d3
    .line()
    .x((d) => xScale(d.category))
    .y((d) => yScale(d.value));
  // .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("class", "line")
    .attr("d", line)
    .attr("class", classNames(["line-chart path", lineClassName]));
};

export default drawLine;
