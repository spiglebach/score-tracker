import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

function HeaderTitle(props) {
    let textColor
    if (props && props.tintColor) {
        textColor = props.tintColor
    } else {
        textColor = GlobalStyles.colors.primaryText
    }

    const colorStyle = {
        color: textColor
    }

    return (
        <View style={[styles.container, props.style]}>
            <Text style={[styles.titleText, colorStyle]}>{props.title}</Text>
            <Text style={[styles.subtitleText, colorStyle]}>{props.subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitleText: {
        textAlign: 'center',
    }
})

export default HeaderTitle