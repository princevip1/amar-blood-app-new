import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Button, Image } from 'native-base'
import { colors } from '../../theme/color'

const RequestConfirmetionMessage = ({ navigation }) => {

    const backToHome = () => {
        navigation.navigate('Home')
    }

    useEffect(() => {
        setTimeout(() => {
            backToHome()
        }, 3000);
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* animetion like  */}


            <Box
                style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    width: '80%',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
            >
                <Image
                    source={require('../../images/success.png')}
                    alt="Aang flying and surrounded by clouds"
                    width={100}
                    height={100}
                    resizeMode="contain"
                    style={{
                        marginBottom: 20,
                        marginTop: 20,
                    }}
                />
                <Text
                    style={{
                        fontSize: 20,
                        marginBottom: 10
                    }}
                >
                    Thank you !!
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginBottom: 10,
                        textAlign: 'center'
                    }}
                >
                    Your request has been successfully submitted.
                </Text>
                <Box
                    style={{
                        marginTop: 20,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                >
                    {/* <Button
                        // change on press color
                        onPress={() => navigation.navigate('Home')}
                    >
                        Back to Home
                    </Button> */}
                </Box>
            </Box>
        </View>
    )
}

export default RequestConfirmetionMessage

const styles = StyleSheet.create({})