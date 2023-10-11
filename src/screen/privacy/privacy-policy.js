import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import { colors } from '../../theme/color'

const PrivacyPolicy = () => {

    const data = [
        {
            sl: 1,
            title: "Information We Collect",
            content: [
                {
                    sl: 1.1,
                    content: ` Information You Provide: When you use Amar Blood, you may voluntarily provide us with personal information, including but not limited to 
                    \nName
                    \nContact information (phone number, email address)
                    \nBlood type
                    \nGeographic location
                    \nMedical history related to blood donations
                    \nProfile picture (optional)`
                },
                {
                    sl: 1.2,
                    content: `Information We Collect Automatically: We may collect certain information automatically when you use the App, including: 
                    \nDevice information (e.g., device type, operating system)
                    \nLog data (e.g., IP address, access times)
                    \nLocation information (if you enable location services)
                    `
                },
                {
                    sl: 1.3,
                    content: `Cookies and Similar Technologies: We may use cookies and similar technologies to collect information about your use of the App. You can adjust your browser settings to refuse cookies, but this may limit your access to certain features of the App.
                    `
                },
            ]
        }, {
            sl: 2,
            title: "How We Use Your Information",
            content: [
                {
                    sl: 2.1,
                    content: `We use your information for the following purposes:
                    \nTo connect blood donors with individuals in need of blood donations.
                    \nTo send you notifications related to blood donation requests and events.
                    \nTo improve and enhance the App's functionality and user experience.
                    \nTo respond to your inquiries and provide customer support.
                    \nTo comply with legal obligations.
                    \nTo conduct research and analysis for the improvement of our services.`
                }
            ]
        }, {
            sl: 3,
            title: "Disclosure of Your Information",
            content: [
                {
                    sl: 3.1,
                    content: `We may share your information in the following circumstances:
                        \nWith other users of the App to facilitate blood donations.
                        \nWith healthcare institutions and organizations involved in blood donation initiatives.
                        \nWith service providers who assist us in app development, hosting, and maintenance.
                        \nWhen required by law or to protect our legal rights.
                        \nIn connection with a merger, acquisition, or sale of all or a portion of our assets.`
                },
            ]
        },
        {
            sl: 4,
            title: "Security",
            content: [
                {
                    sl: 4.1,
                    content: `We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of data transmission over the internet or method of electronic storage is 100% secure.`
                }
            ]
        }, {
            sl: 5,
            title: "Your Choices",
            content: [
                {
                    sl: 5.1,
                    content: `You can manage your personal information and privacy settings within the App. You can also choose to delete your account at any time, which will result in the removal of your personal information from our systems.`
                }
            ]
        },
        {
            sl: 6,
            title: " Children's Privacy",
            content: [
                {
                    sl: 6.1,
                    content: `The App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.`
                }
            ]
        },
        {
            sl: 7,
            title: "Changes to this Privacy Policy",
            content: [
                {
                    sl: 7.1,
                    content: `We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the revised Privacy Policy on the App.`
                }
            ]
        },
    ]
    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
            }}
        >
            <FlatList
                scrollEnabled={true}
                data={data}
                ListHeaderComponent={() => (
                    <View style={{ padding: 20 }}>
                        <Text style={{
                            fontSize: 16,
                            marginBottom: 10
                        }}>Effective Date: 1st Sep 2023</Text>
                        <Text style={{ fontSize: 16 }}>Welcome to Amar Blood, a mobile application dedicated to connecting blood donors with those in need of blood donations. At Amar Blood, we take your privacy seriously and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Amar Blood mobile app ("App"). By using the App, you consent to the practices described in this Privacy Policy.</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}><Text
                            style={{
                                color: colors.primary
                            }}
                        >{item.sl}</Text>. {item.title}</Text>

                        {item.content.map((item, index) => (
                            <View style={{ padding: 10 }}
                                key={index}
                            >
                                <Text style={{ fontSize: 16 }}><Text
                                    style={{
                                        color: colors.primary
                                    }}
                                >{item.sl}</Text>. {item.content}</Text>
                            </View>
                        ))}

                        {/* <FlatList
                            data={item.content}
                            renderItem={({ item }) => (
                               
                            )}
                        /> */}
                    </View>
                )}
            />
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 16 }}>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</Text>
                <Text style={{ fontSize: 16 }}>Email: <Text style={{ color: colors.primary }}>
                    info@amarblood.net
                </Text></Text>
            </View>
        </View >
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})