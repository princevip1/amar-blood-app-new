import React, { useContext, useEffect, useRef, useState } from 'react';
import { Center, Text, Input, Box, Image, Stack, useToast } from "native-base"
import Cbutton from '../../components/button/button';
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/authContext';
import CustomAxios, { saveToken } from '../../utils/customAxios';

const OtpInput = ({ route, navigation }) => {
    // get navigation params
    const toast = useToast();
    const { phone } = route.params;
    const { submitOtp, setUser } = useContext(AuthContext);
    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
    const [otpSent, setOtpSent] = useState(true);
    const otpBoxRef1 = useRef(null);
    const otpBoxRef2 = useRef(null);
    const otpBoxRef3 = useRef(null);
    const otpBoxRef4 = useRef(null);
    const [resendTimer, setResendTimer] = useState("");
    const [isLoading, setIsLoading] = useState(false);


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
            }, 200);
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

    const handleSubmitOtp = async () => {
        setIsLoading(true);
        if (!isValidOtp()) {
            alert("Please enter a valid OTP");
            return;
        }
        const otpValue = `${otp["1"]}${otp["2"]}${otp["3"]}${otp["4"]}`;

        try {
            const response = await submitOtp({
                otp: otpValue,
                phone
            })
            setIsLoading(false);
            if (!response.user.isCompleted) {
                toast.show({
                    title: "OTP verified successfully",
                    placement: 'bottom',
                    status: 'success',
                })
                navigation.navigate("Register", {
                    phone: phone
                });
                return
            }
            toast.show({
                title: "Login Successful",
                placement: 'bottom',
                status: 'success',
            })
            setUser(response.user);
            saveToken("access_token", response.token);
            navigation.navigate("Home");

        } catch (error) {
            setIsLoading(false)
            toast.show({
                title: error.response.data.message,
                placement: 'bottom',
                status: 'error',
            })
        }

    }

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

    const handleResendOtp = async () => {
        setOtpSent(true);
        setOtp({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
        otpBoxRef1.current?.focus();
        try {
            const result = await CustomAxios.post("/auth/resend-otp", {
                phone
            })
            console.log(result);
            toast.show({
                title: "OTP sent successfully",
                placement: 'bottom',
                status: 'success',
            })
            timerCountDown();
        } catch (error) {
            console.log(error);
            toast.show({
                title: "Something went wrong",
                placement: 'bottom',
                status: 'error',
            })
        }

    }


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
            <StatusBar hidden />
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
                        marginTop: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    > Enter OTP</Text>
                    <Text>
                        We have sent you an OTP to your mobile number
                    </Text>
                    <Text>
                        {phone}
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
                    onPress={() => {
                        handleSubmitOtp()
                    }}
                    style={{
                        backgroundColor: 'fff'
                    }}
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

export default OtpInput;