import * as d3 from "d3";
import classNames from "classnames";
import { miniChartHeight } from "./constants";

const drawLine = (config) => {
  const {
    margin,
    width,
    height,
    svgRef,
    xScale,
    yScale,
    data,
    line: { strokeWidth, animationDuration, className },
    selector = "g.chart",
  } = config;

  const chartGrp = d3.select(svgRef.current).select(selector);

  let xScale2 = d3.scaleLinear().domain(xScale.domain()).range(xScale.range());
  let yScale2 = d3.scaleLinear().domain(yScale.domain()).range([miniChartHeight, 0]);

  const brushed = (event) => {
    // console.log(event.sourceEvent && event.sourceEvent.type, event.type);
    // if (event.sourceEvent && event.sourceEvent.type === "mouseup") {
    // debugger;
    const s = event.selection || xScale2.range();
    xScale.domain(s.map(xScale2.invert, xScale2));

    chartGrp.select(".axis-x").call(d3.axisBottom(xScale));
    lineChart.select(".line-chart").attr("d", line);
    // console.log(xScale.range(), xScale.domain());
    // }
  };

  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, miniChartHeight],
    ])
    .on("brush end", brushed);

  const line = d3
    .line()
    .x((d) => xScale(d.category))
    .y((d) => yScale(d.value));

  const line2 = d3
    .line()
    .x((d) => xScale2(d.category))
    .y((d) => yScale2(d.value));

  const context = chartGrp
    .append("g")
    .attr("class", "context")
    .attr("transform", `translate(0,${height + margin.bottom / 3})`);

  const lineChart = chartGrp.append("g").attr("class", "focus").attr("clip-path", "url(#clip)");

  const path = lineChart
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("class", classNames([className, "path"]))
    .attr("d", line);

  const pathLength = path.node().getTotalLength();
  const transitionPath = d3.transition().ease(d3.easeSin).duration(animationDuration);
  path.attr("stroke-dashoffset", pathLength).attr("stroke-dasharray", pathLength).transition(transitionPath).attr("stroke-dashoffset", 0);

  const path2 = context.append("path").datum(data).attr("fill", "none").attr("stroke-width", 2).attr("class", "mini-chart path").attr("d", line2);

  const path2Length = path2.node().getTotalLength();
  // const transitionPath2 = d3.transition().ease(d3.easeSin).duration(animationDuration);
  path2.attr("stroke-dashoffset", path2Length).attr("stroke-dasharray", path2Length).transition(transitionPath).attr("stroke-dashoffset", 0);

  context.append("g").attr("class", "brush").call(brush).call(brush.move, xScale.range());
};

export default drawLine;
