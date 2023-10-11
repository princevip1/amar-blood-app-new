import React from 'react';
import { Box, Image, Checkbox, useToast } from "native-base"
import Cbutton from '../../components/button/button';
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text } from 'react-native';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import { saveToken } from '../../utils/customAxios';


const PickBloodGroup = ({ route, navigation }) => {
    const toast = useToast();
    const { register, setUser } = React.useContext(AuthContext);
    const { data } = route.params;
    const [loading, setLoading] = React.useState(false)

    const [groups, setGroups] = React.useState([
        {
            label: "A",
            value: "a",
        },
        {
            label: "B",
            value: "b",
        },
        {
            label: "O",
            value: "o",
        },
        {
            label: "AB",
            value: "ab",
        }
    ]);
    const [selectedGroup, setSelectedGroup] = React.useState("b");
    const [rh, setRh] = React.useState("+");

    const handleFinish = async () => {
        if (selectedGroup === "") {
            toast.show({
                title: "Please select a blood group",
                placement: 'bottom',
                status: 'error',
            })
            return;
        }
        if (rh === "") {
            toast.show({
                title: "Please select a Rh",
                placement: 'bottom',
                status: 'error',
            })
            return;
        }

        const newData = {
            phone: data.phone,
            name: data.name,
            occupation: data.occupation,
            location: {
                district: data.district,
                location: data.area,
            },
            bloodGroup: selectedGroup.toUpperCase() + rh,
            dateOfBirth: data.dateOfBirth,
        }
        try {
            setLoading(true);
            const response = await register(newData);
            toast.show({
                title: "Registration Successful",
                placement: 'bottom',
                status: 'success',
            })
            setLoading(false);
            saveToken('access_token', response.token);
            setUser(response.user);
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            toast.show({
                title: error.response.data.message,
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
                flex: 1,
            }}
        >
            <StatusBar hidden />
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
                        Pick Your Blood Group
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
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    margin: 10
                }}
            >
                {groups.map((item, index) => (
                    <Pressable key={index} onPress={() => {
                        setSelectedGroup(item.value)
                    }}
                        style={{
                            width: '47%',
                            backgroundColor: selectedGroup === item.value ? colors.primary : '#F2F2F2',
                            borderRadius: 10,
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                color: selectedGroup === item.value ? colors.white : '#000',
                            }}
                        >
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                <Pressable
                    onPress={() => setRh('+')}
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: rh === '+' ? '#DE2551' : '#F2F2F2',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Octicons name="plus" size={24} color={rh === "+" ? colors.white : "#000"} />
                </Pressable>
                <Pressable
                    onPress={() => setRh('-')}
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: rh === '-' ? '#DE2551' : '#F2F2F2',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialCommunityIcons name="minus" size={24} color={rh === "-" ? colors.white : "#000"} />
                </Pressable>
            </Box>


            <Box
                style={{
                    width: '100%',
                    marginTop: 70,
                }}
            >
                <Checkbox shadow={2} value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
                    I want to receive notifications about blood donation campaigns
                </Checkbox>

            </Box>
            <Box
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Cbutton
                    isLoading={loading}
                    primary={true}
                    title="Finish"
                    onPress={() => handleFinish()}
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
        </Box >
    );
};

export default PickBloodGroup;