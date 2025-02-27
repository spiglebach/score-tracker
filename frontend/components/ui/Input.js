import { StyleSheet, Text, TextInput, View } from "react-native"

function Input({label, invalid, style, labelStyle, textInputProps}) {
    let inputStyles = [styles.input]
    if (textInputProps && textInputProps.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel, labelStyle]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputProps} />
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 60,
        textAlignVertical: 'top'
    },
    invalidInput: {
        backgroundColor: 'lightpink',
        borderWidth: 1,
        borderColor: 'firebrick'
    },
    invalidLabel: {
        color: 'firebrick'
    }
})

export default Input