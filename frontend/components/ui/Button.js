import { Pressable, StyleSheet, Text, View } from "react-native";

function Button({children, onPress, mode, style, textStyle}) {
    const outlinedButtonStyles = [mode === 'outlined' && styles.outlinedButton]
    const flatButtonStyles = [mode === 'flat' && styles.flatButton]

    const outlinedTextStyles = [mode === 'outlined' && styles.outlinedButtonText]
    const flatTextStyles = [mode === 'flat' && styles.flatButtonText]
    return (
        <View style={style}>
            <Pressable
                android_ripple={{color: '#ccc'}}
                style={({pressed}) => [
                    styles.button,
                    ...outlinedButtonStyles,
                    ...flatButtonStyles,
                    pressed && styles.buttonPressed,
                    pressed && mode === 'outlined' && styles.outlinedButtonPressed,
                    pressed && mode === 'flat' && styles.flatButtonPressed
                ]}
                onPress={onPress}
            >
                <Text style={[styles.buttonText, ...outlinedTextStyles, ...flatTextStyles, textStyle]}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'forestgreen'
    },
    buttonPressed: {
        opacity: 0.75
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: 4
    },

    flatButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    flatButtonPressed: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    flatButtonText: {
        color: 'black'
    },

    outlinedButton: {
        backgroundColor: 'transparent',
        borderColor: 'forestgreen',
        borderWidth: 2
    },
    outlinedButtonPressed: {
        backgroundColor: 'palegreen',
        opacity: 0.75
    },
    outlinedButtonText: {
        color: 'darkgreen',
    }
})

export default Button