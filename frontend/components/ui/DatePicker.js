import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";
import {FontAwesome6} from "@expo/vector-icons"
import { useState } from "react";
import { format } from "date-fns";
import { inputStyles } from "./Input";
import Button from "./Button";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalStyles } from "../../constants/styles";

function DatePicker({value, onChange, buttons}) {
    const defaultStyles = getDefaultStyles()
    const [calendarOpen, setCalendarOpen] = useState(false)

    const formattedDate = format(value, "yyyy. MM. dd.")

    function handleToggleCalendar() {
        setCalendarOpen(prev => !prev)
    }

    function handleClose() {
        setCalendarOpen(false)
    }

    const calendar = (
        <Modal visible={calendarOpen} animationType="slide">
            <SafeAreaProvider>
            <SafeAreaView style={styles.calendarOverlayContainer}>
                <Text style={styles.calendarTitle}>Pick a date</Text>
                <View style={styles.calendarContainer}>
                    <DateTimePicker
                        mode="single"
                        timePicker={false}
                        date={value}
                        onChange={({date}) => onChange(date)}
                        containerHeight={300}
                        style={styles.dateTimePicker}
                        styles={{
                            ...defaultStyles,
                            today: styles.calendarToday,
                            selected: styles.calendarSelected
                        }}
                        showOutsideDays
                        weekdaysFormat="short"
                        firstDayOfWeek={1}
                    />
                </View>
                <View>
                    <Button mode="flat" onPress={handleClose}>Close</Button>
                </View>
            </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )

    return (
        <>
            <View style={[inputStyles.container, styles.container]}>
                <Text style={inputStyles.label}>Date</Text>
                <View style={styles.dateDisplayContainer}>
                    <Pressable style={[inputStyles.input, styles.dateDisplay]} onPress={handleToggleCalendar}>
                        <Text style={styles.dateDisplayText}>{formattedDate}</Text>
                        <FontAwesome6 name="calendar" size={18} color={GlobalStyles.colors.tertiaryContainerText} />
                    </Pressable>
                    {!!buttons && <View style={styles.dateButtonContainer}>
                        {buttons}
                    </View>}
                </View>
            </View>
            {calendarOpen && calendar}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
    calendarOverlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.surface500
    },
    calendarContainer: {
        height: 370,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 4,
        backgroundColor: GlobalStyles.colors.outline,
        padding: 8,
    },
    dateTimePicker: {
        borderRadius: 14,
        backgroundColor: GlobalStyles.colors.surface600,
    },
    dateDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 18
    },
    dateDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        gap: 20
    },
    dateDisplayText: {
        fontSize: 18
    },
    dateButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 14
    },
    calendarTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    calendarToday: {
        backgroundColor: GlobalStyles.colors.tertiaryContainer
    },
    calendarSelected: {
        backgroundColor: GlobalStyles.colors.tertiary,
        borderWidth: 2,
        borderColor: GlobalStyles.colors.outline
    }
})

export default DatePicker