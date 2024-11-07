import { atom, useAtom } from 'jotai'
import { LoadType } from '../pages/NewLoad';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as loadSchema from '../database/schema';

const notSentLoadsAtom = atom<(Omit<LoadType, "signature"> & { id: string, signaturePath: string })[]>([])

export const useNotSentLoads = () => {
    const [notSentLoads, setNotSentLoads] = useAtom(notSentLoadsAtom);

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: loadSchema })

    const fetchLocalNotSent = async () => {
        const result = await db.query.load.findMany<LoadType[]>()
        console.log("RESULT STORED", JSON.stringify(result, null, 2))
        setNotSentLoads(result)
    }

    return {
        notSentLoads,
        fetchLocalNotSent
    }
}
