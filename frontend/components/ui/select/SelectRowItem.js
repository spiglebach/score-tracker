import { Pressable, StyleSheet, Text } from "react-native"
import {FontAwesome6} from "@expo/vector-icons"
import { GlobalStyles } from "../../../constants/styles"

function SelectRowItem({item, labelExtractor, onChange, secondary}) {
    const displayValue = labelExtractor(item)
    const isSelected = item.isSelected

    function handleRowItemPressed() {
        onChange(item)
    }

    let backgroundColor
    let textColor
    if (isSelected) {
        backgroundColor = GlobalStyles.colors.tertiary
        textColor = GlobalStyles.colors.tertiaryText
    } else {
        backgroundColor = GlobalStyles.colors.tertiaryContainer
        textColor = GlobalStyles.colors.tertiaryContainerText
    }

    const containerStyles = {
        backgroundColor: backgroundColor
    }

    const textStyles = {
        color: textColor
    }

    return (
        <Pressable
                style={[styles.rowItem, containerStyles]}
                onPress={handleRowItemPressed}
        >
            <FontAwesome6 name={item.icon} size={30} color={textColor} />
            <Text style={[styles.rowItemText, secondary && styles.secondaryRowItemText, textStyles]}>{displayValue}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: GlobalStyles.colors.outline,
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
})

export default SelectRowItem