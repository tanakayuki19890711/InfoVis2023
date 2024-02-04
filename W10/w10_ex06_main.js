var data = [100,50,80,20];

var svg = d3.select('#drawing_region');
update( data );

function update(data) {
    let padding = 10;
    let height = 20;

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .transition().duration(1000)
        .attr("x", padding)
        .attr("y", (d,i) => padding + i * ( height + padding ))
        .attr("width", d => d)
        .attr("height", height);
}

d3.select('#reverse')
    .on('click', d => {
        data.reverse();
        update(data);
    });
    var data = [
        {x:20,y:20,r:10},
        {x:100,y:50,r:10},
        {x:70,y:80,r:10},
        {x:170,y:30,r:10},
        {x:150,y:70,r:10}];
    
    var svg = d3.select('#drawing_region');
    
    let circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle');
    
    circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.r);
    
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
    