class MyLossGraph {
    constructor(selector, csvFile) {
        this.selector = selector;
        this.csvFile = csvFile;
        this.svg = d3.select(selector);
        this.margin = { top: 30, right: 30, bottom: 60, left: 50 };
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.svg = this.svg
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.loadData();
        this.maxLoss = 0;
        // 刻み幅の初期値を設定
        this.epochStep = 1; // 初期刻み幅

        // 刻み幅変更用のボタンイベントを追加
        d3.select("#btn-decrease").on("click", () => this.changeEpochStep(-1));
        d3.select("#btn-increase").on("click", () => this.changeEpochStep(1));
    }

    changeEpochStep(change) {
        if (change < 0) {
            // 刻み幅を半分にする
            this.epochStep = Math.max(1, this.epochStep / 2);
        } else if (change > 0) {
            // 刻み幅を2倍にする
            this.epochStep *= 2;
        }
        // グラフを更新
        this.update(this.data);

        // 現在の刻み幅を表示するためのメソッドを呼び出す
        this.updateEpochStepDisplay();
    }
    

    loadData() {
        d3.csv(this.csvFile).then(data => {
            this.data = data.map(d => ({
                x: +d.epoch, // `+`を使って文字列から数値へ変換
                y: +d.loss   
            }));
    
            // データセット全体のlossの最大値を計算
            this.maxLoss = d3.max(this.data, d => +d.y); 
    
            console.log(this.data);
            console.log(this.maxLoss); 

            this.xScale = d3.scaleLinear()
                            .domain([0, this.data.length - 1])
                            .range([0, this.width]);
            this.yScale = d3.scaleLinear()
                            .domain([0, this.maxLoss]) // Y軸のスケールをlossの最大値に基づいて設定
                            .range([this.height, 0]);
            this.update(this.data);
        });
    }

updateEpochStepDisplay() {
    // 現在の刻み幅を表示領域に更新
    d3.select("#epoch-step-display").text(`現在の刻み幅: ${this.epochStep}`);
}

update(data) {
    // データをフィルタリングして刻み幅に応じたデータを表示
    data = data.filter((d, i) => i % this.epochStep === 0);
    // console.log(data);

    // xScaleのドメインを更新
    this.xScale.domain([0, d3.max(data, d => +d.x)]);

    // yScaleのドメインをデータセットのlossの最大値に基づいて更新
    this.yScale.domain([0, this.maxLoss]); // 常に全データの最大値に基づく

    let line = d3.line()
                 .x(d => this.xScale(+d.x)) // データのx値に基づいてスケールを適用
                 .y(d => this.yScale(+d.y));

    this.svg.selectAll(".line")
        .data([data]) 
        .join("path")
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // グラフのタイトルを追加
    this.svg.append("text")
        .attr("x", (this.width / 2))             
        .attr("y", 0 - (this.margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("text-decoration", "underline")  
        .text("Loss Value by Epoch");

    // X軸のラベルを追加
    this.svg.append("text")             
        .attr("transform", "translate(" + (this.width/2) + " ," + (this.height + this.margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("epoch");

    // Y軸のラベルを追加
    this.svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left)
        .attr("x",0 - (this.height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("loss");

    // X軸を更新するために以前のX軸を削除
    this.svg.selectAll("g.x-axis").remove();

    // X軸の追加（更新）
    this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "x-axis") // X軸のためのクラスを追加
        .call(d3.axisBottom(this.xScale))

    // Y軸の追加
    this.svg.append("g")
       .call(d3.axisLeft(this.yScale))
}
}
function showImage() {
    var epoch = document.getElementById("epochInput").value; // 入力されたエポックを取得
    var imageUrl = getImageUrlForEpoch(epoch); // エポックに基づいた画像のURLを取得する関数（実装が必要）
    var imageDisplay = document.getElementById("imageDisplay"); // 画像を表示する要素を取得
    imageDisplay.innerHTML = `<img src="${imageUrl}" alt="Image for epoch ${epoch}">`; // 画像を表示
}

function getImageUrlForEpoch(epoch) {
    // ここでエポックに対応する画像のURLを返すロジックを実装します。
    // 例えば、画像が特定のパターンでURLが設定されている場合、そのパターンに基づいてURLを構築できます。
    return `https://tanakayuki19890711.github.io/InfoVis2023/finalwork/${epoch}.png`; // 仮のURL構築例
}
const myLossGraph = new MyLossGraph('#drawing_region', 'https://tanakayuki19890711.github.io/InfoVis2023/finalwork/loss.csv');
// const myLossGraph = new MyLossGraph('#drawing_region', '/Users/tanakayuuki/Work/InfoVis2023/finalwork/loss.csv');

