import React from "react";
import { NativeBaseProvider, Box, extendTheme } from "native-base";
import { themes } from "./src/constants";
import { NewLoad } from "./src/pages/NewLoad";

type ThemeArgs = Parameters<typeof extendTheme>

export type ThemeProps = ThemeArgs[0] & ThemeArgs[1]

export default function App() {

    const theme = extendTheme(themes)

    return (
        <NativeBaseProvider theme={theme}>
            <NewLoad />
        </NativeBaseProvider>
    );
}
