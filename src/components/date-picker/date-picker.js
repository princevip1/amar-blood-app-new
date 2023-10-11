import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Button, Input, Modal } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const DatePicker = ({
    date,
    setDate,
    minimumDate = new Date(),
    maximumDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)  //  7 days from now
}) => {
    const [dateModal, setDateModal] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState("")
    return (
        <View>
            <Pressable
                onPress={() => {
                    if (Platform.OS === 'ios') {
                        setDateModal(true)
                    } else {
                        setDateModal(true)
                        setSelectedDate("")
                    }

                }}
                style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                    }}
                >
                    {selectedDate ? selectedDate : (
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#ccc',
                            }}
                        >
                            Select Date
                        </Text>
                    )}
                </Text>
            </Pressable>


            {Platform.OS === 'ios' && (
                <Box>
                    <Modal isOpen={dateModal} onClose={() => setDateModal(false)}>
                        <Modal.Content maxWidth="100%">
                            <Modal.CloseButton />
                            <Modal.Header>Choose Date</Modal.Header>
                            <Modal.Body>
                                <RNDateTimePicker
                                    mode="date"
                                    value={date}
                                    dateFormat='day month year'
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || date;
                                        setDate(currentDate);
                                    }}

                                    display="spinner"
                                    minimumDate={minimumDate}
                                    maximumDate={maximumDate}
                                />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        setDateModal(false);
                                        setSelectedDate("")
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button onPress={() => {
                                        setDateModal(false);
                                        setSelectedDate(date.toDateString())
                                    }}>
                                        Done
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
            )}



            {!selectedDate && Platform.OS === 'android' && dateModal && (
                <RNDateTimePicker
                    mode="date"
                    value={date}
                    dateFormat='day month year'
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                        setSelectedDate(currentDate.toDateString())
                    }}
                    display="spinner"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}

        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({})