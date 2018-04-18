#   Advanced Exercise:

 * Create a Line chart add dots and interaction (whenever you click on the dots display information)

# How to start it
First we create a basic index.html and a main.js where write the code.

We download the files, save in the same folder and open the html file using a browser.
# Code [data.js]

We create the data that want to visualize
````
var totalSales = [
  { month: new Date(2016,10, 01), sales: 6500 },
  { month: new Date(2016,11, 01), sales: 5400 },
  { month: new Date(2016,12, 01), sales: 3500 },
  { month: new Date(2017,1, 01), sales: 9000 },
  { month: new Date(2017,2, 01), sales: 8500 },
  ];

````

# Code [index.html]


````
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
  </body>
  <link rel="stylesheet" href="./styles.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js" charset="utf-8"></script>
  <script src="./data.js"></script>
  <script src="./main.js"></script>
</html>
````
# Code [styles.css]
We define the style of the line, text and the legend
````
.axis text {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.line {
fill: none;
stroke: steelblue;
stroke-width: 2px;
}

div.legenddots {
  position: absolute;
  text-align: center;
  width: 160px;
  height: 58px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
````
# Code [main.js]

We call differents functions.
````
let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; 

setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendLineCharts();
appenddots();
````
First we define the margin
````
function setupCanvasSize() {
  margin = {top: 20, left: 80, bottom: 20, right: 30};
  width = 960 - margin.left - margin.right;
  height = 520 - margin.top - margin.bottom;
}
````
We select the svg node
````
function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",`translate(${margin.left}, ${margin.top})`);

}
````


We define the axis and its range and domain.
````
function setupXScale()
{

  x = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(totalSales, function(d) { return d.month}));
}
````


Now we define a y axis with a discrete range of values. And we create a array with the products's names
````
function setupYScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxSales]);

}
````
Add the X Axis
````
function appendXAxis() {
  svg.append("g")
    .attr("transform",`translate(0, ${height})`)
    .call(d3.axisBottom(x));
}
````
Add the Y axis
````
function appendYAxis() {
  svg.append("g")
  .call(d3.axisLeft(y));
}
````
Define the line and its values
````
function appendLineCharts()
{
  var valueline = d3.line()
                    .x(function(d) { return x(d.month); })
                    .y(function(d) { return y(d.sales); });

  svg.append("path")
  .data([totalSales])
  .attr("class", "line")
  .attr("d", valueline);

}
````
Define the dots and the actions with the mouse

````
function appenddots(){
  var div = d3.select("body").append("div")	
  .attr("class", "legenddots")				
  .style("opacity", 0);
  
    svg.selectAll("dot")	
        .data(totalSales)			
    .enter().append("circle")								
        .attr("r", 5)		
        .attr("cx", function(d) { return x(d.month); })		 
        .attr("cy", function(d) { return y(d.sales); })		
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html((d.month) + "<br/>"  + d.sales)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
      }
````