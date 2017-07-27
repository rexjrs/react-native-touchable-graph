import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View
} from 'react-native';
import {calcAxis} from './ScaleCalc';

export default class YAxis extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            textHeight: this.props.fontSize*(13.5/11)
        };
    }
    
    render() {
        let ySide = [];
        let max = Math.max.apply(Math,this.props.dataSource.map(function(o){return o.y;}));
        let min = Math.min.apply(Math,this.props.dataSource.map(function(o){return o.y;}));
        if(max === min){
            min = 0
        }
        let scaling;
        calcAxis(((res)=>{
            scaling = res;
        }),7,min,max)
        let nextMax = scaling.niceMaximum;
        let height = ((this.props.height-this.props.bottomDimension.height)/((scaling.niceMaximum/scaling.tickSpacing)+1)); 
        height = height+((height-this.state.textHeight)/(scaling.niceMaximum/scaling.tickSpacing));
        for(var i = 0; i < scaling.niceMaximum/scaling.tickSpacing+1;i++){
            if(i === scaling.niceMaximum/scaling.tickSpacing){
                height = null
            }
            ySide.push(
                <View key={i} style={{
                    height: height,
                    paddingRight: 3,
                }}>
                    <Text onLayout={(event) => this.setState({textHeight: event.nativeEvent.layout.height})} on style={{fontSize: this.props.fontSize, backgroundColor: 'transparent'}}>{nextMax}</Text>
                </View>
            )
            nextMax = nextMax-scaling.tickSpacing
        }
        return (
            <View onLayout={(event) => this.props.YAxisWidthUpdate(event.nativeEvent.layout.width)}>
                {ySide}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    }
});