import { StyleSheet, Text, TextInput, View } from "react-native"

function Input({label, invalid, changed, style, labelStyle, textInputProps}) {
    let textInputStyles = [inputStyles.input]
    if (textInputProps && textInputProps.multiline) {
        textInputStyles.push(inputStyles.inputMultiline)
    }
    if (changed && !invalid) {
        textInputStyles.push(inputStyles.changedInput)
    }
    if (invalid) {
        textInputStyles.push(inputStyles.invalidInput)
    }
    return (
        <View style={[inputStyles.container, style]}>
            <Text style={[inputStyles.label, changed && !invalid && inputStyles.changedLabel, invalid && inputStyles.invalidLabel, labelStyle]}>{label}</Text>
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
        backgroundColor: 'seashell',
        padding: 6,
        borderRadius: 8,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    inputMultiline: {
        minHeight: 60,
        textAlignVertical: 'top'
    },
    changedInput: {
        backgroundColor: 'lemonchiffon',
        borderWidth: 1,
        borderColor: 'darkorange'
    },
    invalidInput: {
        backgroundColor: 'lightpink',
        borderWidth: 1,
        borderColor: 'firebrick'
    },
    changedLabel: {
        color: 'darkorange'
    },
    invalidLabel: {
        color: 'firebrick'
    }
})

export default Input