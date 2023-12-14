d3.csv("https://tanakayuki19890711.github.io/InfoVis2023/W10/task2.csv").then(function(data) {
    data.forEach(function(d) {
        d.x = +d.x; 
        d.y = +d.y; 
        d.r = +d.r; 
    });

    var margin = { top: 50, right: 20, bottom: 50, left: 70 };
    var width = 500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    
    var svg = d3.select('#drawing_region')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.x) + 10])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y) + 10])
        .range([height, 0]);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => d.r);
});
    
    circles
        .on('mouseover', (e,d) => {
            d3.select('#tooltip')
                .style('opacity', 1)
                .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
        })
        .on('mousemove', (e) => {
            const padding = 10;
            d3.select('#tooltip')
                .style('left', (e.pageX + padding) + 'px')
                .style('top', (e.pageY + padding) + 'px');
        })
        .on('mouseleave', () => {
            d3.select('#tooltip')
                .style('opacity', 0);
        });
    
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale));
    
    svg.append('g')
        .call(d3.axisLeft(yScale));
    
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => d.r);
    
    svg.append('text')
        .attr('x', (width / 2))             
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')  
        .style('font-size', '16px') 
        .text('Scatter Plot Title');
    
    svg.append('text')
        .attr('x', width / 2 )
        .attr('y', height + margin.bottom - 10)
        .style('text-anchor', 'middle')
        .text('X Axis Label');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x',0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Y Axis Label'); 

    // }).catch(function(error) {
    //     console.log(error);
    // });
    


