import AuthContent from "../components/auth/AuthContent";

function RegistrationScreen() {
    function registrationHandler({username, password}) {
        
    }

    return <AuthContent onAuthenticate={registrationHandler} />
}

export default RegistrationScreen