import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";


function get_input() {
    let input_element = document.getElementById("day-input");
    return input_element.value;
}

async function render_graph(days, data_string) {
    const response = await fetch("./sources/data/dummy_data.json");
    const weather = await response.json();

    let div_width = document.getElementById("plot").clientWidth;

    let today = new Date();
    let first_day = new Date();
    first_day.setDate(today.getDate() - days);

    const plot = Plot.plot({
        width: Math.max(div_width, 600),
        height: div_width * 0.625,
        style: "overflow: visible;",
        color: {
            type: "categorical",
            scheme: "Tableau10",
            legend: true
        },
        x: {domain: [first_day, today], grid: true},
        y: {
            grid: true,
            transform: (t) => t / 10
        },
        marks: [
            Plot.axisX({label: "Date"}),
            Plot.axisY({label: data_string}),
            Plot.ruleY([-10]),
            Plot.lineY(weather, {x: "date", y: data_string, tip: "xy", stroke: "station_code"}),
            Plot.text(weather, Plot.selectLast({x: "date", y: data_string, z: "station_code", text: "station_code", textAnchor: "start", dx: 3}))
        ]
    });
    const div = document.querySelector("#plot");
    div.innerHTML = "";
    div.append(plot);
    return "Rendered plot";
}

function get_sensor() {
    return document.getElementById("sensors").value;
}

document.getElementById("1-day").addEventListener("click", function () { render_graph(1, get_sensor())});
document.getElementById("3-days").addEventListener("click", function () { render_graph(3, get_sensor())});
document.getElementById("7-days").addEventListener("click", function () { render_graph(7, get_sensor())});
document.getElementById("day-input").addEventListener("keydown", function () { render_graph(get_input(), get_sensor())});

window.onload = function() {
    render_graph(1, get_sensor());
};





