import { View } from "react-native"
import ColorPreview from "../../ui/ColorPreview"
import ColorSelector from "../../ui/ColorSelector"

function ColorCombinationSelector({previewText, selectedBackgroundColor, selectedTextColor, onBackgroundColorChange, onTextColorChange}) {
    return (
        <View>
            <ColorPreview
                label="Color preview"
                text={previewText}
                backgroundColor={selectedBackgroundColor}
                textColor={selectedTextColor}
            />
            <ColorSelector
                label="Background color"
                value={selectedBackgroundColor}
                onChange={onBackgroundColorChange}
            />
            <ColorSelector
                label="Text color"
                value={selectedTextColor}
                onChange={onTextColorChange}
            />
        </View>
    )
}

export default ColorCombinationSelector