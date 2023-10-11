import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../theme/color'
import { Avatar, Box, Image, Pressable } from 'native-base'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../../context/authContext'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import moment from 'moment'
import ageCalcualetor from '../../utils/ageCalculator'
import CustomAxios from '../../utils/customAxios'
import { API } from '../../utils/api'
const Profile = ({ navigation }) => {
    const { user } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const [totalRequest, setTotalRequest] = React.useState(0);
    const [totalDonate, setTotalDonate] = React.useState(0);


    const getHistories = async (query, type) => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.get(`${API.HISTORY.HISTORY_ROUTE}?${query}`);
            if (type === 'donate') {
                setTotalDonate(response.data.data.length || 0)
            }
            if (type === 'request') {
                setTotalRequest(response.data.data.length || 0)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    React.useEffect(() => {
        getHistories(`type=donate`, 'donate');
        getHistories(`type=request`, 'request');
    }, [])




    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <StatusBar hidden={false}
                style='light'
            />

            <Box
                style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 60,
                    backgroundColor: colors.primary,
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
            >
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color={colors.white} />
                </Pressable>
                <Text
                    style={{
                        fontSize: 20,
                        color: colors.white,
                    }}
                >Profile</Text>

                <Pressable
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <MaterialCommunityIcons name="account-edit-outline" size={24} color={colors.white} />
                    <Text
                        style={{
                            fontSize: 18,
                            color: colors.white,
                        }}
                    >
                        Edit
                    </Text>
                </Pressable>
            </Box>

            <Box
                style={{
                    backgroundColor: colors.primary,
                    height: 120,
                }}
            >

            </Box>

            <Box
                style={{
                    backgroundColor: colors.primary,
                    width: '100%',

                }}
            >
                <Image source={require('../../images/oval.png')}
                    alt="Aang flying and surrounded by clouds"
                    style={{
                        marginTop: 20,
                        width: "100%",
                        marginLeft: 0,
                    }}
                />

            </Box>
            <Box
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: -150,
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
                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 10,

                    }}
                >
                    {user.name}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 10,
                    }}
                >
                    Blood Group: {user.bloodGroup}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 10,
                    }}
                >
                    {ageCalcualetor(user.dateOfBirth)} years old
                </Text>

            </Box>

            <Box
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 30,
                }}
            >
                <Box
                    style={{}}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}

                    >
                        {isLoading ? <ActivityIndicator
                            size="small"
                            color={colors.primary}
                        />
                            : totalDonate || 0} {" "}
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >{!isLoading && totalDonate > 1 ? "Times" : "Time"}</Text>
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                        }}
                    >
                        Total Donations
                    </Text>
                </Box>
                <Box
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        height: 40,
                        borderWidth: 0.3,
                        borderColor: colors.primary,

                    }}
                />
                <Box
                    style={{}}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        {isLoading ? <ActivityIndicator
                            size="small"
                            color={colors.primary}
                        /> : totalRequest || 0} {" "}
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >{!isLoading && totalDonate > 1 ? "Times" : "Time"}</Text>
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                        }}
                    >
                        Total Requests
                    </Text>
                </Box>
            </Box>


            <Box
                style={{
                    width: '100%',
                    marginTop: 20,
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 10,
                        fontWeight: 'bold',
                    }}
                >
                    General Information
                </Text>
                <Box
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,

                    }}
                >
                    <Box
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons name="local-phone" size={20} color="black" />
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                            }}
                        >
                            Phone
                        </Text>
                    </Box>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {user.phone}
                    </Text>
                </Box>
                <Box
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,

                    }}
                >
                    <Box
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons name="location-on" size={20} color="black" />
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                            }}
                        >
                            Location
                        </Text>
                    </Box>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {user?.location?.district?.name_en}, {user?.location?.location?.name_en}
                    </Text>
                </Box>
                <Box
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,

                    }}
                >
                    <Box
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <AntDesign name="isv" size={20} color="black" />
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                            }}
                        >
                            Occupation
                        </Text>
                    </Box>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {user.occupation}
                    </Text>
                </Box>
                <Box
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,
                    }}
                >
                    <Box
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons name="date-range" size={20} color="black" />
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                            }}
                        >
                            Date of Birth
                        </Text>
                    </Box>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {moment(user.dateOfBirth).format('DD-MM-YYYY')}
                    </Text>
                </Box>
            </Box>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})