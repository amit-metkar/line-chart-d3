import * as d3 from "d3";
import classnames from "classnames";

function drawTooltip(config) {
  const { margin, width, height, data, svgRef, tooltipRef, markerClass, xScale, yScale } = config;

  const svg = d3.select(svgRef.current).select("g.chart");
  const tooltip = d3.select(tooltipRef.current);

  const focus = svg.append("g").attr("class", "focus").style("display", "none");

  focus
    .append("circle")
    .attr("r", 10)
    .attr("class", classnames(["line-chart circle", markerClass]));

  const hPath = d3.path();
  hPath.moveTo(0, 0);
  hPath.lineTo(width, 0);
  hPath.closePath();
  const hLine = svg.append("g").append("path").attr("d", hPath).attr("class", "line-chart cross").style("display", "none");

  const vPath = d3.path();
  vPath.moveTo(0, 0);
  vPath.lineTo(0, height);
  vPath.closePath();
  const vLine = svg.append("g").append("path").attr("d", vPath).attr("class", "line-chart cross").style("display", "none");

  svg
    .append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0)
    .on("mouseover", () => {
      focus.style("display", "block");
      hLine.style("display", "block");
      vLine.style("display", "block");
    })
    .on("mouseout", () => {
      focus.style("opacity", 0);
      hLine.style("opacity", 0);
      vLine.style("opacity", 0);
      tooltip.transition().duration(300).style("opacity", 0);
    })
    .on("mousemove", mousemove);

  function mousemove(event) {
    // const bisect = d3.bisector((d) => d.category).left;
    const bisect = d3.bisector((d) => d.category).center;
    const xPos = d3.pointer(event)[0];
    const invertedPoint = xScale.invert(xPos);
    const x0 = bisect(data, invertedPoint);

    // const dPrev = data[x0 - 1];
    // const dNext = data[x0];
    // const d0 = invertedPoint - dPrev.category > dNext.category - invertedPoint ? dNext : dPrev;
    const d0 = data[x0];

    focus.style("opacity", 1);
    hLine.style("opacity", 1);
    vLine.style("opacity", 1);

    // console.log(`${xScale(d0.category)}, ${yScale(d0.value)})`);

    focus.attr("transform", `translate(${xScale(d0.category)},${yScale(d0.value)})`);
    hLine.attr("transform", `translate(0,${yScale(d0.value)})`);
    vLine.attr("transform", `translate(${xScale(d0.category)},0)`);

    tooltip.transition().duration(300).style("opacity", 0.9);

    tooltip
      .html(`Name: ${d0.user || d0.category}`)
      .style("transform", "translate(0,-100%)")
      .style("left", `${xScale(d0.category) + margin.left + 10}px`)
      .style("top", `${yScale(d0.value) + margin.top - 10}px`);
  }
}

export default drawTooltip;
