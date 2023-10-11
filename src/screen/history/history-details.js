import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Center, Input, Modal, ScrollView, Stack, useToast } from "native-base";
import { colors } from "../../theme/color";
import CustomAxios from "../../utils/customAxios";
import { API } from "../../utils/api";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import Cbutton from "../../components/button/button";

const HistoryDetails = ({ route, navigation }) => {
    const toast = useToast();
    const { user } = useContext(AuthContext);
    const { historyId, notificationId } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState({});
    const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [donarVarifyModal, setDonarVarifyModal] = useState(false);
    const [selectDonar, setSelectDonar] = useState({});

    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
    const otpBoxRef1 = useRef(null);
    const otpBoxRef2 = useRef(null);
    const otpBoxRef3 = useRef(null);
    const otpBoxRef4 = useRef(null);

    const getHistoryById = async () => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.get(
                `${API.HISTORY.HISTORY_ROUTE}/${historyId}`
            );
            setHistory(response.data.data);
            if (!response.data.data.isVerifiedOtp) {
                setIsVerifiedOtp(true);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.response.data.message);
        }
    };

    const readNotification = async () => {
        try {
            const response = await CustomAxios.put(
                `${API.NOTIFICATION.NOTIFICATIONS_ROUTE}/${notificationId}`,
                {
                    isRead: true,
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (historyId) {
            getHistoryById();
        }
        if (notificationId) {
            readNotification();
        }
    }, [historyId]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHistoryById();
        setRefreshing(false);
    });


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

    const handleVerifyOtp = async () => {
        if (!isValidOtp()) {
            alert("Please enter a valid OTP");
        }
        const otpValue = `${otp["1"]}${otp["2"]}${otp["3"]}${otp["4"]}`;
        try {
            const response = await CustomAxios.post(`${API.REQUEST.VERIFY_OTP_FOR_DONAR_VERIFICATION}`, {
                requestId: history._id,
                donorId: selectDonar.user._id,
                otp: otpValue
            });
            toast.show({
                title: response.data.message,
                placement: 'bottom',
                status: 'success',
            });
            setDonarVarifyModal(false);
            getHistoryById();

        } catch (error) {
            toast.show({
                title: error.response.data.message,
                placement: 'bottom',
                status: 'error',
            });
            console.log(error.response.data.message);

        }
    }


    const handleSendOtp = async (item) => {
        try {
            const response = await CustomAxios.post(`${API.REQUEST.SEND_OTP_FOR_DONAR_VERIFICATION}`, {
                requestId: history._id,
                donorId: item.user._id
            });
            toast.show({
                title: response.data.message,
                placement: 'bottom',
                status: 'success',
            });
            setDonarVarifyModal(true);
        } catch (error) {
            toast.show({
                title: error.response.data.message,
                placement: 'bottom',
                status: 'error',
            });
            console.log(error.response.data.message);
        }
    }


    return (
        <>
            {/* donar varify modal here */}
            <Modal isOpen={donarVarifyModal}
                // onClose={() => setDonarVarifyModal(false)}
                size={'md'}
            >
                <Modal.Content maxH="100%">
                    <Modal.Body>
                        <Box
                            style={{
                                alignItems: "center",
                                justifyContent: "center",

                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginTop: 10,
                                }}
                            >Title anything</Text>
                            <Text
                                style={{
                                    marginBottom: 10,
                                }}
                            >Are you sure you want to varify this donor?</Text>
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
                            <Cbutton
                                isLoading={isLoading}
                                primary={true}
                                title="Verify Otp"
                                onPress={() => handleVerifyOtp()}
                            />
                        </Box>
                    </Modal.Body>

                </Modal.Content>
            </Modal>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 10,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary, colors.secondary]}
                        tintColor={colors.primary}
                    />
                }
            >
                <>
                    <View
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            General Information
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Date
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {moment(history?.date).format("DD/MM/YYYY")}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        ></View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Blood Group
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history.bloodGroup}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                District
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history?.district?.name_en}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Area
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history?.location?.name_en}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Status
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history.status}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Quantity
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history.quantity} Bag
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#E5E5E5",
                                marginTop: 10,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Note
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {history.note}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Donors Information
                        </Text>
                        {history.user === user._id ? (
                            <>
                                {history?.donors &&
                                    history?.donors?.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: colors.primary,
                                                    borderRadius: 5,
                                                    marginTop: 15,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        padding: 10,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    borderRadius: 50,
                                                                    backgroundColor: colors.primary,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    marginRight: 10,
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontSize: 20,
                                                                        color: colors.white,
                                                                    }}
                                                                >
                                                                    {item.user.name.charAt(0)}
                                                                </Text>
                                                            </View>
                                                            <View>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    {item.user._id === user._id
                                                                        ? " (You)"
                                                                        : item.user.name}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                >
                                                                    Blood Group: {item.user.bloodGroup}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                >
                                                                    {history.user === user._id
                                                                        ? item.user.phone
                                                                        : item.user._id === user._id
                                                                            ? item.user.phone
                                                                            : "+8801*********"}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                >
                                                                    {moment(item.createdAt).format("DD/MM/YYYY")}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                >
                                                                    {history.location.name_en},{" "}
                                                                    {history.district.name_en}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                >
                                                                    Quantity: {item.quantity} Bag
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >{item.status} </Text>
                                                            {!item.isVerifiedOtp && (<Text
                                                                onPress={() => {
                                                                    handleSendOtp(item);
                                                                    setSelectDonar(item);
                                                                }}
                                                                style={{
                                                                    fontSize: 16,
                                                                    fontWeight: "bold",
                                                                    color: colors.primary,
                                                                    textAlign: "right",
                                                                    marginTop: 5,
                                                                }}
                                                            >Verify</Text>)}

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </>
                        ) : (
                            <>
                                {history?.donors &&
                                    history?.donors?.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: colors.primary,
                                                    borderRadius: 5,
                                                    marginTop: 15,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        padding: 10,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 50,
                                                                backgroundColor: colors.primary,
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                marginRight: 10,
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: 20,
                                                                    color: colors.white,
                                                                }}
                                                            >
                                                                {item.user.name.charAt(0)}
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                {item.user._id === user._id
                                                                    ? " (You)"
                                                                    : item.user.name}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                Blood Group: {item.user.bloodGroup}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                {history.user === user._id
                                                                    ? item.user.phone
                                                                    : item.user._id === user._id
                                                                        ? item.user.phone
                                                                        : "+8801*********"}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                {moment(item.createdAt).format("DD/MM/YYYY")}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                {history.location.name_en},{" "}
                                                                {history.district.name_en}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                Quantity: {item.quantity} Bag
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </>)}
                    </View>
                </>
            </ScrollView>
            {isVerifiedOtp && (
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        padding: 10,
                    }}
                >
                    <Cbutton
                        primary={true}
                        title="Verify Otp"
                        onPress={() =>
                            navigation.navigate("RequestConfirmOtp", {
                                requestId: history._id,
                            })
                        }
                        style={{
                            backgroundColor: "fff",
                        }}
                    />
                </View>
            )}
        </>
    );
};

export default HistoryDetails;

const styles = StyleSheet.create({});
