import { openDatabase } from "expo-sqlite"

export const db = openDB()

function openDB() {
    const db = openDatabase("db.db");
    return db;
}

export function createTable() {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS loads (
                id integer primary key not null, 
                client text, 
                plate text,
                material text,
                quantity text,
                paymentMethod text,
                signature text
            );`.trim()
        );
    });
}


