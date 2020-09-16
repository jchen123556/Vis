import React from "react";
import ReactDOM from "react-dom";

// Material UI imports
import { AppBar, Toolbar, Menu, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";

import GraphCardList from "./GraphCardList";
import { createState } from "../state";

export class BaseLayout extends React.Component {
    state = createState(this);

    render() {
        return (
            <div className="container">
                <div className="headercontainer">
                    <AppBar position = "static">
                        <Toolbar style={{backgroundColor: "#00334e"}}>
                            <IconButton style={{paddingRight: "20px"}}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Visualization
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <GraphCardList state={this.state}/>
                </div>
            </div>
        );
    }
}