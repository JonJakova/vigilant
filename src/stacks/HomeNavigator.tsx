import { useColorScheme } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import App from "../views/home/App";

const Stack = createStackNavigator()

export const HomeNavigator = () => {
    const isDark = useColorScheme() === 'dark'

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={App} />
        </Stack.Navigator>
    )
}