import React, { useEffect } from 'react';
import { Center, Text, Input, Box, Image, useToast } from "native-base"
import Cbutton from '../../components/button/button';
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/authContext';

const PhoneNumber = ({ navigation }) => {
    const toast = useToast();
    const [number, setNumber] = React.useState('');
    const { getOtp } = React.useContext(AuthContext);
    const [backSpace, setBackSpace] = React.useState(false);
    const [error, setError] = React.useState(false);
    const startWithNumbers = [13, 14, 15, 16, 17, 18, 19]
    const [loading, setLoading] = React.useState(false);

    const handleSendOtp = async () => {
        if (!number) {
            toast.show({
                title: "Please enter a number",
                placement: 'bottom',
                status: 'error',
            })
            return;
        }
        if (number.length !== 11) {
            toast.show({
                title: "Please enter a valid number",
                placement: 'bottom',
                status: 'error',
            })
            return;
        }


        const modifiedNumber = `880${number.replace("-", "")}`
        setLoading(true);
        try {
            const response = await getOtp({
                phone: modifiedNumber
            });
            setLoading(false);
            navigation.navigate('OtpInput', {
                phone: modifiedNumber
            });
        } catch (error) {
            setLoading(false);
            toast.show({
                title: "Something went wrong",
                placement: 'bottom',
                status: 'error',
            })
        }
    }

    const formatNumber = (number) => {
        if (number.length === 4) {
            setNumber(number + "-");
        }
    }

    const handleBackspace = (e) => {
        if (e.nativeEvent.key === "Backspace") {
            if (number.length === 5) {
                setBackSpace(true);
                setNumber(number.slice(0, -1));
            }
        }
    }

    useEffect(() => {
        if (backSpace) {
            setBackSpace(false);
            return;
        }
        formatNumber(number);
    }, [number])


    useEffect(() => {
        if (number.length === 2) {
            // check number start with 13,14,15,16,17,18,19
            if (startWithNumbers.includes(parseInt(number.slice(0, 2)))) {
                setError(false);
            }
            else {
                setError(true);
            }
        }
    }, [number])

    return (
        <Box
            style={{
                backgroundColor: colors.white,
                padding: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
                display: 'flex',
                height: '100%'
            }}
        >
            <StatusBar hidden={false} />

            <Box
                style={{
                    // postion center 
                    position: 'absolute',
                    top: "35%",
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../images/red-logo.png')}
                    alt="Aang flying and surrounded by clouds"
                    width={100}
                    height={100}
                    resizeMode="contain"
                />
                <Box
                    style={{
                        width: '100%',
                        marginBottom: 20,
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >Phone number</Text>
                    <Text
                        style={{
                            fontSize: 14,
                        }}
                    >Please input your valid mobile Number</Text>
                </Box>

                <Input
                    InputLeftElement={<Text
                        style={{
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop: 5,
                        }}
                    >+880 <Text
                        style={{
                            fontSize: 20,
                            marginLeft: 10,
                            color: colors.primary,
                        }}
                    >|</Text></Text>}
                    style={{
                        fontSize: 20,
                        width: '100%',
                    }}
                    placeholder="1xxx-xxxxxx"
                    keyboardType="numeric"
                    backgroundColor={"#fff"}
                    value={number}
                    maxLength={11}
                    onChangeText={setNumber}
                    onKeyPress={(e) => {
                        handleBackspace(e);
                    }
                    }
                />
                <Text
                    style={{
                        color: colors.primary,
                        marginTop: 5,
                        alignSelf: 'flex-start',
                    }}
                >
                    {error ? "Please enter a valid number" : ""}
                </Text>
            </Box>

            <Box
                style={{
                    width: '100%',
                    marginBottom: 50
                }}
            >
                <Cbutton
                    primary={true}
                    title="Get OTP"
                    onPress={() => handleSendOtp()}
                    style={{
                        backgroundColor: 'fff'
                    }}
                    isLoading={loading}
                />

            </Box>
            <Box
                style={{
                    height: 150,
                    width: 150,
                    backgroundColor: '#DE2551',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderBottomRightRadius: 150,
                }}
            ></Box>
        </Box>
    );
};

export default PhoneNumber;