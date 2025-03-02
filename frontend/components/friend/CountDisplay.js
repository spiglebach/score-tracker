import { StyleSheet, Text, View } from "react-native"

function CountDisplay({title, count, style}) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.numberText}>{count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 14
    },
    titleText: {
        fontSize: 16
    },
    numberText: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default CountDisplay