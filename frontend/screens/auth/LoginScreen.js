import { useContext, useState } from "react";
import AuthContent from "../../components/auth/AuthContent";
import { AuthContext } from "../../store/context/auth/auth-context";
import { httpAuthenticate } from "../../util/http/auth";
import { Alert } from "react-native";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

function LoginScreen() {
    const {authenticate} = useContext(AuthContext)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    async function loginHandler({username, password}) {
        setIsAuthenticating(true)
        try {
            const response = await httpAuthenticate(username, password)
            const tokens = response.data
            authenticate(tokens)
        } catch (error) {
            console.error(error)
            Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!')
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay />
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen