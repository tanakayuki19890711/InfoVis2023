class MyLossGraph {
    constructor(selector, csvFile) {
        this.selector = selector;
        this.csvFile = csvFile;
        this.svg = d3.select(selector);
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.svg = this.svg
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.loadData();
    }

    loadData() {
        d3.csv(this.csvFile).then(data => {
            this.data = data.map((d, i) => ({x: i, y: +d.value}));
            this.xScale = d3.scaleLinear()
                            .domain([0, this.data.length - 1])
                            .range([0, this.width]);
            this.yScale = d3.scaleLinear()
                            .domain([0, d3.max(this.data, d => d.y)])
                            .range([this.height, 0]);
            this.update(this.data);
        });
    }

    update(data) {
        let line = d3.line()
                     .x((d, i) => this.xScale(i))
                     .y(d => this.yScale(d.y));

        this.svg.selectAll(".line")
            .data([data]) // d3.line expects an array of data points
            .join("path")
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);

        // Add the X Axis
        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale));

        // Add the Y Axis
        this.svg.append("g")
            .call(d3.axisLeft(this.yScale));
    }
}


// const myLossGraph = new MyLossGraph('#drawing_region', 'https://tanakayuki19890711.github.io/InfoVis2023/finalwork/loss.csv');
const myLossGraph = new MyLossGraph('#drawing_region', '/Users/tanakayuuki/Work/InfoVis2023/finalwork/loss.csv');

