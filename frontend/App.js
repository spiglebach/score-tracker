import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'

const Stack = createNativeStackNavigator()

function AuthNavigationStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'plum'
            },
            headerTintColor: 'black',
            contentStyle: {
                backgroundColor: 'lavender'
            }
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    )
}

export default function App() {
  return (
    <>
    <StatusBar />
    <NavigationContainer>
        <AuthNavigationStack />
    </NavigationContainer>
    </>
  )
}
