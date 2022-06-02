<script lang="ts">

import type { PropType } from "vue"
import { defineComponent } from 'vue'
import * as d3 from "d3";

interface IData {
    company: string,
    offers: number
}

export default defineComponent({
    name: "BarChart",
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
                .select("#bar-chart")
                .append("svg")
                .attr("width", this.width + (this.margin * 2))
                .attr("height", this.height + (this.margin * 2))
                .append("g")
                .style(
                    "transform",
                    `translate(${this.margin}px, 15px)`
                );

            const yAccessor = (d: IData): number => d.offers;
            const xAccessor = (d: IData): string => d.company;

            const yScale = d3
                .scaleLinear()
                .domain([this.minOffer(), this.maxOffer() + 2])
                .range([this.height, 0]);

            const xScale = d3
                .scaleBand()
                .domain(this.chartData.map((s) => xAccessor(s)))
                .range([0, this.width])
                .padding(0.2);

            const xAxisGenerator = d3.axisBottom(xScale)

            svg.append("g")
                .call(xAxisGenerator)
                .attr("transform", "translate(0," + this.height + ")")
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            const yAxisGenerator = d3.axisLeft(yScale).ticks(5)

            svg.append("g")
                .call(yAxisGenerator)
                .style("color", "rgb(139, 138, 141)");

            svg.selectAll("bars")
                .data(this.chartData)
                .enter()
                .append("rect")
                .attr("x", d => (xScale(d.company) ?? "Indéfinie"))
                .attr("y", d => yScale(d.offers))
                .attr("width", xScale.bandwidth())
                .attr("height", d => this.height - yScale(d.offers))
                .attr("fill", "#4a46de");
        }
    }
});
</script>


<template>
    <div id="bar-chart"></div>
</template>

