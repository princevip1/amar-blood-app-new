import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../theme/color";
import {
    Box,
    Input,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Select,
    TextArea,
    useToast,
} from "native-base";
import DatePicker from "../../components/date-picker/date-picker";
import { AuthContext } from "../../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import Cbutton from "../../components/button/button";
import { RequestContext } from "../../context/requrstContext";

const bloodGroups = [
    {
        id: 1,
        name: "A+",
    },
    {
        id: 2,
        name: "A-",
    },
    {
        id: 3,
        name: "B+",
    },
    {
        id: 4,
        name: "B-",
    },
    {
        id: 5,
        name: "O+",
    },
    {
        id: 6,
        name: "O-",
    },
    {
        id: 7,
        name: "AB+",
    },
    {
        id: 8,
        name: "AB-",
    },
];

const RequestScreen = ({ navigation }) => {
    const toast = useToast();
    const { getDistricts, getAreasByDistrictId } = React.useContext(AuthContext);
    const { createRequest } = React.useContext(RequestContext);
    const [district, setDistrict] = React.useState("");
    const [area, setArea] = React.useState("");
    const [selectedGroup, setSelectedGroup] = React.useState("B+");
    const [selectedQuantity, setSelectedQuantity] = React.useState(1);
    const [date, setDate] = React.useState(new Date());
    const [note, setNote] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [districts, setDistricts] = React.useState([]);
    const [areas, setAreas] = React.useState([]);

    const getAllDistricts = async () => {
        try {
            const response = await getDistricts();
            setDistricts(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const getAllAreasByDistrictId = async (districtId) => {
        try {
            const response = await getAreasByDistrictId(districtId);
            setAreas(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        getAllDistricts();
    }, []);

    useEffect(() => {
        if (district) {
            getAllAreasByDistrictId(district);
        }
    }, [district]);

    const submitRequest = async () => {
        if (
            !district ||
            !area ||
            !selectedGroup ||
            !selectedQuantity ||
            !date ||
            !note
        ) {
            toast.show({
                title: "Please fill all the fields",
                placement: "bottom",
                status: "error",
            });
            return;
        }
        const data = {
            bloodGroup: selectedGroup,
            quantity: selectedQuantity,
            district: district,
            location: area,
            date: date,
            note: note,
        };
        setIsLoading(true);
        try {
            const response = await createRequest(data);
            setIsLoading(false);
            navigation.navigate("RequestConfirmOtp", {
                requestId: response.data._id,
            });
        } catch (error) {
            setIsLoading(false);
            console.log(error.response.data.message);
            toast.show({
                title: error.response.data.message,
                placement: "bottom",
                status: "error",
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <ScrollView
                style={{
                    padding: 10,
                }}
            >
                <KeyboardAvoidingView>
                    <Box
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Select Blood Group *
                        </Text>
                        <Box
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                marginTop: 10,
                                justifyContent: "space-between",
                            }}
                        >
                            {bloodGroups.map((bloodGroup, index) => (
                                <Pressable
                                    onPress={() => setSelectedGroup(bloodGroup.name)}
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            selectedGroup === bloodGroup.name
                                                ? colors.primary
                                                : colors.white,
                                        marginRight: 10,
                                        width: "22%",
                                        height: 50,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        marginBottom: 12,
                                        borderColor:
                                            selectedGroup !== bloodGroup.name
                                                ? colors.primary
                                                : colors.background,
                                        borderWidth: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color:
                                                selectedGroup === bloodGroup.name
                                                    ? colors.white
                                                    : colors.primary,
                                        }}
                                    >
                                        {bloodGroup.name}
                                    </Text>
                                </Pressable>
                            ))}
                        </Box>
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Select Quantity (in bag) *
                        </Text>
                        <Box
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <Input
                                style={{
                                    fontSize: 16,
                                    width: "100%",
                                }}
                                placeholder="Enter quantity"
                                backgroundColor={"#fff"}
                                onChangeText={(text) => setSelectedQuantity(text)}
                                keyboardType="numeric"
                            />
                        </Box>
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 10,
                            }}
                        >
                            Select Date *
                        </Text>
                        <DatePicker date={date} setDate={setDate} />
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >
                            District *
                        </Text>
                        <Select
                            selectedValue={district}
                            minWidth="200"
                            accessibilityLabel="Choose Service"
                            placeholder="Choose Location"
                            _selectedItem={{
                                bg: "red.200",
                                endIcon: <Ionicons name="checkmark" size={20} color="black" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setDistrict(itemValue)}
                            style={{
                                fontSize: 16,
                                width: "100%",
                            }}
                        >
                            {districts.map((item, index) => {
                                return (
                                    <Select.Item
                                        label={`${item.name_en} (${item.name_bn})`}
                                        value={item._id}
                                        key={index}
                                    />
                                );
                            })}
                        </Select>
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >
                            Area *
                        </Text>
                        <Select
                            selectedValue={area}
                            minWidth="200"
                            accessibilityLabel="Choose Area"
                            placeholder="Choose Area"
                            _selectedItem={{
                                bg: "red.200",
                                endIcon: <Ionicons name="checkmark" size={20} color="black" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setArea(itemValue)}
                            style={{
                                fontSize: 16,
                                width: "100%",
                            }}
                        >
                            {areas.length === 0 && (
                                <Select.Item label="Please select a district first" value="" />
                            )}
                            {areas.map((item, index) => {
                                return (
                                    <Select.Item
                                        label={`${item.name_en} (${item.name_bn})`}
                                        value={item._id}
                                        key={index}
                                    />
                                );
                            })}
                        </Select>
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >
                            Note (Hospital) *
                        </Text>
                        <TextArea
                            h={20}
                            placeholder="Text Area Placeholder"
                            w="100%"
                            maxW="100%"
                            onChangeText={(text) => setNote(text)}
                            style={{
                                backgroundColor: colors.white,
                            }}
                        />
                    </Box>
                    <Box
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    >
                        <Cbutton
                            title="Next"
                            primary
                            onPress={() => {
                                submitRequest();
                            }}
                            isLoading={isLoading}
                        />
                    </Box>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default RequestScreen;

const styles = StyleSheet.create({});
