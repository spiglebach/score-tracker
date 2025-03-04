import { StyleSheet, Text, TextInput, View } from "react-native"

function Input({label, invalid, changed, style, labelStyle, textInputProps}) {
    let inputStyles = [styles.input]
    if (textInputProps && textInputProps.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if (changed && !invalid) {
        inputStyles.push(styles.changedInput)
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, changed && !invalid && styles.changedLabel, invalid && styles.invalidLabel, labelStyle]}>{label}</Text>
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