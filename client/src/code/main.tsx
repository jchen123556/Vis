import React from "react";
import ReactDOM from "react-dom";

import "../css/main.css";

import { BaseLayout } from "./components/BaseLayout";

// const head = ReactDOM.render(<Header/>, document.head);
const base = ReactDOM.render(<BaseLayout/>, document.body);