import { Pressable, StyleSheet, Text, View } from "react-native"

function ColorPreview({label, text, changed, backgroundColor, textColor, onPress}) {

    const dynamicContainerStyles = {backgroundColor: backgroundColor}
    const dynamicTextStyles = {color: textColor}

    return (
        <Pressable style={styles.outerContainer} onPress={onPress}>
            {label && <Text style={[styles.colorPreviewLabel, changed && styles.changedLabel]}>{label}</Text>}
            <View style={[styles.container, changed && styles.changedInput, dynamicContainerStyles]}>
                <Text style={[styles.boldText, styles.largeText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.largeText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.boldText, styles.mediumText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.mediumText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.boldText, styles.smallText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.smallText, dynamicTextStyles]}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        margin: 4
    },
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    colorPreviewLabel: {
        fontSize: 12,
        marginBottom: 4
    },
    boldText: {
        fontWeight: 'bold'
    },
    largeText: {
        fontSize: 30,
    },
    mediumText: {
        fontSize: 24
    },
    smallText: {
        fontSize: 16
    },
    changedInput: {
        backgroundColor: 'lemonchiffon',
        borderWidth: 1,
        borderColor: 'darkorange'
    },
    changedLabel: {
        color: 'darkorange'
    },
})

export default ColorPreview