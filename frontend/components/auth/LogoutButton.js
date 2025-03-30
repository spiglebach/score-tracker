import { useContext } from "react"
import { AuthContext } from "../../store/context/auth/auth-context"
import Button from "../ui/Button"

function LogoutButton() {
    const {logout} = useContext(AuthContext)
    return (
        <Button color="error" onPress={logout}>Logout</Button>
    )
}

export default LogoutButton