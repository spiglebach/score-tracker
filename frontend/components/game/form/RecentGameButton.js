import { StyleSheet, Text } from "react-native"
import Button from "../../ui/Button"
import { GlobalStyles } from "../../../constants/styles"

function RecentGameButton({name, onPress, timesPlayed}) {
    return (
        <Button onPress={() => onPress(name)} style={styles.button}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.timesPlayed}>{timesPlayed && ` (${timesPlayed})`}</Text>
            
            </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: GlobalStyles.colors.tertiary
    },
    name: {
        fontSize: 14,
        color: GlobalStyles.colors.tertiaryText
    },
    timesPlayed: {
        color: GlobalStyles.colors.tertiaryText300,
        fontSize: 12
    }
})

export default RecentGameButton