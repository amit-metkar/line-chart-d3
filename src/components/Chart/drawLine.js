import * as d3 from "d3";
import classNames from "classnames";

const drawLine = (config) => {
  const {
    svgRef,
    xScale,
    yScale,
    data,
    line: { strokeWidth, animationDuration },
    lineClassName,
  } = config;

  const svg = d3.select(svgRef.current).select("g");

  const line = d3
    .line()
    .x((d) => xScale(d.category))
    .y((d) => yScale(d.value));
  // .curve(d3.curveMonotoneX);

  const path = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("class", "line")
    .attr("d", line)
    .attr("class", classNames(["line-chart path", lineClassName]));

  const pathLength = path.node().getTotalLength();
  const transitionPath = d3.transition().ease(d3.easeSin).duration(animationDuration);
  path.attr("stroke-dashoffset", pathLength).attr("stroke-dasharray", pathLength).transition(transitionPath).attr("stroke-dashoffset", 0);
};

export default drawLine;
