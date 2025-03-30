import { useState } from "react"
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { inputStyles } from "../Input"
import { FontAwesome6 } from "@expo/vector-icons"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Button from "../Button"
import SelectRow from "./SelectRow"
import { GlobalStyles } from "../../../constants/styles"

function Select({value, selectorTitle, displayLabel, placeholder, mainData, mainColumns, secondaryData, secondaryColumns, keyExtractor, labelExtractor, onChange, gap}) {
    let controlled = !!value
    const [selectorOpen, setSelectorOpen] = useState(false)
    const [uncontrolledValue, setUncontrolledValue] = useState()
    const effectiveValue = controlled ? value : uncontrolledValue

    if (!keyExtractor) {
        keyExtractor = (item) => item
    }
    if (!labelExtractor) {
        labelExtractor = (item) => item
    }
    if (!gap) {
        gap = 10
    }
    if (!controlled) {
        onChange = (item) => {
            setUncontrolledValue(item)
        }
    }

    const dynamicContainerStyle = {
        gap: gap
    }

    const dynamicRowStyle = {
        gap: gap
    }

    function createRow(rowIndex, rowItems, secondary) {
        const rowKey = `row_${rowIndex}`
        return (
            <SelectRow
                key={rowKey}
                rowKey={rowKey}
                style={dynamicRowStyle}
                labelExtractor={labelExtractor}
                items={rowItems}
                onChange={onChange}
                secondary={secondary}
            />
        )
    }

    const rows = []
    function addRows(type) {
        let data
        let columns
        const secondary = type === 'secondary'
        if (secondary) {
            data = [...secondaryData]
            columns = secondaryColumns
        } else {
            data = [...mainData]
            columns = mainColumns
        }

        const rowItems = []
        for (let index = 0; index < data.length; index++) {
            if (columns && rowItems.length >= columns) {
                rows.push(createRow(rows.length, [...rowItems], secondary))
                rowItems.length = 0
            } 
            const currentItem = data[index]
            const isSelected = effectiveValue && keyExtractor(currentItem) === keyExtractor(effectiveValue)
            rowItems.push({...currentItem, isSelected})
        }
        if (rowItems.length > 0) {
            rows.push(createRow(rows.length, [...rowItems], secondary))
        }
    }

    addRows('main')
    addRows('secondary')
    

    function handleToggleSelector() {
        setSelectorOpen(prevState => !prevState)
    }

    function handleClose() {
        setSelectorOpen(false)
    }

    const selector = (
        <Modal visible={selectorOpen} animationType="slide">
            <SafeAreaProvider>
            <SafeAreaView style={styles.selectorContainer}>
                <Text style={styles.selectorTitle}>{selectorTitle}</Text>
                <View style={[styles.container, dynamicContainerStyle]}>
                    {rows}
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="flat" onPress={handleClose}>Close</Button>
                    </View>
                </View>
            </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )

    return (
        <View>
            <View style={[inputStyles.container]}>
                <Text style={inputStyles.label}>{displayLabel}</Text>
                <View style={styles.valueDisplayContainer}>
                    <Pressable style={[inputStyles.input, styles.valueDisplay]} onPress={handleToggleSelector}>
                        <View style={styles.innerValueDisplayContainer}>
                            {effectiveValue && effectiveValue.icon && <FontAwesome6 name={effectiveValue.icon} size={20}/>}
                            <Text style={[styles.valueDisplayText, !effectiveValue && styles.placeholder]}>{effectiveValue ? labelExtractor(effectiveValue) : placeholder}</Text>
                        </View>
                        <FontAwesome6 name="hand-pointer" size={18} color={GlobalStyles.colors.tertiaryContainerText} />
                    </Pressable>
                </View>
            </View>
            {selectorOpen && selector}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 18
    },
    innerValueDisplayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    valueDisplay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        gap: 20
    },
    valueDisplayText: {
        fontSize: 18
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalStyles.colors.surface500
    },
    selectorTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    placeholder: {
        opacity: 0.7
    }
})

export default Select