import React, { Component } from "react";
import "./Details.css";

export class DonutChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            valuelabel: 'Completed',
            size: 200,
            strokewidth: 20
        }
    }

    render() {
        const halfsize = (this.state.size * 0.5);
        const radius = halfsize - (this.state.strokewidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const strokeval = ((this.props.value * circumference) / 100);
        const dashval = (strokeval + ' ' + circumference);

        const trackstyle = { strokeWidth: this.state.strokewidth };
        const indicatorstyle = { strokeWidth: this.state.strokewidth, strokeDasharray: dashval }
        const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')';        

        return (
            <svg width={this.state.size} height={this.state.size} className="donutchart">
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track" />
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator" />
                <text className="donutchart-text" x={halfsize} y={halfsize + 6} style={{ textAnchor: 'middle' }} >
                    <tspan className="donutchart-text-val">{this.props.value}</tspan>
                    <tspan className="donutchart-text-percent">%</tspan>
                    <tspan className="donutchart-text-label" x={halfsize} y={halfsize + 10}>{this.props.valuelabel}</tspan>
                </text>
            </svg>
        );
    }
}