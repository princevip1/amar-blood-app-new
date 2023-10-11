import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Cbutton from '../../components/button/button';
import { Box, Button, Image, Text } from 'native-base'
import { colors } from '../../theme/color';


const WelcomeScreen = ({ navigation }) => {
    return (
        <Box
            style={{
                backgroundColor: colors.primary,
                padding: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
                display: 'flex',
                height: '100%'
            }}
        >
            <StatusBar hidden={false}
                style="light"
            />
            <Box
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../images/logo.png')}
                    alt="Aang flying and surrounded by clouds"
                    width={100}
                    height={100}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        fontSize: 20,
                        color: colors.white,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 30,
                        marginBottom: 60
                    }}
                >Welcome to Human Blood Bank</Text>
            </Box>
            <Box
                style={{
                    width: '100%',
                    marginBottom: 120
                }}
            >
                <Cbutton
                    white
                    title="Sign In"
                    onPress={() => navigation.navigate('PhoneNumber')}
                />
                <Box
                    style={{
                        height: 20
                    }}
                />

                <Cbutton
                    secondary
                    title="Sign Up"
                    onPress={() => navigation.navigate('PhoneNumber')}
                    style={{
                        backgroundColor: 'fff'
                    }}
                />
            </Box>
            <Text
                onPress={() => navigation.navigate('Terms')}
                style={{
                    fontSize: 14,
                    color: colors.white,
                    textDecorationLine: 'underline',
                }}
            >Terms and Conditions</Text>
            <Text
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={{
                    fontSize: 14,
                    color: colors.white,
                    marginBottom: 10,
                    marginTop: 5,
                    textDecorationLine: 'underline',
                }}
            >
                Privecy Policy
            </Text>
        </Box>
    );
};

export default WelcomeScreen;