import { select } from "d3-selection";

export const drawMouth = (width, height) => {
    const svg = select("#mouth")
         .append("svg")
            .attr("viewBox", `0, 0, ${width}, ${height}`)
            .style("opacity", "0.5");

    svg.append("g")
        .attr("class", "circle")
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", 150)
        .attr("stroke", "red")
        .attr("stroke-width", 30)
        .attr("fill", "black");
}