#   Mandatory Exercise: 


  Display a barchart (start from barchart refactor sample):

   *  Adding space between columns.
   *  Adding colors to each bar.
   *  Adding a legend.
   *  Showing the chart vertically.

# How to start it
First we create a basic index.html and a main.js where write the code.

We download the files, save in the same folder and open the html file using a browser.

# Code[index.html]

````
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title> 
  </head>
  <body>
    <svg width="800" height="600"> </svg>
  </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js" charset="utf-8"></script>
    <script src="./main.js"></script>
  </html>
````

# Code [main.js]  
We introduce the dataset and add the variable color 
````
var totalSales = [
  { product: 'Hoodie', sales: 7,"color":"yellow" },
  { product: 'Jacket', sales: 6, "color":"green"},
  { product: 'Snuggie', sales: 9,"color":"brown" },
  ];
````

Set the dimensions and margins of the graph.
````
var margin = {top: 100, right: 180, bottom: 120, left:130},
width = 960 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;
````
Select the SVG node
````
var svg = d3.select('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
````

Select all rectangles
````
var rects = svg.selectAll('rect')
  .data(totalSales);
 ````
Calculate the max sales to show in the graph to calculate the max width for the X axis
````
var maxSales = d3.max(totalSales, function(d, i) {
  return d.sales;
});
````

We define axis range and scales. The domain defines the value range of the input dataset.

````
var y = d3.scaleLinear()

  .range([height,0])
  .domain([0, maxSales]);
````  

Keep in mind the legend to define the range.
PaddingInner add the space between bars.
````
var x = d3.scaleBand()
  .rangeRound([0, width-20])
  .domain(totalSales.map(function(d, i) {
    return d.product;
  }))
  .paddingInner(0.05);
 ````
 Define rects 
 ```` 
var newRects = rects.enter();
  
 newRects.append('rect')
 .attr('x', function(d, i) {
    return x(d.product);
  })
 .attr('y',function(d){
    return y(d.sales);
  })
  .attr('width', x.bandwidth)
  .attr('height', function(d) {
    return height-y(d.sales);
  })
  .style("fill",function(d){return d.color;});
````

Add the x Axis
````
 svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
````

Add the y Axis
````
svg.append("g")
  .call(d3.axisLeft(y));
````

Add the legend
````
var legend = svg.selectAll('.legend')
  .data(totalSales)
  .enter().append('g')
  .attr("class", "legend")
  .attr("transform", function (d, i) {
  {
      return "translate(0," + i * 20 + ")"
  }
})
````
The rects of the legend
````
legend.append('rect')
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function (d) {
  return d.color
})
  .style("stroke",function(d){return d.color})
  .attr("transform", "translate(" + (width - 15) + ",20)");
````
And the legend's text
````
  legend.append('text')
  .attr("x", 20)
  .attr("y", 10)
  .text(function (d) {
  return d.product
})
  .attr("class", "textselected")
  .style("text-anchor", "start")
  .style("font-size", 15)
  .attr("transform", "translate(" + (width - 15) + ",20)");
````

Add a title
  ````	  
svg.append("svg:text")
  .attr("class", "title")
  .attr("x", 20)
  .attr("y", 20)
  .text("Number of Products Sold");

````