class PieChart {
    constructor(selector, width, height, radius) {
        this.selector = selector;
        this.width = width;
        this.height = height;
        this.radius = radius;

        this.svg = d3.select(this.selector)
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.width/2}, ${this.height/2})`);

    }

    update(data) {
        this.data = data;
        this.color = d3.scaleOrdinal(d3.schemeCategory10);
    }

    drawPieChart() {
        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);

        const arcs = this.svg.selectAll('path')
            .data(pie(this.data))
            .enter()
            .append('g');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => this.color(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .text(d => d.data.label)
            .style('fill', 'white')
            .style('font-size', '10px');
    }

    render() {
        this.drawPieChart();
    }
}

var data = [
    {label:'Apple', value:100},
    {label:'Banana', value:200},
    {label:'Cookie', value:50},
    {label:'Doughnut', value:120},
    {label:'Egg', value:80}
];

var width = 256;
var height = 256;
var radius = Math.min( width, height ) / 2;

var piechart = new PieChart('#drawing_region', width, height,radius);

piechart.update(data);

piechart.render();

