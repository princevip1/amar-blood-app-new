import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Box, Image } from 'native-base';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { colors } from '../theme/color';
import { removeToken } from '../utils/customAxios';
import { AuthContext } from '../context/authContext';
const DrawerItemList = (props) => {
    const [active, setActive] = React.useState('Home');
    const { setUser } = React.useContext(AuthContext);
    // get active navigation route
    const getActiveRoute = (state) => {
        if (state.index === undefined) {
            return state.routeNames[state.routes.length - 1];
        }
        const route = state.routes[state.index];
        if (route.state) {
            return getActiveRoute(route.state);
        }
        return route.name;
    };

    useEffect(() => {
        setActive(getActiveRoute(props.state));
    }, [active]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
            }}
        >
            <Box
                style={{
                    width: '100%',
                    marginBottom: 20,
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../images/red-logo.png')}
                    alt="Aang flying and surrounded by clouds"
                    width={60}
                    height={60}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 10,
                    }}
                >
                    Amar Blood
                </Text>
                <Text>
                    (Human Blood Bank)
                </Text>
            </Box>
            {/* home  */}
            <Pressable
                onPress={() => {
                    props.navigation.navigate('HomeScreen')
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderColor: colors.primary,
                    // borderTopWidth: 0.2,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    backgroundColor: active === 'HomeScreen' ? '#f5cbd6' : colors.white,
                    borderRadius: 5,
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <Ionicons name="md-home-outline" size={18} color={colors.primary} />
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                        onPress={() => {
                            props.navigation.navigate('Home')
                        }}
                    >Home</Text>
                </Box>
                <MaterialIcons name="keyboard-arrow-right" size={18} color={colors.primary} />
            </Pressable>
            {/* history  */}
            <Pressable
                onPress={() => {
                    props.navigation.navigate('History')
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderColor: colors.primary,
                    // borderTopWidth: 0.2,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    marginBottom: 10,
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <MaterialCommunityIcons name="history" size={18} color={colors.primary} />
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >History</Text>
                </Box>
                <MaterialIcons name="keyboard-arrow-right" size={18} color={colors.primary} />
            </Pressable>
            {/* profile  */}
            <Pressable
                onPress={() => {
                    props.navigation.navigate('Profile')
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderColor: colors.primary,
                    // borderTopWidth: 0.2,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    marginBottom: 10,

                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <AntDesign name="profile" size={18} color={colors.primary} />
                    <Text
                        style={{
                            fontSize: 16,
                        }}

                    >Profile</Text>
                </Box>
                <MaterialIcons name="keyboard-arrow-right" size={18} color={colors.primary} />
            </Pressable>
            {/* settings  */}
            {/* <Pressable
                onPress={() => {
                    props.navigation.navigate('Welcome')
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderColor: colors.primary,
                    // borderTopWidth: 0.2,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    marginBottom: 10,

                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <Ionicons name="settings-outline" size={18} color={colors.primary} ƒ />
                    <Text
                        style={{
                            fontSize: 16,
                        }}

                    >Settings</Text>
                </Box>
                <MaterialIcons name="keyboard-arrow-right" size={18} color={colors.primary} />
            </Pressable> */}
            {/* logout  */}
            <Pressable
                onPress={() => {
                    removeToken('access_token')
                    setUser(null)
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'space-between',
                    marginBottom: 10,

                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <MaterialIcons name="logout" size={18} color={colors.primary} />
                    <Text
                        style={{
                            fontSize: 16,
                        }}

                    >Logout</Text>
                </Box>
                <MaterialIcons name="keyboard-arrow-right" size={18} color={colors.primary} />
            </Pressable>
        </View>
    );
}

export default DrawerItemList;