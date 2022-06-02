<script lang="ts">

import type { PropType } from "vue"
import { defineComponent } from 'vue'
import * as d3 from "d3";

interface IData {
    day: string,
    offers: number
}

export default defineComponent({
    name: "Line Chart",
    props: {
        chartData: {
            type: Array as PropType<IData[]>,
            default: () => [],
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        margin: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        compareDate(d1: Date, d2: Date): boolean {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getDate() === d2.getDate() &&
                d1.getMonth() === d2.getMonth();
        },
        maxOffer(): number {
            var tmp: number = 0;
            this.chartData.map((value) => {
                if (value.offers > tmp)
                    tmp = value.offers
            })
            return tmp
        },
        minOffer(): number {
            var tmp: number = 0;
            this.chartData.map((value) => {
                if (value.offers < tmp)
                    tmp = value.offers
            })
            return tmp
        },
        init() {

            //We are accessing the div with the id chart using d3's select method and appending svg
            const svg = d3
                .select("#line-chart")
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .append("g")
                .style(
                    "transform",
                    `translate(${this.margin}px, 15px)`
                );

            const yAccessor = (d: IData): number => d.offers;
            const parser = d3.timeParse("%Y-%m-%d");
            const xAccessor = (d: IData): Date => parser(d.day) ?? new Date("1900-01-01");

            const bounded = 200

            const yScale = d3
                .scaleLinear()
                .domain([this.minOffer(), this.maxOffer() + 2])
                .range([this.height, 0]);

            const xScale = d3
                .scaleTime()
                .domain(<[Date, Date]>d3.extent(this.chartData, xAccessor))
                .range([0, this.width])

            const line = d3
                .line<IData>()
                .x((d) => xScale(xAccessor(d)))
                .y((d) => yScale(yAccessor(d)))

            svg
                .append("path")
                .attr("d", line(this.chartData))
                .attr("fill", "none")
                .attr("stroke", "#4a46de")
                .attr("stroke-width", 3);

            const yAxisGenerator = d3.axisLeft(yScale).ticks(5)

            svg.append("g")
                .call(yAxisGenerator)
                .style("color", "rgb(139, 138, 141)");

            const xAxisGenerator = d3.axisBottom<Date>(xScale).tickFormat(d3.timeFormat("%b %d")).ticks(5)

            svg.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${bounded}px)`)
                .style("color", "rgb(139, 138, 141)");

            // Create the circle that travels along the curve of chart
            var focus = svg
                .append('g')
                .append('circle')
                .style("fill", "#ffffff")
                .attr("stroke", "#4a46de")
                .attr('r', 5)
                .attr("stroke-width", 2)
                .style("opacity", 0)

            // Create the text that travels along the curve of chart
            var focusText = svg
                .append('g')
                .append('text')
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")
                .style("opacity", 0)
                .style("font-weight", 600)


            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover() {
                focus.style("opacity", 1)
                focusText.style("opacity", 1)
            }

            const mousemove = (event: any) => {

                var x0: Date = xScale.invert(event.layerX);
                const selectedData: IData = this.chartData.filter((value: IData) => this.compareDate(xAccessor(value), x0))[0]

                focus
                    .attr("cx", xScale(xAccessor(selectedData)))
                    .attr("cy", yScale(yAccessor(selectedData)))

                focusText
                    .html("Offres : " + yAccessor(selectedData))
                    .attr("x", xScale(xAccessor(selectedData)))
                    .attr("y", yScale(yAccessor(selectedData)))
            }

            function mouseout() {
                focus.style("opacity", 0)
                focusText.style("opacity", 0)
            }

            svg.append('rect')
                .style("fill", "none")
                .style("pointer-events", "all")
                .attr('width', this.width)
                .attr('height', this.height)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseout', mouseout);
        }
    }
});
</script>


<template>
    <div id="line-chart"></div>
</template>

