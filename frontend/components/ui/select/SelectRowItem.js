import { Pressable, StyleSheet, Text } from "react-native"
import {FontAwesome6} from "@expo/vector-icons"

function SelectRowItem({item, labelExtractor, onChange, secondary}) {
    const displayValue = labelExtractor(item)

    function handleRowItemPressed() {
        onChange(item)
    }

    return (
        <Pressable
                style={[styles.rowItem, item.isSelected && styles.selectedItem]}
                onPress={handleRowItemPressed}
        >
            <FontAwesome6 name={item.icon} size={30} />
            <Text style={[styles.rowItemText, secondary && styles.secondaryRowItemText]}>{displayValue}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        backgroundColor: 'wheat',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 14,
        gap: 8
    },
    rowItemText: {
        fontSize: 18,
        textAlign: 'center',

    },
    secondaryRowItemText: {
        fontSize: 14,
    },
    selectedItem: {
        backgroundColor: 'gold'
    },
})

export default SelectRowItem