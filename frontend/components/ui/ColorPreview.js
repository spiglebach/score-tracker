import { Pressable, StyleSheet, Text, View } from "react-native"
import { determineInputBoxBorderColor, determineInputLabelColor, inputStyles } from "./Input"

function ColorPreview({label, text, changed, backgroundColor, textColor, onPress}) {

    const dynamicContainerStyles = {
        backgroundColor: backgroundColor,
        borderColor: determineInputBoxBorderColor(changed, false)
    }
    const dynamicTextStyles = {color: textColor}

    const labelColorStyle = {
        color: determineInputLabelColor(changed, false)
    }

    return (
        <Pressable style={styles.outerContainer} onPress={onPress}>
            {label && <Text style={[styles.colorPreviewLabel, labelColorStyle]}>{label}</Text>}
            <View style={[styles.container, changed && inputStyles.changedInput, dynamicContainerStyles]}>
                <Text style={[styles.largeText, dynamicTextStyles]}>{text}</Text>
                <Text style={[styles.mediumText, dynamicTextStyles]}>{text}</Text>
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
        borderWidth: 1
    },
    colorPreviewLabel: {
        fontSize: 12,
        marginBottom: 4
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
})

export default ColorPreview