import { Pressable, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, onPress, mode, color, style, textStyle}) {

    let backgroundColor
    let textColor
    if (!color || color === 'primary') {
        if (mode === 'flat') {
            backgroundColor = GlobalStyles.colors.primaryContainer
            textColor = GlobalStyles.colors.primaryContainerText
        } else {
            backgroundColor = GlobalStyles.colors.primary
            textColor = GlobalStyles.colors.primaryText
        }
    } else if (color === 'secondary') {
        if (mode === 'flat') {
            backgroundColor = GlobalStyles.colors.secondaryContainer
            textColor = GlobalStyles.colors.secondaryContainerText
        } else {
            backgroundColor = GlobalStyles.colors.secondary
            textColor = GlobalStyles.colors.secondaryText
        }
    } else if (color === 'tertiary') {
        if (mode === 'flat') {
            backgroundColor = GlobalStyles.colors.tertiaryContainer
            textColor = GlobalStyles.colors.tertiaryContainerText
        } else {
            backgroundColor = GlobalStyles.colors.tertiary
            textColor = GlobalStyles.colors.tertiaryText
        }
    } else if (color == 'warn') {
        if (mode === 'flat') {
            backgroundColor = GlobalStyles.colors.warnContainer
            textColor = GlobalStyles.colors.warnContainerText
        } else {
            backgroundColor = GlobalStyles.colors.warn
            textColor = GlobalStyles.colors.warnText
        }
    } else if (color == 'error') {
        if (mode === 'flat') {
            backgroundColor = GlobalStyles.colors.errorContainer
            textColor = GlobalStyles.colors.errorContainerText
        } else {
            backgroundColor = GlobalStyles.colors.error
            textColor = GlobalStyles.colors.errorText
        }
    }
    if (mode === 'outlined') {
        backgroundColor = 'transparent'
        textColor = backgroundColor
    }

    const outlinedButtonStyles = [mode === 'outlined' && styles.outlinedButton]

    const buttonStyles = {
        backgroundColor: backgroundColor
    }

    const textStyles = {
        color: textColor
    }

    return (
        <Pressable
            android_ripple={{color: '#ccc'}}
            style={({pressed}) => [
                styles.button,
                ...outlinedButtonStyles,
                buttonStyles,
                pressed && styles.buttonPressed,
                style
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyles, textStyle]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 8,
    },
    buttonPressed: {
        opacity: 0.75
    },
    buttonText: {
        textAlign: 'center',
        padding: 4
    },
    outlinedButton: {
        borderWidth: 2
    },
})

export default Button