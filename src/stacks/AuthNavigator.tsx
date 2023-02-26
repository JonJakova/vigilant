import { useColorScheme } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import Login from "../views/auth/login/Login";
import Register from "../views/auth/Register.tsx/Register";

const Stack = createStackNavigator()

export const AuthNavigator = () => {
    const isDark = useColorScheme() === 'dark'

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}