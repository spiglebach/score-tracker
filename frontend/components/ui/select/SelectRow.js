import { StyleSheet, View } from "react-native"
import SelectRowItem from "./SelectRowItem"

function SelectRow({rowKey, style, labelExtractor, items, onChange, secondary}) {

    function mapSelectRowItem(item, index) {
        return (
            <SelectRowItem
                key={`${rowKey}_${index}`}
                item={item}
                labelExtractor={labelExtractor}
                onChange={onChange}
                secondary={secondary}
            />
        )
    }

    return (
        <View style={[styles.row, secondary && styles.secondaryRow, style]}>
            {items.map(mapSelectRowItem)}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        height: 140
    },
    secondaryRow: {
        height: 100
    }
})

export default SelectRow