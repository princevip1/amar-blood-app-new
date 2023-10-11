import { ActivityIndicator, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box, FlatList } from 'native-base'
import { colors } from '../../theme/color'
import moment from 'moment'
import { RequestContext } from '../../context/requrstContext'

const PendingRequest = ({ navigation }) => {
    const { getDonateRequest } = useContext(RequestContext)
    const [pendingRequest, setPendingRequest] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const getPendingRequest = async () => {
        setIsLoading(true);
        try {
            const response = await getDonateRequest();
            setPendingRequest(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getPendingRequest();
    }, [])


    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                backgroundColor: colors.background
            }}
        >
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getPendingRequest}
                        colors={[colors.primary, colors.secondary]}
                        tintColor={colors.primary}
                    />
                }
                data={pendingRequest}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Donate', {
                                requestId: item._id,
                            });
                        }}
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
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
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
                                {moment(item?.createdAt).format('DD/MM/YYYY')}
                            </Text>
                        </Box>
                        <Box
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
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
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
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
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
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
                                {item?.location?.name_en}
                                {", "}
                                {item?.district?.name_en}
                            </Text>
                        </Box>
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
                                        No Pending Request
                                    </Text>
                                </Box>
                            )}
                        </>
                    );
                }}

            />
        </View>
    )
}

export default PendingRequest

const styles = StyleSheet.create({})