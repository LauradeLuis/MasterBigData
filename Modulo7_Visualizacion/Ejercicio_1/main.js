var totalSales = [
  { product: 'Hoodie', sales: 7 },
  { product: 'Jacket', sales: 6 },
  { product: 'Snuggie', sales: 9 },
  ];

  var svg = d3.select('svg');

  var rects = svg.selectAll('rect')
  .data(totalSales);

  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  var x = d3.scaleLinear()
  .range([0, 350])
  .domain([0, maxSales]);

  var y = d3.scaleBand()
  .rangeRound([0, 75])
  .domain(totalSales.map(function(d, i) {
    return d.product;
  }));

  var newRects = rects.enter();

  newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.bandwidth)
  .attr('width', function(d, i) {
    return x(d.sales);
  });

  