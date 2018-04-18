
//introduce the dataset
var totalSales = [
  { product: 'Hoodie', sales: 7,"color":"yellow" },
  { product: 'Jacket', sales: 6, "color":"gree"},
  { product: 'Snuggie', sales: 9,"color":"brown" },
  ];

//set the dimensions and margins of the graph
var margin = {top: 100, right: 180, bottom: 120, left:130},
width = 960 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;
//select the SVG node
var svg = d3.select('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
//select all rectangles
var rects = svg.selectAll('rect')
  .data(totalSales);
 
//calculate the max sales to show in the graph to calculate the max width for the X axis
var maxSales = d3.max(totalSales, function(d, i) {
  return d.sales;
});
// we define the scale
var y = d3.scaleLinear()
//the domain defines the value range of the input dataset
  .range([height,0])
  .domain([0, maxSales]);
      

var x = d3.scaleBand()
  .rangeRound([0, width-20])
  .domain(totalSales.map(function(d, i) {
    return d.product;
  }))
  .paddingInner(0.05);
  //define the rects
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

// add the x Axis
 svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
  .call(d3.axisLeft(y));

//legend
var legend = svg.selectAll('.legend')
  .data(totalSales)
  .enter().append('g')
  .attr("class", "legend")
  .attr("transform", function (d, i) {
  {
      return "translate(0," + i * 20 + ")"
  }
})

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

  // Add title	  
svg.append("svg:text")
  .attr("class", "title")
  .attr("x", 20)
  .attr("y", 20)
  .text("Number of Products Sold");

