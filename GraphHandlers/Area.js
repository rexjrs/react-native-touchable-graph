import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
PanResponder
} from 'react-native';
import Svg,{
    Path
} from 'react-native-svg';

export default class Area extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            areaWidth: 0,
            areaHeight: 0,
            selectedPoint: null,
            graphLine: "M0"
        };
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt) => {
                let pos = evt.nativeEvent.locationX
                let width = this.state.areaWidth/this.props.dataSource.length;
                let tmp = Math.floor(pos/width)
                this.setState({
                    selectedPoint: tmp
                })
            },
            onPanResponderMove: (evt) => {
                let pos = evt.nativeEvent.locationX
                let width = this.state.areaWidth/this.props.dataSource.length;
                let tmp = Math.floor(pos/width)
                if(tmp < this.props.dataSource.length){
                    if(tmp > -1){
                        this.setState({
                            selectedPoint: tmp
                        })
                    }
                }
            },
            onPanResponderRelease: (evt) => {
                this.setState({selectedPoint: null})
            }
        });
        this.createLine();
    }

    componentWillReceiveProps(){
        this.createLine();
    }

    createLine(){
        let graphLine = "M0"
        let second = 3;
        this.props.dataSource.map((b,i)=>{
            let max = Math.max.apply(Math,this.props.dataSource.map(function(o){return o.y;}));
            let pointHeight = (b.y/max)*this.state.areaHeight;
            let left = -(this.props.pointSize/2);
            let splitWidth = (this.state.areaWidth/(this.props.dataSource.length-1));
            removeSome = this.props.XAxisTextWidth/this.props.dataSource.length
            splitWidth = splitWidth-removeSome;
            if(i === 0){
                left = 0;
            }else if(i === this.props.dataSource.length-1){
                left = ((splitWidth)*i)+(this.props.pointSize/2);
            }else{
                left = ((splitWidth*i))+(this.props.pointSize/2);
            }
            let first = this.state.areaHeight-pointHeight
            if(i !== this.props.dataSource.length-1){
                graphLine += ' '+first+' L'+(second+splitWidth)+' '
                second = second+splitWidth
            }else{
                graphLine += ' '+first
            }
        });
        this.setState({
            graphLine: graphLine
        })
    }

    render() {
        var points = this.props.dataSource.map((b,i)=>{
            let max = Math.max.apply(Math,this.props.dataSource.map(function(o){return o.y;}));
            let pointHeight = (b.y/max)*this.state.areaHeight;
            let left = -(this.props.pointSize/2);
            let splitWidth = (this.state.areaWidth/(this.props.dataSource.length-1));
            removeSome = this.props.XAxisTextWidth/this.props.dataSource.length
            splitWidth = splitWidth-removeSome;
            if(i === 0){
                left = 0;
            }else if(i === this.props.dataSource.length-1){
                left = ((splitWidth)*i)+(this.props.pointSize/2);
            }else{
                left = ((splitWidth*i))+(this.props.pointSize/2);
            }
            return(
                <View key={i} style={[styles.dot,{
                    bottom: pointHeight-(this.props.pointSize/2)-3,
                    left: left-(this.props.pointSize/2),
                    height: this.props.pointSize,
                    width: this.props.pointSize,
                    borderRadius: this.props.pointSize/2,
                    backgroundColor: this.props.pointColor
                }]}>

                </View>
            )
        })
        var lines = [];
        for(var i = 0;i<5;i++){
            let top = this.state.areaHeight/5
            if(i === 0){
                top = 0;
            }else{
                top = top*i
            }
            lines.push(
                <View key={i} style={[styles.graphLine,{
                    top: top,
                    width: this.state.areaWidth-3,
                    backgroundColor: 'gray'
                }]}>

                </View>
            )
        }
        var dataNum = this.props.dataSource.map((b,i)=>{
            let max = Math.max.apply(Math,this.props.dataSource.map(function(o){return o.y;}));
            let pointHeight = (b.y/max)*this.state.areaHeight;
            let left = -(this.props.pointSize/2);
            let splitWidth = (this.state.areaWidth/(this.props.dataSource.length-1));
            removeSome = this.props.XAxisTextWidth/this.props.dataSource.length
            splitWidth = splitWidth-removeSome;
            if(i === 0){
                left = 0;
            }else if(i === this.props.dataSource.length-1){
                left = ((splitWidth)*i)-(this.props.pointSize/2)-10;
            }else{
                left = ((splitWidth*i))+(this.props.pointSize/2);
            }
            if(b.y === max){
                pointHeight = pointHeight-20;
            }
            return(
                this.state.selectedPoint === i &&
                <View key={i} style={[styles.dataNum,{
                    bottom: pointHeight-(this.props.pointSize/2)+3,
                    left: left+(this.props.pointSize/2)
                }]}>
                    <Text style={{
                        backgroundColor: 'transparent',
                        color: "black"
                    }}>{b.y}</Text>
                </View>
            )
        })
        return (
            <View 
            {...this._panResponder.panHandlers}
            onLayout={(event) => this.setState({areaWidth: event.nativeEvent.layout.width, areaHeight: event.nativeEvent.layout.height})}
            style={[styles.container,{
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor,
                borderLeftWidth: 3,
                borderBottomWidth: 3
            }]}>
                <View style={{position: "absolute", width: this.state.areaWidth, height: this.state.areaHeight}}>
                <Svg
                    height={this.state.areaHeight}
                    width={this.state.areaWidth}
                >
                    <Path
                        d={this.state.graphLine}
                        fill="none"
                        stroke={this.props.lineColor}
                        strokeWidth={this.props.lineWidth}
                    />
                </Svg>  
                </View>
                {dataNum}
                {lines}
                {points}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dot: {
        position: "absolute"
    },
    graphLine: {
        height: 1,
        position: "absolute"
    },
    dataNum: {
        position: "absolute"
    }
});