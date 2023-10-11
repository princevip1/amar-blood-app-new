import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import HomeScreen from '../screen/home/home';
import WelcomeScreen from '../screen/welcome/welcome';
import PhoneNumber from '../screen/auth/phoneNumber';
import OtpInput from '../screen/auth/otp-input';
import Register from '../screen/auth/register';
import DrawerItemList from './DrawerItemList';
import PickBloodGroup from '../screen/auth/pick-blood-group';
import Notification from '../screen/notification/notification';
import Donate from '../screen/donate/donate';
import History from '../screen/history/history';
import Terms from '../screen/terms/Terms';
import { AuthContext } from '../context/authContext';
import LoadingScreen from '../screen/loading/Loading';
import { removeToken } from '../utils/customAxios';
import Profile from '../screen/profile/profile';
import RequestScreen from '../screen/request/request';
import RequestConfirmOtp from '../screen/request/request-confirm-otp';
import RequestConfirmetionMessage from '../screen/request/request.confirmetion-message';
import HistoryDetails from '../screen/history/history-details';
import EditProfile from '../screen/profile/edit-profile';
import DonateConfirmetionMessage from '../screen/donate/donate.confirmetion-message';
import PendingRequest from '../screen/pending-request/pending-request';
import registerForPushNotificationsAsync from '../utils/getExpoPushToken';
import PrivacyPolicy from '../screen/privacy/privacy-policy';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// custom drawer content
const DrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const CustomDrawerContent = (props) => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
        </Drawer.Navigator>
    );
}

const Navigation = () => {
    const { checkUser, user, setUser, updatePushToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation()
    const checkUserLogin = async () => {
        setIsLoading(true);
        try {
            const response = await checkUser();
            setUser(response.user);
            setIsLoading(false);
            await registerForPushNotificationsAsync().then(async token => {
                await updatePuahToken(token)
            })
        } catch (error) {
            setIsLoading(false);
        }
    }



    const updatePuahToken = async (token) => {
        try {
            const response = await updatePushToken({
                pushToken: token
            });
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        checkUserLogin();
    }, [navigation])


    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Stack.Navigator initialRouteName="Welcome">
            {user && (
                <>
                    <Stack.Screen name="Home" component={CustomDrawerContent}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="Profile" component={Profile}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="EditProfile" component={EditProfile}
                        options={{
                            title: 'Edit Profile',
                        }}
                    />
                    <Stack.Screen name="Donate" component={Donate}
                        options={{
                            // headerShown: false
                        }}
                    />
                    <Stack.Screen name="PendingRequest" component={PendingRequest}
                        options={{
                            title: 'Pending Request',
                        }}
                    />
                    <Stack.Screen name="DonateConfirmetionMessage" component={DonateConfirmetionMessage}
                        options={{
                            // title: 'Donate',
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="HistoryDetails" component={HistoryDetails}
                        options={{
                            title: 'Details',
                        }}
                    />
                    <Stack.Screen name="History" component={History}
                        options={{
                            // headerShown: false
                        }}
                    />
                    <Stack.Screen name="Notification" component={Notification}
                        options={{
                            // headerShown: false
                        }}
                    />
                    <Stack.Screen name="RequestScreen" component={RequestScreen}
                        options={{
                            title: 'Request',
                        }}
                    />
                    <Stack.Screen name="RequestConfirmOtp" component={RequestConfirmOtp}
                        options={{
                            headerShown: false

                        }}
                    />
                    <Stack.Screen name="RequestConfirmetionMessage" component={RequestConfirmetionMessage}
                        options={{
                            headerShown: false
                        }}
                    />
                </>
            )}
            {!user && (
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="Terms" component={Terms}
                        options={{
                            headerStyle: {
                                backgroundColor: '#D80132',
                                elevation: 0,
                                shadowOpacity: 0,
                                borderBottomWidth: 0,
                                marginTop: 20,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitle: 'Terms and Conditions',

                        }}
                    />
                    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}
                        options={{
                            headerStyle: {
                                backgroundColor: '#D80132',
                                elevation: 0,
                                shadowOpacity: 0,
                                borderBottomWidth: 0,
                                marginTop: 20,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitle: 'Privacy Policy',

                        }}
                    />
                    <Stack.Screen name="PhoneNumber" component={PhoneNumber}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="OtpInput" component={OtpInput}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="Register" component={Register}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="PickBloodGroup" component={PickBloodGroup}
                        options={{
                            headerShown: false
                        }} />
                </>
            )}
        </Stack.Navigator>

    );
};

export default Navigation;