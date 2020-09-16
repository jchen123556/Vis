import { GraphType } from "./components/Graph";

export function createState(parentComponent) {
    return {
        // Flag to check if the component loading
        loading: false,

        // List of graphs to render
        graphData: [{type: GraphType.Line, tableName: "rawdata"}],

        // Number of cards currently displaying
        numCards: 0,

        // View that is currently showing (home, )
        currentView: "home",
    }
}

export interface IGraphData {
    type: GraphType,
    tableName: string
}