import { Box, FlatList, Modal, ScrollView, Text, View } from "native-base";
import React from "react";
import { colors } from "../../theme/color";
import { Pressable, RefreshControl } from "react-native";
import CustomAxios from "../../utils/customAxios";
import { API } from "../../utils/api";
import moment from "moment";
import LoadingScreen from "../loading/Loading";

const History = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [actionModal, setActionModal] = React.useState(false);
    const [selectData, setSelectData] = React.useState("request");
    const [isLoading, setIsLoading] = React.useState(false);
    const [histories, setHistories] = React.useState([]);

    const getHistories = async (query) => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.get(
                `${API.HISTORY.HISTORY_ROUTE}?${query}`
            );
            setHistories(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    React.useEffect(() => {
        getHistories(`type=${selectData}`);
    }, [selectData]);

    const onRefresh = React.useCallback(async () => {
        setIsLoading(true);
        await getHistories(`type=${selectData}`);
        setIsLoading(false);
    }, [selectData]);

    const handleDeleteRequest = async () => {
        try {
            const response = await CustomAxios.delete(
                `${API.REQUEST.REQUESTS_ROUTE}/${selectedItem._id}`
            );
            setActionModal(false);
            setSelectedItem(null);
            setActionModal(false);
            await getHistories(`type=${selectData}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                // backgroundColor: 'white',
                flex: 1,
            }}
        >
            {/* action modal start */}
            <Modal
                isOpen={actionModal}
                onClose={() => {
                    setSelectedItem(null);
                    setActionModal(false);
                }}
                size={"md"}
            >
                <Modal.Content>
                    <Modal.Body>
                        <Pressable
                            onPress={handleDeleteRequest}
                        >
                            <Text>Delete Request</Text>
                        </Pressable>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            {/* action modal end */}
            <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                }}
            >
                <Pressable
                    onPress={() => setSelectData("request")}
                    style={{
                        width: "50%",
                        alignItems: "center",
                        padding: 10,
                        borderWidth: 1,
                        borderRightWidth: 0.5,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        backgroundColor:
                            selectData === "request" ? colors.primary : colors.white,
                        borderColor: colors.primary,
                    }}
                >
                    <Text
                        style={{
                            color: selectData === "request" ? colors.white : colors.primary,
                            fontSize: 16,
                        }}
                    >
                        Requests
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => setSelectData("donate")}
                    style={{
                        width: "50%",
                        alignItems: "center",
                        padding: 10,
                        borderWidth: 1,
                        borderLeftWidth: 0.5,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor:
                            selectData === "donate" ? colors.primary : colors.white,
                        borderColor: colors.primary,
                    }}
                >
                    <Text
                        style={{
                            color: selectData === "donate" ? colors.white : colors.primary,
                            fontSize: 16,
                        }}
                    >
                        Donates
                    </Text>
                </Pressable>
            </Box>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        colors={[colors.primary, colors.secondary]}
                        tintColor={colors.primary}
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Box
                    style={{
                        padding: 10,
                    }}
                >
                    <FlatList
                        scrollEnabled={false}
                        data={histories}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable
                                    onLongPress={() => {
                                        if (
                                            selectData === "request" &&
                                            !item.isVerifiedOtp &&
                                            new Date(item.date) < new Date()
                                        ) {
                                            setActionModal(true);
                                            setSelectedItem(item);
                                        }
                                    }}
                                    onPress={() =>
                                        navigation.navigate("HistoryDetails", {
                                            historyId: item._id,
                                        })
                                    }
                                    key={index}
                                    style={{
                                        backgroundColor: colors.white,
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
                                            {moment(item.date).format("DD/MM/YYYY")}
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
                                            {item.bloodGroup}
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
                                            {item.status}
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
                                            {item.location.name_en}
                                            {", "}
                                            {item.district.name_en}
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
                                            Quantity
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            {item.quantity} Bag
                                        </Text>
                                    </Box>
                                </Pressable>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {
                            const [isLoading, setIsLoading] = React.useState(true);
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 1000);
                            return (
                                <>
                                    {isLoading ? (
                                        <Box
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: 500,
                                            }}
                                        >
                                            <LoadingScreen />
                                        </Box>
                                    ) : (
                                        <Box
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: 300,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                }}
                                            >
                                                No History
                                            </Text>
                                        </Box>
                                    )}
                                </>
                            );
                        }}
                    />
                </Box>
            </ScrollView>
        </View>
    );
};

export default History;
