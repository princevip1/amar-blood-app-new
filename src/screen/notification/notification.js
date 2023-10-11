import { StatusBar } from 'expo-status-bar';
import { Box, FlatList, Image, Modal, Pressable, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import CustomAxios from '../../utils/customAxios';
import { API } from '../../utils/api';
import AgoTimeCount from '../../utils/timeAgo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { colors } from '../../theme/color';
import { AuthContext } from '../../context/authContext';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Notification = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const [selectItem, setSelectItem] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const getNotifications = async (query) => {
        setIsLoading(true);
        try {
            const response = await CustomAxios.get(`${API.NOTIFICATION.NOTIFICATIONS_ROUTE}?user=${query.user}`);
            setNotifications(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (isFocused) {
            getNotifications({
                user: user._id
            });
        }

    }, [isFocused])


    const onRefresh = React.useCallback(async () => {
        setIsLoading(true);
        await getNotifications({
            user: user._id
        });
        setIsLoading(false);
    }, [notifications]);

    const readNotification = async (notificationId) => {
        try {
            const response = await CustomAxios.put(
                `${API.NOTIFICATION.NOTIFICATIONS_ROUTE}/${notificationId}`,
                {
                    isRead: true,
                }
            );
            await getNotifications({
                user: user._id
            });
        } catch (error) {
            console.log(error);
            await getNotifications({
                user: user._id
            });
        }
    };

    const handleDelete = async (notificationId) => {
        setIsDeleteLoading(true);
        try {
            const response = await CustomAxios.delete(
                `${API.NOTIFICATION.NOTIFICATIONS_ROUTE}/${notificationId}`
            );
            setNotifications(notifications.filter((item) => item._id !== notificationId));
            setSelectItem(null);
            setIsDeleteLoading(false);
        } catch (error) {
            console.log(error);
            await getNotifications({
                user: user._id
            });
            setSelectItem(null);
            setIsDeleteLoading(false);
        }
    };


    return (

        <>
            <Box
                style={{
                    flex: 1,
                    padding: 10,
                    paddingTop: 10,
                    backgroundColor: '#fff',
                }}

            >
                <StatusBar hidden={false} />

                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary, colors.secondary]}
                            tintColor={colors.primary}
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                    scrollEnabled={true}
                    data={notifications}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={async () => {
                                if (selectItem?._id === item._id) {
                                    setSelectItem(null);
                                } else {
                                    if (item.requestId) {
                                        if (item.type === 'request') {
                                            navigation.navigate('Donate', {
                                                requestId: item.requestId,
                                                notificationId: item._id,
                                            });
                                        }
                                        if (item.type === 'donate') {
                                            if (item.isRead) {
                                                navigation.navigate('HistoryDetails', {
                                                    historyId: item.requestId,
                                                });
                                            } else {
                                                navigation.navigate('HistoryDetails', {
                                                    historyId: item.requestId,
                                                    notificationId: item._id,
                                                });
                                            }
                                        }
                                        if (item.type === "otp") {
                                            if (!item.isRead) {
                                                readNotification(item._id);
                                            }
                                        }
                                    }
                                }

                            }}
                            onLongPress={() => {
                                if (selectItem?._id === item._id) {
                                    setSelectItem(null);
                                } else {
                                    setSelectItem(item);
                                }

                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                                backgroundColor: item.isRead ? '#fff' : '#f5f5f5',
                                borderColor: colors.primary,
                                // borderWidth: selectItem?._id === item._id ? 1 : 0,
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Box
                                style={{
                                    width: '15%',
                                }}
                            >

                                <Box
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <Image source={require('../../images/red-logo.png')} alt="Aang flying and surrounded by clouds" width={30} height={30} resizeMode="contain" />
                                </Box>
                            </Box>
                            <Box
                                style={{
                                    width: '70%',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </Box>
                            {selectItem?._id === item._id ? (
                                <>
                                    {isDeleteLoading ? (
                                        <Box
                                            style={{
                                                width: '15%',
                                                backgroundColor: colors.primary,
                                                height: 60,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ActivityIndicator size="small" color={colors.white} />
                                        </Box>
                                    ) : (
                                        <Pressable
                                            onPress={
                                                () => {
                                                    handleDelete(item._id);
                                                }}
                                            style={{
                                                width: '15%',
                                                backgroundColor: colors.primary,
                                                height: 60,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                }}
                                            >
                                                <MaterialIcons name="delete-outline" size={24} color={colors.white} />
                                            </Text>
                                        </Pressable>
                                    )}

                                </>
                            ) : (
                                <Box
                                    style={{
                                        width: '15%',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 10,
                                        }}
                                    >
                                        {AgoTimeCount(item.createdAt)}

                                    </Text>
                                </Box>
                            )}


                        </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                        const [isLoading, setIsLoading] = useState(true);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 2000);
                        return (
                            <>
                                {isLoading ? (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 500,
                                        }}
                                    >
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </Box>
                                ) : (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 500,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                            }}
                                        >
                                            No Notifications
                                        </Text>
                                    </Box>
                                )}
                            </>
                        );
                    }}
                />
            </Box >
        </>
    );
};

export default Notification;