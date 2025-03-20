import DatePicker from "../../ui/DatePicker"
import Button from "../../ui/Button"
import { subDays } from "date-fns"
import { StyleSheet } from "react-native"

function GameDatePicker({value, setValue, onChange}) {
    const today = new Date()

    function handleDateButtonPressed(target) {
        if (target === 'today') {
            setValue(today)
        } else if (target === 'yesterday') {
            setValue(subDays(today, 1))
        } else {
            console.error("Unexpected date button target")
        }
    }

    const dateUtilButtons = <>
        <Button onPress={handleDateButtonPressed.bind(this, "yesterday")} style={styles.button}>Yesterday</Button>
        <Button onPress={handleDateButtonPressed.bind(this, "today")} style={styles.button}>Today</Button>
    </>

    return (
        <DatePicker value={value} onChange={onChange} buttons={dateUtilButtons} />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(76, 27, 190)'
    }
})

export default GameDatePicker