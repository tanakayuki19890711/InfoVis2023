class MyD3Chart {
    constructor(selector, csvFile) {
        this.selector = selector;
        this.csvFile = csvFile;
        this.svg = d3.select(selector);
        this.loadData();
    }

    loadData() {
        d3.csv(this.csvFile).then(data => {
            this.data = data.map(d => +d.value);
            this.update(this.data);
        });
    }

    update(data) {
        let padding = 10;
        let height = 20;
        this.svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", padding)
            .attr("y", (d, i) => padding + i * (height + padding))
            .attr("width", d => d)
            .attr("height", height);
    }

    reverseData() {
        this.data.reverse();
        this.update(this.data);
    }

    sortDataAscend() {
        this.data.sort((a, b) => a - b);
        this.update(this.data);
    }

    sortDataDescend() {
        this.data.sort((a, b) => b - a);
        this.update(this.data);
    }
}

const myChart = new MyD3Chart('#drawing_region', 'https://tanakayuki19890711.github.io/InfoVis2023/W10/task1.csv');
// const myChart = new MyD3Chart('#drawing_region', '/Users/tanakayuuki/Work/InfoVis2023/W10/task1.csv');

d3.select('#reverse').on('click', () => myChart.reverseData());
d3.select('#ascend').on('click', () => myChart.sortDataAscend());
d3.select('#descend').on('click', () => myChart.sortDataDescend());
