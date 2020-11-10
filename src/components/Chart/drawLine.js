import * as d3 from "d3";
import classNames from "classnames";

const drawLine = (config) => {
  const {
    svgRef,
    xScale,
    yScale,
    data,
    line: { strokeWidth, animationDuration, className },
    selector = "g.chart",
  } = config;

  const chartGrp = d3.select(svgRef.current).select(selector);

  const line = d3
    .line()
    .x((d) => xScale(d.category))
    .y((d) => yScale(d.value));

  const path = chartGrp
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("class", "line")
    .attr("d", line)
    .attr("class", classNames([className, "path"]));

  const pathLength = path.node().getTotalLength();
  const transitionPath = d3.transition().ease(d3.easeSin).duration(animationDuration);
  path.attr("stroke-dashoffset", pathLength).attr("stroke-dasharray", pathLength).transition(transitionPath).attr("stroke-dashoffset", 0);
};

export default drawLine;
