import React, { useEffect } from 'react';
import { Text, Input, Box, Select, Image, useToast } from "native-base"
import Cbutton from '../../components/button/button';
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import DatePicker from '../../components/date-picker/date-picker';

const Register = ({ route, navigation }) => {
    const { phone } = route.params;
    const toast = useToast();
    const [district, setDistrict] = React.useState("");
    const [area, setArea] = React.useState("");
    const [occupation, setOccupation] = React.useState("");
    const [name, setName] = React.useState("");
    const { getDistricts, getAreasByDistrictId } = React.useContext(AuthContext);
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


    return (
        <Box
            style={{
                backgroundColor: colors.white,
                padding: 10,
                flex: 1,
            }}
        >
            <StatusBar hidden={false} style='auto' />
            <Box
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 100,
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
                    >
                        Welcome to Amar Blood
                    </Text>
                    <Text
                        style={{
                        }}
                    >
                        (Human Blood Bank)
                    </Text>

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
                    title="Next"
                    onPress={() => {

                        if (!name || !occupation || !district || !area || !dateOfBirth) {
                            toast.show({
                                title: "Please fill all the fields",
                                placement: 'bottom',
                                status: 'error',
                            })
                            return;
                        }


                        navigation.navigate('PickBloodGroup', {
                            data: {
                                phone: phone,
                                name,
                                occupation,
                                district,
                                area,
                                dateOfBirth: dateOfBirth.toISOString(),
                            }
                        })
                    }}
                    style={{
                        backgroundColor: 'fff'
                    }}
                />

            </Box>
            <Box
                style={{
                    height: 100,
                    width: 100,
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

export default Register;