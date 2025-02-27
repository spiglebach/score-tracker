import { StyleSheet, View } from "react-native";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";

function AuthForm({isLogin, onSubmit, credentialsInvalid}) {
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')

    const {
        username: usernameInvalid,
        password: passwordInvalid,
        confirmPassword: confirmPasswordInvalid,
    } = credentialsInvalid || {
        username: false,
        password: false,
        confirmPassword: false
    }

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'username':
                setEnteredUsername(enteredValue)
                break
            case 'password':
                setEnteredPassword(enteredValue)
                break
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue)
                break
        }
    }

    function submitHandler() {
        onSubmit({
            username: enteredUsername,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword
        })
    }

    return (
        <View>
            <Input
                label="Username"
                labelStyle={styles.label}
                invalid={usernameInvalid}
                textInputProps={{
                    autoCapitalize: 'none',
                    onChangeText: updateInputValueHandler.bind(this, 'username'),
                    value: enteredUsername,
                    textContentType: "username"
                }}
            />
            <Input
                label="Password"
                labelStyle={styles.label}
                invalid={passwordInvalid}
                textInputProps={{
                    autoCapitalize: 'none',
                    onChangeText: updateInputValueHandler.bind(this, 'password'),
                    value: enteredPassword,
                    secureTextEntry: true,
                    textContentType: "password"
                }}
            />
            {!isLogin && (
                <Input
                    label="Confirm Password"
                    labelStyle={styles.label}
                    invalid={confirmPasswordInvalid}
                    textInputProps={{
                        autoCapitalize: 'none',
                        onChangeText: updateInputValueHandler.bind(this, 'confirmPassword'),
                        value: enteredConfirmPassword,
                        secureTextEntry: true,
                        textContentType: "password"
                    }}
                />
            )}
            <View style={styles.buttonContainer}>
                <Button onPress={submitHandler}>
                    {isLogin ? 'Log In' : 'Register'}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 14
    },
    label: {
        color: 'white'
    }
})

export default AuthForm