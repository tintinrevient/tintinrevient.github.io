import { scaleOrdinal, scaleRadial } from "d3-scale";
import { colors } from "./colors";

export const colorScale = scaleOrdinal()
    .domain(colors.map(d => d.label))
    .range(colors.map(d => d.color));

export const getRadius = (maxYears, years) => {

    const radialScale = scaleRadial()
        .domain([0, maxYears])
        .range([0, 30]);
    
    return radialScale(years);
}