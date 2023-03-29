import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoadType, NewLoad } from "./pages/NewLoad";
import { Review } from "./pages/Review";


export type RootStackParams = {
    NewLoad: undefined,
    Review:{
        load: LoadType
    }
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown:false}}>
            <Stack.Screen name="NewLoad" component={NewLoad} />
            <Stack.Screen name="Review" component={Review} options={{
                animation:'slide_from_bottom'
            }}/>
        </Stack.Navigator>
    )
}
