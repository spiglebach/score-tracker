import { StyleSheet, View } from "react-native"
import AuthForm from "./AuthForm"
import Button from "../ui/Button"
import { useNavigation } from "@react-navigation/native"

function AuthContent({isLogin, onAuthenticate}) {
    const navigation = useNavigation()

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Registration')
        } else {
            navigation.replace('Login')
        }
    }

    return (
        <View style={styles.authContainer}>
            <AuthForm isLogin={isLogin} />
            <View style={styles.switchButtonContainer}>
                <Button
                    onPress={switchAuthModeHandler}
                    mode="flat"
                    textStyle={styles.switchButtonText}>
                    {isLogin ? 'Go to Registration' : 'Go to Login'}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    authContainer: {
        padding: 14,
        backgroundColor: 'slateblue',
        marginHorizontal: 20,
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    switchButtonContainer: {
        marginTop: 18
    },
    switchButtonText: {
        color: 'white'
    }
})

export default AuthContent