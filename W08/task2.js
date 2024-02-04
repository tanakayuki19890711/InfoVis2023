class LineChart {
    constructor(selector, width, height, margin) {
        this.selector = selector;
        this.width = width;
        this.height = height;

        this.svg = d3.select(this.selector)
            .attr('width', this.width)
            .attr('height', this.height);
    }

    update(data) {
        this.data = data;
    }

    drawLines() {
        const area = d3.area()
                .x( d => d.x )
                .y1( d => d.y )
                .y0( 0 );
        
        this.svg.append('path')
            .attr('d', area(data))
            .attr('stroke', 'black')
            .attr('fill', 'black');
    }

    render() {
        this.drawLines();
    }
}

var data = [
    {x:0, y:100},
    {x:4, y:5},
    {x:90, y:80},
    {x:120, y:30},
    {x:200, y:50}
];

var width = 256;
var height = 128;

var linechart = new LineChart('#drawing_region', width, height);

linechart.update(data);

linechart.render();