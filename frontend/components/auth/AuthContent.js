import { Alert, StyleSheet, View } from "react-native"
import AuthForm from "./AuthForm"
import Button from "../ui/Button"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { GlobalStyles } from "../../constants/styles"

function AuthContent({isLogin, onAuthenticate}) {
    const navigation = useNavigation()
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        username: false,
        password: false,
        confirmPassword: false
    })

    function submitHandler(credentials) {
        let {username, password, confirmPassword} = credentials

        const usernameIsValid = username.length >=3
        const passwordIsValid = password.length >=3
        const passwordsAreEqual = isLogin || password === confirmPassword

        setCredentialsInvalid({
            username: !usernameIsValid,
            password: !passwordIsValid,
            confirmPassword: !passwordsAreEqual
        })
        if (!usernameIsValid || !passwordIsValid || !passwordsAreEqual) {
            Alert.alert('Invalid input', 'Please check your entered credentials.')
            return
        }
        onAuthenticate({username, password})
    }

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Registration')
        } else {
            navigation.replace('Login')
        }
    }

    return (
        <View style={styles.authContainer}>
            <AuthForm isLogin={isLogin} credentialsInvalid={credentialsInvalid} onSubmit={submitHandler} />
            <View style={styles.switchButtonContainer}>
                <Button
                    onPress={switchAuthModeHandler}
                    mode="flat">
                    {isLogin ? 'Go to Registration' : 'Go to Login'}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    authContainer: {
        padding: 14,
        backgroundColor: GlobalStyles.colors.surface500,
        marginHorizontal: 20,
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    switchButtonContainer: {
        marginTop: 18
    }
})

export default AuthContent