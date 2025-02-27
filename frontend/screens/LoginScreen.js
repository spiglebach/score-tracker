import AuthContent from "../components/auth/AuthContent";

function LoginScreen() {
    function loginHandler() {

    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen