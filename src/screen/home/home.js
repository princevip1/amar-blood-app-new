import React, { useEffect } from 'react';
import { Badge, Box, Button, Image, ScrollView, Stack, VStack } from "native-base"
import { colors } from '../../theme/color';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Pressable, RefreshControl } from 'react-native';
import { AuthContext } from '../../context/authContext';
import registerForPushNotificationsAsync from '../../utils/getExpoPushToken';
import CustomAxios from '../../utils/customAxios';
import { API } from '../../utils/api';
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
const HomeScreen = ({ navigation }) => {
    const { updatePushToken } = React.useContext(AuthContext);
    const [homeData, setHomeData] = React.useState(null);
    const [isHomeDataLoading, setIsHomeDataLoading] = React.useState(false);
    const isFocused = useIsFocused();
    const [stockByUserLocation, setStockByUserLocation] = React.useState([
        {
            bloodGroup: "A+",
            count: 0,
        }, {
            bloodGroup: "A-",
            count: 0,
        }, {
            bloodGroup: "B+",
            count: 0,
        }, {
            bloodGroup: "B-",
            count: 0,
        }, {
            bloodGroup: "AB+",
            count: 0,
        }, {
            bloodGroup: "AB-",
            count: 0,
        }, {
            bloodGroup: "O+",
            count: 0,
        }, {
            bloodGroup: "O-",
            count: 0,
        }
    ]);


    useEffect(() => {
        if (homeData) {
            const tempStockByUserLocation = [...stockByUserLocation];
            homeData.stockByUserLocation.map((item, index) => {
                const findIndex = tempStockByUserLocation.findIndex((stock) => stock.bloodGroup === item.bloodGroup);
                if (findIndex !== -1) {
                    tempStockByUserLocation[findIndex].count = item.count;
                }
            })
            setStockByUserLocation(tempStockByUserLocation);
        }
    }, [homeData])




    const getHomeData = async () => {
        setIsHomeDataLoading(true);
        try {
            const response = await CustomAxios.get(API.HOME.HOME_ROUTE);
            setHomeData(response.data.data);
            setIsHomeDataLoading(false);
        } catch (error) {
            setIsHomeDataLoading(false);
            console.error(error.response.data)
        }
    }




    const UpdateTokenForNotify = async (token) => {
        try {
            await registerForPushNotificationsAsync().then(async token => {
                const response = await updatePushToken({
                    pushToken: token
                });
            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (isFocused) {
            UpdateTokenForNotify();
            getHomeData();
        }

    }, [isFocused, navigation])

    return (
        <Box
            style={{
                backgroundColor: colors.white,
                flex: 1,
            }}

        >
            <StatusBar hidden={false} />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isHomeDataLoading}
                        onRefresh={() => getHomeData()}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 30,
                        padding: 20,
                    }}
                >
                    <Pressable
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="menu" size={24} color="black" />
                    </Pressable>
                    <Text
                        style={{
                            fontSize: 20,
                        }}
                    >Dashboard</Text>
                    {homeData && homeData.unReadNotification.length > 0 ? (
                        <VStack>
                            <Badge
                                colorScheme="danger"
                                rounded="full"
                                mb={-4}
                                mr={-4}
                                size={1}
                                zIndex={1}
                                variant="solid"
                                alignSelf="flex-end" _text={{
                                    fontSize: 10
                                }}>
                                {homeData.unReadNotification.length}
                            </Badge>
                            <Pressable
                                onPress={() => navigation.navigate('Notification')}
                            >
                                <Feather name="bell" size={24} color="black" />

                            </Pressable>
                        </VStack>
                    ) : (
                        <Pressable
                            onPress={() => navigation.navigate('Notification')}
                        >
                            <Feather name="bell" size={24} color="black" />

                        </Pressable>
                    )}



                </Box>


                <Box
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: colors.primary,
                        }}
                    >
                        Welcome to our Human blood bank
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                        }}>
                        Peoples near your location
                    </Text>
                </Box>

                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        margin: 20,
                    }}
                >
                    {/* <Image
                        source={require('../../images/waterdrop.png')}
                        alt="Alternate Text"
                        style={{
                            height: 200,
                        }}
                        resizeMode="contain"
                    /> */}

                    {stockByUserLocation.map((item, index) => (
                        <Box
                            key={index}
                            style={{
                                backgroundColor: colors.background,
                                width: "48%",
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                                marginBottom: 12,
                                // borderColor: colors.primary,
                                // borderWidth: 1,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.primary
                                }}
                            >
                                {item.bloodGroup}
                            </Text>
                            <Text>{item.count} {item.count > 1 ? "Donors" : "Donor"}</Text>

                        </Box>
                    ))}

                </Box>

                <Stack direction="row" mb="2.5" mt="1.5" space={5}
                    justifyContent={'space-between'}
                    style={{
                        margin: 20,
                    }}
                >

                    <Box
                        onPress={() => navigation.navigate('Donate')}
                        shadow={5}
                        style={{
                            height: 130,
                            width: "46%",
                            backgroundColor: '#F9F9F9',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,

                        }}
                    >
                        <Pressable
                            onPress={() => navigation.navigate('PendingRequest')}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <MaterialCommunityIcons name="blood-bag" size={44} color={colors.primary} />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.primary,
                                    marginTop: 10,
                                }}
                            >Donate Now</Text>
                        </Pressable>

                    </Box>
                    <Box
                        shadow={5}
                        style={{
                            height: 130,
                            width: "46%",
                            backgroundColor: '#F9F9F9',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}
                    >
                        <Pressable
                            onPress={() => navigation.navigate('RequestScreen')}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <MaterialCommunityIcons name="blood-bag" size={44} color={colors.primary} />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.primary,
                                    marginTop: 10,
                                }}
                            >Request Now</Text>
                        </Pressable>
                    </Box>
                </Stack>

                <Box
                    style={{
                        marginTop: 20,
                    }}
                >
                    {homeData &&
                        moment(homeData.processingRequest.date).isAfter(moment().subtract(1, 'days'))
                        && homeData.processingRequest.length > 0 ? (
                        <>
                            {homeData.processingRequest.map((item, index) => (
                                <Pressable
                                    onPress={() => navigation.navigate('HistoryDetails', {
                                        historyId: item._id
                                    })}
                                    key={index}
                                    style={{
                                        margin: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: '#F9F9F9',
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                    }}
                                >
                                    <Box
                                        style={{
                                            width: '80%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Pending Donor's Verification
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                // color: colors.primary,
                                            }}
                                        >
                                            Please Verify your Blood Donor's by Otp
                                            and collect blood from them.
                                        </Text>

                                    </Box>
                                    <Box
                                        style={{
                                            width: '20%',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <MaterialIcons name="arrow-forward-ios" size={18} color={colors.primary} />
                                    </Box>
                                </Pressable>
                            ))}
                        </>
                    ) : null}

                </Box>


            </ScrollView>

            <Box
                style={{
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        color: colors.primary,
                    }}
                >Develop by</Text>
                <Image
                    source={require('../../images/viper-logo.png')}
                    alt="Alternate Text"
                    style={{
                        width: 100,
                        height: 20,
                    }}
                    resizeMode="contain"
                />
            </Box>

            <Box
                style={{
                    height: 120,
                    width: 120,
                    backgroundColor: '#F9F9F9',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderBottomRightRadius: 150,
                    zIndex: -1,
                }}
            ></Box>
        </Box>

    );
};

export default HomeScreen;