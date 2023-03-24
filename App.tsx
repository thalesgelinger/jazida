import React from "react";
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
    return (
        <NativeBaseProvider>
            <Box flex={1} justifyContent="center" alignItems="center" >Hello world</Box>
        </NativeBaseProvider>
    );
}
