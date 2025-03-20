import { StyleSheet, Text } from "react-native"
import Button from "../../ui/Button"

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
        backgroundColor: 'rgb(108, 26, 116)'
    },
    name: {
        fontSize: 14
    },
    timesPlayed: {
        color: 'rgb(172, 172, 172)',
        fontSize: 12
    }
})

export default RecentGameButton