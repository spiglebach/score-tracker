import { useContext, useState } from "react";
import AuthContent from "../../components/auth/AuthContent";
import { httpRegister } from "../../util/http/auth";
import { AuthContext } from "../../store/context/auth/auth-context";
import { Alert } from "react-native";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

function RegistrationScreen() {
    const {authenticate} = useContext(AuthContext)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    async function registrationHandler({username, password}) {
        setIsAuthenticating(true)
        try {
            const response = await httpRegister(username, password)
            const tokens = response.data
            authenticate(tokens)
        } catch (error) {
            console.error(error)
            Alert.alert("Registration failed!", "Could not create user. Please check your input or try again later!")
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay />
    }

    return <AuthContent onAuthenticate={registrationHandler} />
}

export default RegistrationScreen