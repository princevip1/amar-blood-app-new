import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Box, Input, KeyboardAvoidingView, ScrollView, Select, useToast } from 'native-base'
import { AuthContext } from '../../context/authContext';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from '../../components/date-picker/date-picker';
import Cbutton from '../../components/button/button';
import { Feather } from '@expo/vector-icons';
import CustomAxios, { saveToken } from '../../utils/customAxios';
import { API } from '../../utils/api';
import { colors } from '../../theme/color';
const EditProfile = ({ navigation }) => {
    const toast = useToast();
    const { getDistricts, getAreasByDistrictId, user, setUser } = React.useContext(AuthContext);
    const [name, setName] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [area, setArea] = React.useState("");
    const [occupation, setOccupation] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
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
    }
    const getAllAreasByDistrictId = async (districtId) => {
        try {
            const response = await getAreasByDistrictId(districtId);
            setAreas(response.data);
        } catch (error) {
            console.log(error.response.data.message);

        }
    }

    useEffect(() => {
        getAllDistricts()
    }, [])

    useEffect(() => {
        if (district) {
            getAllAreasByDistrictId(district)
        }
    }, [district])

    useEffect(() => {
        if (navigation.isFocused() && user) {
            setName(user.name);
            setOccupation(user.occupation);
            setDistrict(user.location.district._id);
            setArea(user.location.location._id);
            setDateOfBirth(new Date(user.dateOfBirth));
        }
    }, [user])

    const updateProfile = async () => {

        if (!name || !occupation || !district || !area || !dateOfBirth) {
            toast.show({
                title: "Please fill all the fields",
                placement: 'bottom',
                status: 'error',
            })
            return;
        }

        setIsLoading(true);
        try {
            const response = await CustomAxios.put(`${API.AUTH.PROFILE_ROUTE}/${user._id}`, {
                name,
                occupation,
                dateOfBirth,
                location: {
                    district,
                    location: area,
                }
            });
            setIsLoading(false);
            toast.show({
                title: "Profile updated successfully",
                placement: 'bottom',
                status: 'success',
            })
            setUser(response.data.user)
            saveToken("access_token", response.data.token);
            navigation.goBack();
        } catch (error) {
            setIsLoading(false);
            toast.show({
                title: "Something went wrong",
                placement: 'bottom',
                status: 'error',
            })
        }
    }



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                padding: 10,
            }}
        >
            <ScrollView>
                <KeyboardAvoidingView>

                    <Box
                        style={{
                            marginTop: 20,
                        }}
                    >
                        {/* <Box
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                backgroundColor: '#F9F9F9',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Pressable>
                                <Feather name="camera" size={24} color="black" />
                            </Pressable>
                        </Box> */}
                        <Box
                            style={{
                                alignSelf: 'center',
                            }}
                        >
                            <Avatar
                                bg={colors.white}
                                borderColor={colors.primary}
                                borderWidth={5}
                                size={150}
                                source={require('../../images/user-icon.png')}
                            // source={"../../images/user-icon.png"}
                            >
                                {/* <Avatar.Badge bg={colors.primary} size={10} /> */}
                            </Avatar>
                        </Box>
                    </Box>


                    <Box
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >Name *</Text>
                        <Input
                            style={{
                                fontSize: 16,
                                width: '100%',
                            }}
                            placeholder="Enter your name"
                            backgroundColor={"#fff"}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </Box>
                    <Box
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >Occupation *</Text>
                        <Select selectedValue={occupation} minWidth="200" accessibilityLabel="Choose Occupation" placeholder="Choose Occupation" _selectedItem={{
                            bg: "red.200",
                            endIcon: <Ionicons name="checkmark" size={20} color="black" />
                        }} mt={1} onValueChange={itemValue => setOccupation(itemValue)}
                            style={{
                                fontSize: 16,
                                width: '100%',
                            }}
                        >
                            <Select.Item label="Student" value="student" />
                            <Select.Item label="Service" value="service" />
                            <Select.Item label="Business" value="business" />
                            <Select.Item label="Other" value="other" />

                        </Select>
                    </Box>
                    <Box
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >Date of birth *</Text>
                        <DatePicker
                            date={dateOfBirth}
                            setDate={setDateOfBirth}
                            minimumDate={new Date(1950, 1, 1)}
                            maximumDate={new Date()}
                        />
                    </Box>
                    <Box
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >District *</Text>
                        <Select selectedValue={district} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Location" _selectedItem={{
                            bg: "red.200",
                            endIcon: <Ionicons name="checkmark" size={20} color="black" />
                        }} mt={1} onValueChange={itemValue => setDistrict(itemValue)}
                            style={{
                                fontSize: 16,
                                width: '100%',
                            }}
                        >
                            {districts.map((item, index) => {
                                return (
                                    <Select.Item label={`${item.name_en} (${item.name_bn})`} value={item._id} key={index}
                                    />
                                )
                            })}

                        </Select>
                    </Box>
                    <Box
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >Area *</Text>
                        <Select selectedValue={area} minWidth="200" accessibilityLabel="Choose Area" placeholder="Choose Area" _selectedItem={{
                            bg: "red.200",
                            endIcon: <Ionicons name="checkmark" size={20} color="black" />
                        }} mt={1} onValueChange={itemValue => setArea(itemValue)}
                            style={{
                                fontSize: 16,
                                width: '100%',
                            }}
                        >
                            {areas.length === 0 && <Select.Item label="Please select a district first" value="" />}
                            {areas.map((item, index) => {
                                return (
                                    <Select.Item label={`${item.name_en} (${item.name_bn})`} value={item._id} key={index}
                                    />
                                )
                            })}

                        </Select>
                    </Box>
                    <Box
                        style={{
                            width: '100%',
                            marginTop: 50,
                        }}
                    >
                        <Cbutton
                            isLoading={isLoading}
                            primary={true}
                            title="Save"
                            onPress={() => {
                                updateProfile()
                            }}
                            style={{
                                backgroundColor: 'fff'
                            }}
                        />

                    </Box>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({})