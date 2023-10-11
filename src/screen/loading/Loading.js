import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Spinner } from 'native-base'
import { colors } from '../../theme/color'

const LoadingScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spinner size="sm" />
            <Text
                style={{
                    color: colors.primary,
                    marginTop: 10,
                    fontSize: 16,
                }}
            >Loading</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({})