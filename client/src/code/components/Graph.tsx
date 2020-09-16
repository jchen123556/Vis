import React from "react";
import ReactDOM from "react-dom";

import * as d3 from "d3";

import {IGraphData} from "../state";

export enum GraphType {
    Line,
}

interface IData {
    ID: number,
    product: string,
    time: number,
    sales: number
}

class Graph extends React.Component<IGraphData> {
    private node: any;

    constructor(props: IGraphData) {
        super(props);
        this.node = React.createRef();
        this.initGraph = this.initGraph.bind(this);
    }

    componentDidMount() {
        this.initGraph(GraphType.Line, this.props.tableName);
    }

    componentDidUpdate() {
        this.initGraph(GraphType.Line, this.props.tableName);
    }

    private initGraph(type: GraphType, dbtable: string) {
        if (type == GraphType.Line) {
            const padding = 50;
            const node = this.node;

            d3.json<IData[]>("http://localhost/db/" + dbtable).then((data) => {
                // console.log(data);
                data = data.sort((d1, d2) => {
                    return d1.time - d2.time;
                });

                let datalistx: number[] = []; 
                for (let dataentry of data) {
                    datalistx.push(dataentry.time);
                }
            
                let xScale = d3.scaleLinear()
                    .domain([d3.min(datalistx)!, d3.max(datalistx)!])
                    .range([0, node.current.clientWidth-(padding*2)]);
                let xAxis = d3.axisBottom(xScale);

                let datalisty: number[] = []; 
                for (let dataentry of data) {
                    datalisty.push(dataentry.sales);
                }

                let yScale = d3.scaleLinear()
                    .domain([0, d3.max(datalisty)!])
                    .range([node.current.clientHeight-(padding*2), 0]);
                let yAxis = d3.axisLeft(yScale);

                d3.select(node.current)
                    .append("g")
                    .attr("transform", "translate(" + padding + ", " + (node.current.clientHeight - padding) + ")")
                    .call(xAxis);
                d3.select(node.current)
                    .append("g")
                    .attr("transform", "translate(" + padding + ", " + padding + ")")
                    .call(yAxis);
                
                const line = d3.line<IData>()
                    .x(d => xScale(d.time))
                    .y(d => yScale(d.sales));

                d3.select(node.current)
                    .append("path")
                    .datum(data)
                    .attr("stroke", "steelblue")
                    .attr("fill", "none")
                    .attr("transform", "translate(" + padding + ", " + padding + ")")
                    .attr("d", line as any);

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return <svg ref={this.node} width={"100%"} height={"100%"} ></svg>;
    }
}

export default Graph;