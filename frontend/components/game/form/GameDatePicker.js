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
        <Button color="tertiary" onPress={handleDateButtonPressed.bind(this, "yesterday")}>Yesterday</Button>
        <Button color="tertiary" onPress={handleDateButtonPressed.bind(this, "today")}>Today</Button>
    </>

    return (
        <DatePicker value={value} onChange={onChange} buttons={dateUtilButtons} />
    )
}

export default GameDatePicker