import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View
} from 'react-native';

export default class XAxis extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }

    setTextWidth(width,index){
        if(index === this.props.dataSource.length-1){
            this.setState({textWidth: width})
            this.props.XAxisTextWidthUpdate(width);
        }
    }
    
    render() {
        let maxWidth = this.props.width-this.props.YAxisWidth;
        let pointWidth = maxWidth/this.props.dataSource.length;
        pointWidth = pointWidth + (pointWidth-this.state.textWidth)/(this.props.dataSource.length-1)
        var xSide = this.props.dataSource.map((b,i)=>{
            if(i === this.props.dataSource.length-1){
                pointWidth = this.state.width
                if(this.props.dataSource.length === 1){
                    pointWidth = maxWidth
                }
            }
            return(
                <View key={i} style={{width: pointWidth, alignItems: 'flex-start'}}>
                    <Text 
                        style={{fontSize: this.props.fontSize,backgroundColor: 'transparent'}}
                        onLayout={(event) => this.setTextWidth(event.nativeEvent.layout.width,i)}
                    >{b.x}</Text>
                </View>
            )
        })
        return (
            <View style={[styles.container,{width: this.props.width-this.props.YAxisWidth}]}>
                {xSide}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'flex-end'
    }
});