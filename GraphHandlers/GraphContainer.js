import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View
} from 'react-native';
import Area from './Area';
import YAxis from './YAxis';
import XAxis from './XAxis';

export default class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bottomDimension: 0,
            YAxisWidth: 0,
            XAxisTextWidth: 0
        };
    }

    YAxisWidthUpdate(width){
        this.setState({YAxisWidth: width})
    }

    XAxisTextWidthUpdate(width){
        this.setState({XAxisTextWidth: width})
    }    

    render() {
        return (
            <View style={[styles.container,{
                width: this.props.width, 
                height: this.props.height,
            }]}>
                <View style={[styles.topPart,{

                }]}>
                    <View style={styles.sideLeft}>
                        <YAxis
                            YAxisWidthUpdate={this.YAxisWidthUpdate.bind(this)}
                            dataSource={this.props.dataSource}
                            height={this.props.height}
                            fontSize={this.props.fontSizeY}
                            bottomDimension={this.state.bottomDimension}
                        />
                    </View>
                    <Area 
                        pointColor={this.props.pointColor}
                        lineWidth={this.props.lineWidth}
                        lineColor={this.props.lineColor}
                        pointSize={this.props.pointSize}
                        XAxisTextWidth={this.state.XAxisTextWidth}
                        dataSource={this.props.dataSource}
                        backgroundColor={this.props.backgroundColor}
                        borderColor={this.props.borderColor}
                    />
                </View>
                <View style={styles.bottomPart} onLayout={(event) => this.setState({bottomDimension: event.nativeEvent.layout})}>
                    <XAxis
                        XAxisTextWidthUpdate={this.XAxisTextWidthUpdate.bind(this)}
                        dataSource={this.props.dataSource}
                        width={this.props.width}
                        fontSize={this.props.fontSizeX}
                        YAxisWidth={this.state.YAxisWidth}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    topPart: {
        flexDirection: "row"
    },
    sideLeft: {

    },
    bottomPart: {
        alignItems: "flex-end"
    }
});