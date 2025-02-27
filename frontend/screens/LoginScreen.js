import AuthContent from "../components/auth/AuthContent";

function LoginScreen() {
    function loginHandler({username, password}) {

    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen