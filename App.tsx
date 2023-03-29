import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { themes } from "./src/constants";
import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router";

type ThemeArgs = Parameters<typeof extendTheme>

export type ThemeProps = ThemeArgs[0] & ThemeArgs[1]

export default function App() {
    const theme = extendTheme(themes)
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
