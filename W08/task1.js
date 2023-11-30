class BarChart {
    constructor(selector, width, height, margin) {
        this.selector = selector;
        this.width = width;
        this.height = height;
        this.margin = margin;

        this.svg = d3.select(this.selector)
            .attr('width', this.width)
            .attr('height', this.height);

        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.inner_width = this.width - this.margin.left - this.margin.right;
        this.inner_height = this.height - this.margin.top - this.margin.bottom;
    }

    update(data) {
        this.data = data;
    }

    initializeScales() {
        this.xscale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.value)])
            .range([0, this.inner_width]);

        this.yscale = d3.scaleBand()
            .domain(this.data.map(d => d.label))
            .range([0, this.inner_height])
            .paddingInner(0.1);
    }

    drawAxes() {
        const xaxis = d3.axisBottom(this.xscale)
            .ticks(5)
            .tickSizeOuter(0);

        const yaxis = d3.axisLeft(this.yscale)
            .tickSizeOuter(0);

        this.chart.append('g')
            .attr('transform', `translate(0, ${this.inner_height})`)
            .call(xaxis);

        this.chart.append('g')
            .call(yaxis);
    }

    drawBars() {
        this.chart.selectAll("rect").data(this.data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => this.yscale(d.label))
            .attr("width", d => this.xscale(d.value))
            .attr("height", this.yscale.bandwidth());
    }

    render() {
        this.initializeScales();
        this.drawAxes();
        this.drawBars();
    }
}


var data = [
    {label: 'dog', value: 100},
    {label: 'cat', value: 200},
    {label: 'horse', value: 50}
];


var width = 256;
var height = 128;
var margin = {top: 10, right: 10, bottom: 20, left: 60};

var barchart = new BarChart('#drawing_region', width, height, margin);

barchart.update(data);

barchart.render();