import React from "react";
import ReactDOM from "react-dom";

import Graph from "./Graph";
import { IGraphData } from "../state";

class GraphCard extends React.Component<IGraphData> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="graphcard" style={{height: "800px"}}>
                <Graph {...this.props} />
            </div>
        );
    }
}

export default GraphCard;