const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;

const pointRadius = 10;
const scaleFactor = 40;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame-1");

const scale = (coord) => coord * scaleFactor;

const handleMouseover = (event, d) => {
  event.target.style.fill = "orange";
};

const handleMouseleave = (event, d) => {
  event.target.style.fill = "black";
};

const handleClick = (event, d) => {
  if (event.target.style.stroke === "hotpink") {
    event.target.style.stroke = "";
  } else {
    event.target.style.stroke = "hotpink";
    event.target.style.strokeWidth = "5px";
  }
};

d3.csv("./data/scatter-data.csv").then((data) => {
  FRAME1.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => scale(d.x))
    .attr("cy", (d) => 400 - scale(d.y))
    .attr("r", pointRadius)
    .attr("fill", "black")
    .on("mouseover", handleMouseover)
    .on("mouseleave", handleMouseleave)
    .on("click", handleClick);
});

// enter coordinate
function enterCoordinate() {
  // get x
  const x = document.getElementById("x-select").value;
  // get y
  const y = document.getElementById("y-select").value;

  console.log(x, y);
  // add
  FRAME1.append("circle")
    .attr("cx", scale(x))
    .attr("cy", 400 - scale(y))
    .attr("r", pointRadius)
    .attr("fill", "black")
    .on("mouseover", handleMouseover)
    .on("mouseleave", handleMouseleave)
    .on("click", handleClick);
}

// Bar chart

const BAR_CHART_HEIGHT = 290;

const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", BAR_CHART_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame-2");

const scaleBar = (amount) => amount * 4;

const TOOLTIP = d3
  .select("#vis2")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

const handleBarMouseover = (event, d) => {
  event.target.style.fill = "orange";
  TOOLTIP.style("opacity", 1);
};

const handleBarMousemove = (event, d) => {
  TOOLTIP.html("category: " + d.category + "<br/>amount: " + d.amount)
    .style("left", event.pageX + 10 + "px")
    .style("top", event.pageY - 50 + "px");
};

const handleBarMouseleave = (event, d) => {
  event.target.style.fill = "red";
  TOOLTIP.style("opacity", "0");
};

d3.csv("./data/bar-data.csv").then((data) => {
  FRAME2.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => BAR_CHART_HEIGHT - scale(i) - 40)
    .attr("width", (d) => scaleBar(d.amount))
    .attr("height", scaleFactor)
    .attr("fill", "red")
    .attr("stroke", "black")
    .on("mouseover", handleBarMouseover)
    .on("mouseleave", handleBarMouseleave)
    .on("mousemove", handleBarMousemove);
});
