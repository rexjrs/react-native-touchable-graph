# react-native-touchable-graph
Created by Thomas Charlesworth

Example youtube video (click to see):
[![IMAGE ALT TEXT](http://img.youtube.com/vi/8XfkclUNLh0/0.jpg)](https://www.youtube.com/watch?v=8XfkclUNLh0 "react-native-touchable-graph")

```js
    import GraphContainer from './GraphHandlers/GraphContainer';
    
    <GraphContainer 
        dataSource={this.state.dataSource}
        width={this.state.width}
        height={this.state.height}
        backgroundColor="#F2F2F2"
        borderColor="#FF9800"
        fontSizeY={11}
        fontSizeX={11}
        pointSize={7}
        pointColor="black"
        lineWidth={2}
        lineColor="#FF9800"
    />
```

Dependency: 

https://github.com/react-native-community/react-native-svg

Installation:

1) Install react-native-svg

2) Download react-native-touchable-graph https://github.com/rexjrs/react-native-touchable-graph/archive/master.zip

3) Unzip file and place into project

4) import file: GraphContainer.js into project, see example above

Required Props:
```js
dataSource // Array, example: [{y: 1, x: "Thomas"},{y: 2, x: "Dennis"}]
width // Numeric Value
height // Numeric Value
backgroundColor // Any react native color EG, "red" , "#FF9800"
borderColor // Any react native color EG, "red" , "#FF9800"
fontSizeY //Numeric Value
fontSizeX // Numeric Value
pointSize // Numeric Value
pointColor // Any react native color EG, "red" , "#FF9800"
lineWidth // Numeric Value
lineColor // Any react native color EG, "red" , "#FF9800"
```