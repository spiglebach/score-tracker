import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

export function determineInputLabelColor(changed, invalid) {
    if (invalid) {
        return GlobalStyles.colors.error
    }
    if (changed) {
        return GlobalStyles.colors.warnTextOnSurface
    }
    return GlobalStyles.colors.surfaceText500
}

export function determineInputBoxColor(changed, invalid) {
    if (invalid) {
        return GlobalStyles.colors.errorContainer
    }
    if (changed) {
        return GlobalStyles.colors.warnContainer
    }
    return GlobalStyles.colors.tertiaryContainer
}

export function determineInputBoxBorderColor(changed, invalid) {
    if (invalid) {
        return GlobalStyles.colors.error
    }
    if (changed) {
        return GlobalStyles.colors.warn
    }
    return GlobalStyles.colors.surfaceText500
}

export function determineInputTextColor(changed, invalid) {
    if (invalid) {
        return GlobalStyles.colors.errorContainerText
    }
    if (changed) {
        return GlobalStyles.colors.warnContainerText
    }
    return GlobalStyles.colors.tertiaryContainerText
}

function Input({label, invalid, changed, style, labelStyle, textInputProps}) {
    let textInputStyles = [inputStyles.input]
    if (textInputProps && textInputProps.multiline) {
        textInputStyles.push(inputStyles.inputMultiline)
    }

    const inputColors = {
        backgroundColor: determineInputBoxColor(changed, invalid),
        color: determineInputTextColor(changed, invalid),
        borderColor: determineInputBoxBorderColor(changed, invalid)
    }
    textInputStyles.push(inputColors)

    const labelColorStyle = {
        color: determineInputLabelColor(changed, invalid)
    }
    return (
        <View style={[inputStyles.container, style]}>
            <Text style={[inputStyles.label, labelColorStyle, labelStyle]}>{label}</Text>
            <TextInput style={textInputStyles} {...textInputProps} />
        </View>
    )
}

export const inputStyles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.tertiaryContainer,
        color: GlobalStyles.colors.tertiaryContainerText,
        padding: 6,
        borderRadius: 8,
        fontSize: 18,
        borderWidth: 1
    },
    inputMultiline: {
        minHeight: 60,
        textAlignVertical: 'top'
    },
})

export default Input