import { drizzle } from 'drizzle-orm/better-sqlite3';
import { openDatabaseSync } from 'expo-sqlite/next';

const expo = openDatabaseSync('sqlite.db', { enableChangeListener: true });
export const db = drizzle(expo);
