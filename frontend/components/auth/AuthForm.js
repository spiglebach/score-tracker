import { StyleSheet, View } from "react-native";
import Input from "../ui/Input";
import Button from "../ui/Button";

function AuthForm({isLogin, onSubmit, credentialsInvalid}) {
    function submitHandler() {

    }

    return (
        <View>
            <Input
                label="Username"
                labelStyle={styles.label}
                textInputProps={{
                    autoCapitalize: 'none'
                }}
            />
            <Input
                label="Password"
                labelStyle={styles.label}
                textInputProps={{
                    autoCapitalize: 'none'
                }}
            />
            {!isLogin && (
                <Input
                    label="Confirm Password"
                    labelStyle={styles.label}
                    textInputProps={{
                        autoCapitalize: 'none'
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