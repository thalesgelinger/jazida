import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { themes } from "./src/constants";
import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/router";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite/next';
import { ActivityIndicator, Text, View } from "react-native";
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";


const DATABSE_NAME = 'sqlite.db'

const expo = openDatabaseSync(DATABSE_NAME, { enableChangeListener: true });
const db = drizzle(expo);

type ThemeArgs = Parameters<typeof extendTheme>

export type ThemeProps = ThemeArgs[0] & ThemeArgs[1]

export default function App() {
    useDrizzleStudio(expo);
    const theme = extendTheme(themes)
    const { success, error } = useMigrations(db, migrations);


    if (error) {

        console.log({ ...error })

        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>
                Error carregando base de dados
            </Text>
        </View>
    }

    if (!success) {
        return <ActivityIndicator />
    }

    return (
        <SQLiteProvider databaseName={DATABSE_NAME}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </NativeBaseProvider>
        </SQLiteProvider>
    );
}
