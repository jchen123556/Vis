import React from "react";
import ReactDOM from "react-dom";

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from "@material-ui/core";

import GraphCard from "./GraphCard";

const GraphCardList = ({ state }) => (
    <div>
        { state.graphData.map(graph => (
            <GraphCard {...graph}/>
        ))}
        <div>
            <IconButton style={{ display: "block", margin: "auto" }}>
                <AddCircleIcon style={{ fontSize: "5rem", color: "#ee6f57" }}/>
            </IconButton>
        </div>
    </div>
);

export default GraphCardList;