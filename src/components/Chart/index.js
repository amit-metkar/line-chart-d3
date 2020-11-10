import React, { useEffect } from "react";
import classnames from "classnames";
import * as d3 from "d3";

import drawAxis from "../../common/axis";
import drawTooltip from "../../common/tooltip";

import drawLine from "./drawLine";
import "./index.scss";
import merge from "lodash-es/merge";
import { defaultAxisConfig, defaultChartConfig, defaultTooltipConfig, miniChartHeight } from "./constants";

const Chart = (props) => {
  const svgRef = React.createRef();
  const tooltipRef = React.createRef();
  const { chartConfig, axisConfig, tooltipConfig, data, ...restProps } = props;

  const _chartConfig = merge(defaultChartConfig, chartConfig);
  const _tooltipConfig = merge(defaultTooltipConfig, tooltipConfig);
  const _axisConfig = merge(defaultAxisConfig, axisConfig);

  const { tooltipClassName } = _tooltipConfig;
  const { margin, width, height, title, chartContainerClass } = _chartConfig;

  console.log(margin, width, height, title, chartContainerClass, _axisConfig);
  const yMinValue = d3.min(data, (d) => d.value);
  const yMaxValue = d3.max(data, (d) => d.value);

  const xMinValue = d3.min(data, (d) => d.category);
  const xMaxValue = d3.max(data, (d) => d.category);

  let xScale = d3.scaleLinear().domain([xMinValue, xMaxValue]).range([0, width]);
  // let yScale = d3.scaleLinear().range([height, 0]).domain([yMinValue, yMaxValue]);
  let yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);

  useEffect(() => {
    flushChart();
    draw();
  });

  function flushChart() {
    d3.select(svgRef.current).selectAll("*").remove();
  }

  function draw() {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + miniChartHeight);

    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", "50%")
      .attr("y", margin.top / 2)
      .text(title);

    svg.append("g").attr("class", "chart").attr("transform", `translate(${margin.left},${margin.top})`);

    drawAxis({
      ..._axisConfig,
      ..._chartConfig,
      data,
      svgRef,
      xScale,
      yScale,
    });

    drawLine({
      svgRef,
      data,
      xScale,
      yScale,
      ..._chartConfig,
      ...restProps,
    });

    drawTooltip({
      svgRef,
      tooltipRef,
      data,
      xScale,
      yScale,
      ..._chartConfig,
      ...restProps,
    });
  }

  return (
    <div className="chart container">
      <svg ref={svgRef} className={classnames("chart-container", chartContainerClass)} />
      <div className={classnames("tooltip", tooltipClassName)} ref={tooltipRef} />
    </div>
  );
};

export default Chart;
