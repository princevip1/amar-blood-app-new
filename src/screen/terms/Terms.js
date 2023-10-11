import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import { colors } from '../../theme/color'

const Terms = () => {
    const data = [
        {
            sl: 1,
            title: "User Registration",
            content: [
                {
                    sl: 1.1,
                    content: `To use certain features of the App, you may be required to register for an account. You must provide accurate and complete information during the registration process and keep your account information up-to-date`
                }, {
                    sl: 1.2,
                    content: `You are responsible for maintaining the confidentiality of your account credentials, and you are solely responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`
                }
            ]
        }, {
            sl: 2,
            title: "App Usage",
            content: [
                {
                    sl: 2.1,
                    content: `The App is intended for individuals seeking information about blood donation and for potential blood donors. You agree to use the App for lawful and non-commercial purposes only.`
                }, {
                    sl: 2.2,
                    content: `You may not use the App in any way that violates applicable laws or regulations or infringes on the rights of others.`
                },
            ]
        }, {
            sl: 3,
            title: "Blood Donation",
            content: [
                {
                    sl: 3.1,
                    content: `The App may provide information about blood donation centers, schedules, and eligibility requirements. However, we do not guarantee the accuracy or availability of such information.`
                }, {
                    sl: 3.2,
                    content: `Any blood donation you make through the App is subject to the policies and procedures of the respective blood donation center.`
                }]
        },
        {
            sl: 4,
            title: "Privacy",
            content: [
                {
                    sl: 4.1,
                    content: `Your use of the App is subject to our Privacy Policy, which explains how we collect, use, and disclose your personal information. By using the App, you consent to the practices described in the Privacy Policy.`
                }
            ]
        }, {
            sl: 5,
            title: "Termination",
            content: [
                {
                    sl: 5.1,
                    content: `We reserve the right to suspend or terminate your access to the App at our discretion, with or without notice, for any reason, including if you violate these Terms.`
                }
            ]
        },
        {
            sl: 6,
            title: "Disclaimer of Warranty",
            content: [
                {
                    sl: 6.1,
                    content: `The App is provided "as is" and "as available" without any warranties, expressed or implied. We make no representations or warranties regarding the accuracy, reliability, or availability of the App.`
                }
            ]
        },
        {
            sl: 7,
            title: "Limitation of Liability",
            content: [
                {
                    sl: 7.1,
                    content: `We will not be liable for any damages, including indirect, incidental, consequential, or punitive damages arising out of or relating to your use of the App.`
                }
            ]
        }, {
            sl: 8,
            title: "Governing Law",
            content: [
                {
                    sl: 8.1,
                    content: `These Terms are governed by the laws of the People's Republic of Bangladesh.`
                }
            ]
        }, {
            sl: 9,
            title: "Changes to Terms",
            content: [
                {
                    sl: 9.1,
                    content: `We may update these Terms from time to time. If we make any material changes, we will notify you by posting a notice in the App prior to the change becoming effective. Your continued use of the App after the effective date will be subject to the new Terms.`
                }
            ]
        }, {
            sl: 10,
            title: "Contact Us",
            content: [
                {
                    sl: 10.1,
                    content: `If you have any questions about these Terms or the App, please contact us at
                    `
                }
            ]
        }
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
                <Text style={{ fontSize: 16 }}>If you have any questions about these Terms or the App, please contact us at</Text>
                <Text style={{ fontSize: 16 }}>Email: <Text style={{ color: colors.primary }}>
                    info@amarblood.net
                </Text></Text>
            </View>
        </View >
    )
}

export default Terms

const styles = StyleSheet.create({})