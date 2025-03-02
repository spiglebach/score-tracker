import { StyleSheet, Text, View } from "react-native"

function HeaderTitle(props) {
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.subtitleText}>{props.subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtitleText: {
        textAlign: 'center'
    }
})

export default HeaderTitle