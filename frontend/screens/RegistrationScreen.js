import AuthContent from "../components/auth/AuthContent";

function RegistrationScreen() {
    function registrationHandler() {
        
    }

    return <AuthContent onAuthenticate={registrationHandler} />
}

export default RegistrationScreen