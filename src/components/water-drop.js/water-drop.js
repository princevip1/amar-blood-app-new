import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class WaterDrop extends Component {
    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);
        this.animation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.animValue, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(this.animValue, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
            ]),
        );
    }

    componentDidMount() {
        this.animation.start();
    }

    render() {
        const translateY = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10], // Adjust as needed for the bouncing effect
        });

        return (
            <View style={styles.container}>
                <Svg width={100} height={150} viewBox="0 0 100 150">
                    <Path
                        d="M50 0 C30 0 0 30 0 75 C0 120 30 150 50 150 C70 150 100 120 100 75 C100 30 70 0 50 0 Z"
                        fill="#00a2ff"
                        transform={`translate(0, ${translateY})`}
                    />
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WaterDrop;
