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
        // 刻み幅の初期値を設定
        this.epochStep = 1; // 初期刻み幅

        // 刻み幅変更用のボタンイベントを追加
        d3.select("#btn-decrease").on("click", () => this.changeEpochStep(-1));
        d3.select("#btn-increase").on("click", () => this.changeEpochStep(1));
    }

    // 刻み幅を変更するメソッド
    changeEpochStep(change) {
        // 刻み幅を更新
        this.epochStep = Math.max(1, this.epochStep + change);
        // グラフを更新
        this.update(this.data);
    }

    loadData() {
        d3.csv(this.csvFile).then(data => {
            this.data = data.map((d, i) => ({x: d.epoch, y: d.loss}));
            console.log(this.data);
            this.xScale = d3.scaleLinear()
                            .domain([0, this.data.length - 1])
                            .range([0, this.width]);
            this.yScale = d3.scaleLinear()
                            .domain([0, d3.max(this.data, d => d.y)])
                            .range([this.height, 0]);
            this.update(this.data);
        });
    }

//     update(data) {
//         // データをフィルタリングして刻み幅に応じたデータを表示
//         data = data.filter((d, i) => i % this.epochStep === 0);
//         let line = d3.line()
//                      .x((d, i) => this.xScale(i))
//                      .y(d => this.yScale(d.y));

//         this.svg.selectAll(".line")
//             .data([data]) // d3.line expects an array of data points
//             .join("path")
//             .attr("class", "line")
//             .attr("d", line)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-width", 2);

//         // X軸の追加
//         this.svg.append("g")
//             .attr("transform", "translate(0," + this.height + ")")
//             .call(d3.axisBottom(this.xScale));

//         // Y軸の追加
//         this.svg.append("g")
//             .call(d3.axisLeft(this.yScale));
//     }
// }

update(data) {
    // データをフィルタリングして刻み幅に応じたデータを表示
    data = data.filter((d, i) => i % this.epochStep === 0);

    // xScaleのドメインを更新
    this.xScale.domain([0, d3.max(data, d => +d.x)]);

    let line = d3.line()
                 .x(d => this.xScale(+d.x)) // データのx値に基づいてスケールを適用
                 .y(d => this.yScale(+d.y));

    this.svg.selectAll(".line")
        .data([data]) // d3.line expects an array of data points
        .join("path")
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // X軸を更新するために以前のX軸を削除
    this.svg.selectAll("g.x-axis").remove();

    // X軸の追加（更新）
    this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "x-axis") // X軸のためのクラスを追加
        .call(d3.axisBottom(this.xScale));

       // Y軸の追加
       this.svg.append("g")
       .call(d3.axisLeft(this.yScale));
}
}
const myLossGraph = new MyLossGraph('#drawing_region', 'https://tanakayuki19890711.github.io/InfoVis2023/finalwork/loss.csv');
// const myLossGraph = new MyLossGraph('#drawing_region', '/Users/tanakayuuki/Work/InfoVis2023/finalwork/loss.csv');

