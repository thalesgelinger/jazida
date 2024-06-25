import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Admin } from "./pages/Admin";
import { History } from "./pages/History";
import { LoadType, NewLoad } from "./pages/NewLoad";
import { Review } from "./pages/Review";
import { SignIn } from "./pages/SignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast, useTheme } from "native-base";


export type RootStackParams = {
    SignIn: undefined,
    Admin: undefined,
    NewLoad: {
        admin?: boolean
    },
    Review: {
        load: LoadType
    },
    History: undefined,
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const Router = () => {
    const { colors } = useTheme()
    return (
        // @ts-ignore
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.yellow }}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom"
            }}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="NewLoad" component={NewLoad} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Review" component={Review} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}
