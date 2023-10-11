import React, { useContext } from "react";
import {
    Box,
    Button,
    Modal,
    ScrollView,
    Select,
    Skeleton,
    Text,
    VStack,
    useToast,
} from "native-base";
import Cbutton from "../../components/button/button";
import { RefreshControl, View } from "react-native";
import { useEffect } from "react";
import CustomAxios from "../../utils/customAxios";
import { API } from "../../utils/api";
import { colors } from "../../theme/color";
import moment from "moment";
import { AuthContext } from "../../context/authContext";

const Donate = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);
    const toast = useToast();
    const { requestId, notificationId } = route.params;
    const [request, setRequest] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

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
    const getDonationRequest = async () => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.get(
                `${API.REQUEST.REQUESTS_ROUTE}/${requestId}`
            );
            setRequest(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (notificationId) {
            readNotification();
        }
        getDonationRequest();
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.post(
                `${API.REQUEST.DONATIONS_ROUTE}`,
                {
                    requestId: requestId,
                }
            );
            setShowModal(false);
            navigation.navigate("DonateConfirmetionMessage");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.show({
                title: error.response.data.message,
                status: "error",
                position: "bottom",
            });
        }
    };

    return (
        <Box
            style={{
                flex: 1,
                backgroundColor: "#fff",
            }}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getDonationRequest}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
                style={{
                    padding: 10,
                    paddingTop: 20,
                }}
            >
                {isLoading ? (
                    <VStack
                        w="100%"
                        maxW="400"
                        borderWidth="1"
                        space={8}
                        overflow="hidden"
                        rounded="md"
                        _dark={{
                            borderColor: "coolGray.500",
                        }}
                        _light={{
                            borderColor: "coolGray.200",
                        }}
                    >
                        <Skeleton.Text px="4" />
                        <Skeleton.Text px="4" />
                        <Skeleton.Text px="4" />
                    </VStack>
                ) : (
                    <>
                        {request && (
                            <>
                                <Box
                                    style={{
                                        backgroundColor: colors.background,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        padding: 10,
                                        borderLeftWidth: 4,
                                        borderColor: colors.primary,
                                        marginBottom: 15,
                                    }}
                                >
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
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
                                            {moment(request?.createdAt).format("DD/MM/YYYY")}
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
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
                                            {request?.bloodGroup}
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
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
                                            {request?.status}
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            Location
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            {request.location?.name_en}
                                            {", "}
                                            {request.district?.name_en}
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            quantity
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            {request?.quantity} Bag
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            Donated Quantity
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            {request?.donatedQuantity} Bag
                                        </Text>
                                    </Box>
                                    <Box
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10,
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
                                            {request?.note}
                                        </Text>
                                    </Box>
                                </Box>
                                <View
                                    style={{
                                        padding: 10,
                                        marginBottom: 30,
                                    }}
                                >
                                    <Box
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {request !== null &&
                                            request?.donors.find(
                                                (donor) => donor?.user === user?._id
                                            ) ? (
                                            <Cbutton white={true} title="You already requested" />
                                        ) : request?.quantity == request?.donatedQuantity ? (
                                            <Cbutton white={true} title="Request Completed" />
                                        ) : (
                                            <Cbutton
                                                primary={true}
                                                title="Accept Request"
                                                onPress={() => setShowModal(true)}
                                            />
                                        )}
                                    </Box>
                                </View>
                                {/* confirm modal */}
                                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                    <Modal.Content maxWidth="100%">
                                        <Modal.Body>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    marginBottom: 10,
                                                    marginTop: 10,
                                                }}
                                            >
                                                Are you sure you want to donate? You can't undo this action
                                            </Text>
                                            {/* <Text>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero aliquam suscipit adipisci voluptas sapiente quisquam quia cumque enim! Voluptatem.
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero aliquam suscipit adipisci voluptas sapiente quisquam quia cumque enim! Voluptatem.
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero aliquam suscipit adipisci voluptas sapiente quisquam quia cumque enim! Voluptatem.
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero aliquam suscipit adipisci voluptas sapiente quisquam quia cumque enim! Voluptatem.
                                            </Text> */}
                                            <Box
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Cbutton
                                                    isLoading={isLoading}
                                                    white={true}
                                                    title="Cancel"
                                                    onPress={() => {
                                                        setShowModal(false);
                                                    }}
                                                />
                                                <Box
                                                    style={{
                                                        width: 10,
                                                    }}
                                                ></Box>
                                                <Cbutton
                                                    isLoading={isLoading}
                                                    primary={true}
                                                    title="Confirm"
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                />
                                            </Box>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </Box>
    );
};

export default Donate;
