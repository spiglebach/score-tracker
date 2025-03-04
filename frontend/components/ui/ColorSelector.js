import { StyleSheet, Text, View } from "react-native"
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker"

function ColorSelector({label, value, onChange}) {
    return (
        <View style={styles.container}>
            <Text style={styles.colorPickerLabel}>{label}</Text>
            <ColorPicker value={value} onChange={onChange}>
                <Panel1 style={{height: 100}}/>
                <HueSlider />
            </ColorPicker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4
    },
    colorPickerLabel: {
        fontSize: 12,
        marginBottom: 4
    },
})

export default ColorSelector