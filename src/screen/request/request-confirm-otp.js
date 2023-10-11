import React, { useContext, useEffect, useRef, useState } from 'react';
import { Center, Text, Input, Box, Image, Stack, useToast } from "native-base"
import Cbutton from '../../components/button/button';
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/authContext';
import { Ionicons } from '@expo/vector-icons';
import { RequestContext } from '../../context/requrstContext';
const RequestConfirmOtp = ({ route, navigation }) => {
    const { sendOtpRequestForRequestConfirm, checkRequestDetailsOtp } = useContext(RequestContext);
    // get navigation params
    const toast = useToast();
    const { requestId } = route.params;
    const { user } = useContext(AuthContext);
    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
    const [otpSent, setOtpSent] = useState(true);
    const otpBoxRef1 = useRef(null);
    const otpBoxRef2 = useRef(null);
    const otpBoxRef3 = useRef(null);
    const otpBoxRef4 = useRef(null);
    const [resendTimer, setResendTimer] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const timerCountDown = () => {
        let countDownDate = new Date().getTime() + 300000;
        // Update the count down every 1 second
        let x = setInterval(function () {
            // Get today's date and time
            let now = new Date().getTime();
            // Find the distance between now and the count down date
            let distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setResendTimer(`${minutes}m ${seconds}s`);
            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                setResendTimer("0m 0s");
            }
        }, 1000);
    }

    useEffect(() => {
        timerCountDown();
    }, []);


    const isValidOtp = () => {
        if (
            otp["1"] !== "" &&
            otp["2"] !== "" &&
            otp["3"] !== "" &&
            otp["4"] !== ""
        ) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {

        if (otpSent) {
            setTimeout(() => {
                if (otpBoxRef2.current !== null) {
                    otpBoxRef1.current?.focus();
                }
            }, 500);
        }
    }, [otpSent]);

    const updateOtp = (name, value) => {
        setOtp((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptChange = ({ value, name }) => {
        if (value !== "") {
            if (name === "1") {
                otpBoxRef2.current?.focus();
            } else if (name === "2") {
                otpBoxRef3.current?.focus();
            } else if (name === "3") {
                otpBoxRef4.current?.focus();
            } else if (name === "4") {
                otpBoxRef4.current?.blur();
            }
        }
        updateOtp(name, value);
    };

    const handleCheckOtp = async () => {
        if (!isValidOtp()) {
            toast.show({
                title: "Please enter valid OTP",
                placement: 'bottom',
                status: 'error',
            });
        }
        const otpValue = `${otp["1"]}${otp["2"]}${otp["3"]}${otp["4"]}`;
        setIsLoading(true);
        try {
            const response = await checkRequestDetailsOtp({ otp: otpValue, requestId: requestId });
            setIsLoading(false);
            navigation.navigate("RequestConfirmetionMessage");
        } catch (error) {
            toast.show({
                title: error.response.data.message,
                placement: 'bottom',
                status: 'error',
            }); 1
            console.log(error.response.data.message);
            setIsLoading(false);
        }
    }

    const handleResendOtp = () => {
        setOtpSent(true);
        setOtp({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
        otpBoxRef1.current?.focus();
        timerCountDown();
    }


    const sendOtpRequest = async () => {
        try {
            const response = await sendOtpRequestForRequestConfirm(requestId);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }


    useEffect(() => {
        sendOtpRequest();
    }, [1])



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
                    position: 'absolute',
                    top: 70,
                    left: 20,

                }}
            >
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back-outline" size={24} color={colors.primary} />
            </Box>


            <Box
                style={{
                    // postion center 
                    position: 'absolute',
                    top: "25%",
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
                        marginTop: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginBottom: 10
                        }}
                    >
                        Request Confirmetion OTP
                    </Text>
                    <Text>
                        We have sent you an OTP to your mobile number
                    </Text>
                    <Text>
                        {user.phone}
                    </Text>
                </Box>
                <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                    {[otpBoxRef1, otpBoxRef2, otpBoxRef3, otpBoxRef4].map((item, index) => {
                        const number = index + 1;
                        return (
                            <Box
                                key={index}
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                <Center size="12">
                                    <Input
                                        onChange={(e) => handleOptChange({ value: e.nativeEvent.text, name: number.toString() })}
                                        value={otp[number.toString()]}
                                        isFullWidth={false}
                                        size="lg"
                                        style={{
                                            fontSize: 20,
                                            textAlign: 'center',
                                        }}
                                        placeholder="#"
                                        keyboardType="numeric"
                                        backgroundColor={"#fff"}
                                        isFocused={otp[number.toString()] !== "" ? true : false}
                                        ref={item}
                                        maxLength={1}
                                    />

                                </Center>

                            </Box>
                        )
                    })}
                </Stack>

                <Box
                    style={{
                        width: '100%',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Didn't receive the OTP?
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Please wait for {resendTimer} min before requesting a new one
                    </Text>
                    {resendTimer === "0m 0s" && (
                        <Text
                            onPress={() => handleResendOtp()}
                            style={{
                                color: colors.primary,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Resend OTP
                        </Text>
                    )}
                </Box>

            </Box>
            <Box
                style={{
                    width: '100%',
                    marginBottom: 50
                }}
            >
                <Cbutton
                    isLoading={isLoading}
                    primary={true}
                    title=" Verify OTP"
                    onPress={() => handleCheckOtp()}
                    style={{
                        backgroundColor: 'fff'
                    }}
                />

            </Box>

        </Box>
    );
};

export default RequestConfirmOtp;